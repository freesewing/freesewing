// Dependencies
import {
  measurements,
  isDegreeMeasurement,
  control as controlConfig,
  urls,
} from '@freesewing/config'
import { measurements as measurementTranslations } from '@freesewing/i18n'
import { measurements as designMeasurements } from '@freesewing/collection'
import {
  cloudflareImageUrl,
  capitalize,
  formatMm,
  horFlexClasses,
  linkClasses,
  notEmpty,
  roundDistance,
  shortDate,
  timeAgo,
} from '@freesewing/utils'
// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'
// Hooks
import React, { useState, useEffect, Fragment, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { Link as WebLink, AnchorLink } from '@freesewing/react/components/Link'
import {
  BoolNoIcon,
  BoolYesIcon,
  CloneIcon,
  CuratedMeasurementsSetIcon,
  EditIcon,
  ShowcaseIcon,
  NewMeasurementsSetIcon,
  NoIcon,
  OkIcon,
  PlusIcon,
  ResetIcon,
  TrashIcon,
  UploadIcon,
  //  WarningIcon,
  //  BoolYesIcon,
  //  BoolNoIcon,
} from '@freesewing/react/components/Icon'
import { BookmarkButton, MsetCard } from '@freesewing/react/components/Account'
import {
  DesignInput,
  MarkdownInput,
  ListInput,
  MeasurementInput,
  PassiveImageInput,
  StringInput,
  ToggleInput,
} from '@freesewing/react/components/Input'
import { DisplayRow } from './shared.mjs'
import Markdown from 'react-markdown'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { Json } from '@freesewing/react/components/Json'
import { Yaml } from '@freesewing/react/components/Yaml'
import { Popout } from '@freesewing/react/components/Popout'

const t = (input) => {
  console.log('t called', input)
  return input
}

/*
 * Component to show an individual measurements set
 *
 * @param {object} props - All React props
 * @param {number} id - The ID of the measurements set to load
 * @param {bool} publicOnly - FIXME
 * @param {function} Link - An optional framework-specific Link component to use for client-side routing
 */
export const Set = ({ id, publicOnly = false, Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account, control } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()

  // Context
  const { setModal } = useContext(ModalContext)

  const [filter, setFilter] = useState(false)
  const [edit, setEdit] = useState(false)
  const [suggest, setSuggest] = useState(false)
  const [mset, setMset] = useState()
  // Set fields for editing
  const [name, setName] = useState(mset?.name)
  const [image, setImage] = useState(mset?.image)
  const [isPublic, setIsPublic] = useState(mset?.public ? true : false)
  const [imperial, setImperial] = useState(mset?.imperial ? true : false)
  const [notes, setNotes] = useState(mset?.notes || '')
  const [measies, setMeasies] = useState({})
  const [displayAsMetric, setDisplayAsMetric] = useState(mset?.imperial ? false : true)

  // Effect
  useEffect(() => {
    const getSet = async () => {
      setLoadingStatus([true, 'Contacting the backend'])
      const [status, body] = await backend.getSet(id)
      if (status === 200 && body.result === 'success') {
        setMset(body.set)
        setName(body.set.name)
        setImage(body.set.image)
        setIsPublic(body.set.public ? true : false)
        setImperial(body.set.imperial ? true : false)
        setNotes(body.set.notes)
        setMeasies(body.set.measies)
        setLoadingStatus([true, 'Measurements set loaded', true, true])
      } else setLoadingStatus([true, 'An error occured while contacting the backend', true, false])
    }
    const getPublicSet = async () => {
      setLoadingStatus([true, 'Contacting the backend'])
      const [status, body] = await backend.getPublicSet(id)
      if (status === 200 && body.result === 'success') {
        setMset({
          ...body.data,
          public: true,
          measies: body.data.measurements,
        })
        setName(body.data.name)
        setImage(body.data.image)
        setIsPublic(body.data.public ? true : false)
        setImperial(body.data.imperial ? true : false)
        setNotes(body.data.notes)
        setMeasies(body.data.measurements)
        setLoadingStatus([true, 'Measurements set loaded', true, true])
      } else
        setLoadingStatus([
          true,
          'An error occured while loading this measurements set',
          true,
          false,
        ])
    }
    if (id) {
      if (publicOnly) getPublicSet()
      else getSet()
    }
  }, [id, publicOnly])

  const filterMeasurements = () =>
    filter ? designMeasurements[filter].sort() : measurements.sort()

  if (!id || !mset) return null

  const updateMeasies = (m, val) => {
    const newMeasies = { ...measies }
    newMeasies[m] = val
    setMeasies(newMeasies)
  }

  const save = async () => {
    setLoadingStatus([true, 'Gathering info'])
    // Compile data
    const data = { measies: {} }
    if (name || name !== mset.name) data.name = name
    if (image || image !== mset.image) data.img = image
    if ([true, false].includes(isPublic) && isPublic !== mset.public) data.public = isPublic
    if ([true, false].includes(imperial) && imperial !== mset.imperial) data.imperial = imperial
    if (notes || notes !== mset.notes) data.notes = notes
    // Add measurements
    for (const m of measurements) {
      if (measies[m] || measies[m] !== mset.measies[m]) data.measies[m] = measies[m]
    }
    setLoadingStatus([true, 'Saving measurements set'])
    const [status, body] = await backend.updateSet(mset.id, data)
    if (status === 200 && body.result === 'success') {
      setMset(body.set)
      setEdit(false)
      setLoadingStatus([true, 'Nailed it', true, true])
    } else
      setLoadingStatus([true, 'That did not go as planned. Saving the set failed.', true, false])
  }

  const togglePublic = async () => {
    setLoadingStatus([true, 'Getting ready'])
    const [status, body] = await backend.updateSet(mset.id, { public: !mset.public })
    if (status === 200 && body.result === 'success') {
      setMset(body.set)
      setLoadingStatus([true, 'Alright, done!', true, true])
    } else setLoadingStatus([true, 'Backend says no :(', true, false])
  }

  const importSet = async () => {
    setLoadingStatus([true, 'Importing data'])
    // Compile data
    const data = {
      ...mset,
      userId: account.id,
      measies: { ...mset.measies },
    }
    delete data.img
    const [status, body] = await backend.createSet(data)
    if (status === 201 && body.result === 'created') {
      setLoadingStatus([true, 'Loading newly created set', true, true])
      window.location = `/account/data/sets/set?id=${body.set.id}`
    } else setLoadingStatus([true, 'We failed to create this measurements set', true, false])
  }

  const heading = (
    <>
      <div className="tw-flex tw-flex-wrap md:tw-flex-nowrap tw-flex-row tw-gap-2 tw-w-full">
        <div className="tw-w-full md:tw-w-96 tw-shrink-0">
          <MsetCard set={mset} control={control} Link={Link} />
        </div>
        <div className="tw-flex tw-flex-col tw-justify-end tw-gap-2 tw-mb-2 tw-grow">
          {account.control > 2 && mset.public && mset.userId !== account.id ? (
            <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center">
              <a
                className="tw-daisy-badge tw-daisy-badge-secondary tw-font-bold tw-daisy-badge-lg"
                href={`${urls.backend}/sets/${mset.id}.json`}
              >
                JSON
              </a>
              <a
                className="tw-daisy-badge tw-daisy-badge-success tw-font-bold tw-daisy-badge-lg"
                href={`${urls.backend}/sets/${mset.id}.yaml`}
              >
                YAML
              </a>
            </div>
          ) : (
            <span></span>
          )}
          {account.control > 3 && mset.userId === account.id ? (
            <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center">
              <button
                className="tw-daisy-badge tw-daisy-badge-secondary tw-font-bold tw-daisy-badge-lg"
                onClick={() =>
                  setModal(
                    <ModalWrapper keepOpenOnClick>
                      <Json js={mset} />
                    </ModalWrapper>
                  )
                }
              >
                JSON
              </button>
              <button
                className="tw-daisy-badge tw-daisy-badge-success tw-font-bold tw-daisy-badge-lg tw-text-neutral-content"
                onClick={() =>
                  setModal(
                    <ModalWrapper keepOpenOnClick>
                      <Yaml js={mset} />
                    </ModalWrapper>
                  )
                }
              >
                YAML
              </button>
            </div>
          ) : (
            <span></span>
          )}
          {account.id && account.control > 2 && mset.public && mset.userId !== account.id ? (
            <button
              className="tw-daisy-btn tw-daisy-btn-primary"
              title="Import measurements set"
              onClick={importSet}
            >
              <div className="tw-flex tw-flex-row tw-gap-4 tw-justify-between tw-items-center tw-w-full">
                <UploadIcon />
                Import measurements set
              </div>
            </button>
          ) : null}
          {account.control > 2 ? (
            <BookmarkButton slug={`sets/${mset.id}`} title={mset.name} type="set" thing="set" />
          ) : null}
          <button
            onClick={() =>
              setModal(
                <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
                  <img src={cloudflareImageUrl({ type: 'public', id: mset.img })} />
                </ModalWrapper>
              )
            }
            className={`tw-daisy-btn tw-daisy-btn-secondary tw-btn-outline ${horFlexClasses}`}
          >
            <ShowcaseIcon />
            Show Image
          </button>
          {!publicOnly && (
            <>
              {account.control > 2 ? (
                <button
                  onClick={() => {
                    setSuggest(!suggest)
                    setEdit(false)
                  }}
                  className={`tw-daisy-btn ${
                    suggest ? 'tw-daisy-btn-neutral' : 'tw-daisy-btn-primary'
                  } tw-daisy-btn-outline ${horFlexClasses}`}
                >
                  {suggest ? <ResetIcon /> : <CuratedMeasurementsSetIcon />}
                  {suggest ? 'Cancel' : 'Suggest for curation'}
                </button>
              ) : null}
              {edit ? (
                <>
                  <button
                    onClick={() => {
                      setEdit(false)
                      setSuggest(false)
                    }}
                    className={`tw-daisy-btn tw-daisy-btn-neutral tw-daisy-btn-outline ${horFlexClasses}`}
                  >
                    <ResetIcon />
                    Cancel
                  </button>
                  <button
                    onClick={save}
                    className={`tw-daisy-btn tw-daisy-btn-primary ${horFlexClasses}`}
                  >
                    <UploadIcon />
                    Save measurements set
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEdit(true)
                    setSuggest(false)
                  }}
                  className={`tw-daisy-btn tw-daisy-btn-primary ${horFlexClasses}`}
                >
                  <EditIcon /> Edit measurements set
                </button>
              )}
            </>
          )}
          {account.control > 2 && mset.userId === account.id ? (
            <button
              className="tw-daisy-btn tw-daisy-btn-neutral"
              title="Clone measurements set"
              onClick={importSet}
            >
              <div className="tw-flex tw-flex-row tw-gap-4 tw-justify-between tw-items-center tw-w-full">
                <CloneIcon />
                Clone measurements set
              </div>
            </button>
          ) : null}
        </div>
      </div>
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-4 tw-text-sm tw-items-center tw-justify-between tw-mb-2"></div>
    </>
  )

  if (suggest)
    return (
      <div className="tw-w-full">
        {heading}
        <SuggestCset {...{ mset, setLoadingStatus, backend, Link }} />
      </div>
    )

  if (!edit)
    return (
      <div className="tw-w-full">
        {heading}

        <h2>Data</h2>
        <DisplayRow title="Name">{mset.name}</DisplayRow>
        <DisplayRow title="Units">{mset.imperial ? 'Imperial' : 'Metric'}</DisplayRow>
        {control >= controlConfig.account.sets.notes && (
          <DisplayRow title="Notes">
            <Markdown>{mset.notes}</Markdown>
          </DisplayRow>
        )}
        {control >= controlConfig.account.sets.public && (
          <>
            {mset.userId === account.id && (
              <DisplayRow title="Public">
                <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center tw-justify-between">
                  {mset.public ? (
                    <OkIcon className="tw-w-6 tw-h-6 tw-text-success" stroke={4} />
                  ) : (
                    <NoIcon className="tw-w-6 tw-h-6 tw-text-error" stroke={3} />
                  )}
                  <button
                    className="tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-sm"
                    onClick={togglePublic}
                  >
                    Make {mset.public ? 'Private' : 'Public'}
                  </button>
                </div>
              </DisplayRow>
            )}
            {mset.public && (
              <DisplayRow title="Permalink">
                <Link
                  href={`/set?id=${mset.id}`}
                  className={linkClasses}
                >{`/set?id=${mset.id}`}</Link>
              </DisplayRow>
            )}
          </>
        )}
        {control >= controlConfig.account.sets.createdAt && (
          <DisplayRow title="Created">
            {timeAgo(mset.createdAt, false)}
            <span className="tw-text-sm tw-pl-2">({shortDate(mset.createdAt, false)})</span>
          </DisplayRow>
        )}
        {control >= controlConfig.account.sets.updatedAt && (
          <DisplayRow title="Updated">
            {timeAgo(mset.updatedAt, false)}
            <span className="tw-text-sm tw-pl-2">({shortDate(mset.updatedAt, false)})</span>
          </DisplayRow>
        )}
        {control >= controlConfig.account.sets.id && <DisplayRow title="ID">{mset.id}</DisplayRow>}

        {Object.keys(mset.measies).length > 0 && (
          <>
            <h2>Measurements</h2>
            <ToggleInput
              label={false}
              labels={['Metric Units (cm)', 'Imperial Units (inch)']}
              update={() => setDisplayAsMetric(!displayAsMetric)}
              current={displayAsMetric}
            />
            {Object.entries(mset.measies).map(([m, val]) =>
              val > 0 ? (
                <DisplayRow
                  title={<MeasurementValue {...{ m, val, imperial: !displayAsMetric }} />}
                  key={m}
                >
                  <span className="tw-font-medium">{m}</span>
                </DisplayRow>
              ) : null
            )}
          </>
        )}
      </div>
    )

  return (
    <div className="tw-w-full">
      {heading}
      <h2 id="measies">Measurements</h2>
      <div className="tw-bg-secondary tw-px-4 tw-pt-1 tw-pb-4 tw-rounded-lg tw-shadow tw-bg-opacity-10">
        <DesignInput
          update={setFilter}
          label="Filter by design"
          current={filter}
          firstOption={<option value="">Clear filter</option>}
        />
      </div>
      {filterMeasurements().map((m) => (
        <MeasurementInput
          id={`measie-${m}`}
          key={m}
          m={m}
          imperial={mset.imperial}
          label={measurementTranslations[m]}
          current={mset.measies[m]}
          original={mset.measies[m]}
          update={updateMeasies}
        />
      ))}

      <h2 id="data">Data</h2>

      {/* Name is always shown */}
      <span id="name"></span>
      <StringInput
        id="set-name"
        label="Name"
        update={setName}
        current={name}
        original={mset.name}
        placeholder="Georg Cantor"
        valid={(val) => val && val.length > 0}
      />

      {/* img: Control level determines whether or not to show this */}
      <span id="image"></span>
      {account.control >= controlConfig.account.sets.img ? (
        <PassiveImageInput
          id="set-img"
          label="Image"
          update={setImage}
          current={image}
          valid={(val) => val.length > 0}
        />
      ) : null}

      {/* public: Control level determines whether or not to show this */}
      <span id="public"></span>
      {account.control >= controlConfig.account.sets.public ? (
        <ListInput
          id="set-public"
          label="Public"
          update={setIsPublic}
          list={[
            {
              val: true,
              label: (
                <div className="tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-justify-between tw-w-full">
                  <span>Public measurements set</span>
                  <OkIcon
                    className="tw-w-8 tw-h-8 tw-text-success tw-bg-base-100 tw-rounded-full tw-p-1"
                    stroke={4}
                  />
                </div>
              ),
              desc: 'Others are allowed to use these measurements to generate or test patterns',
            },
            {
              val: false,
              label: (
                <div className="tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-justify-between tw-w-full">
                  <span>Private measurements set</span>
                  <NoIcon
                    className="tw-w-8 tw-h-8 tw-text-error tw-bg-base-100 tw-rounded-full tw-p-1"
                    stroke={3}
                  />
                </div>
              ),
              desc: 'These measurements cannot be used by other users or visitors',
            },
          ]}
          current={isPublic}
        />
      ) : null}

      {/* units: Control level determines whether or not to show this */}
      <span id="units"></span>
      {account.control >= controlConfig.account.sets.units ? (
        <>
          <ListInput
            id="set-units"
            label="Units"
            update={setImperial}
            list={[
              {
                val: false,
                label: (
                  <div className="tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-justify-between tw-w-full">
                    <span>Metric units (cm)</span>
                    <span className="tw-text-inherit tw-text-2xl tw-pr-2">cm</span>
                  </div>
                ),
                desc: 'Pick this if you prefer cm over inches',
              },
              {
                val: true,
                label: (
                  <div className="tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-justify-between tw-w-full">
                    <span>Imperial units (inch)</span>
                    <span className="tw-text-inherit tw-text-4xl tw-pr-2">″</span>
                  </div>
                ),
                desc: 'Pick this if you prefer inches over cm',
              },
            ]}
            current={imperial}
          />
          <span className="tw-text-large tw-text-warning">
            Note: You must save after changing Units to have the change take effect on this page.
          </span>
        </>
      ) : null}

      {/* notes: Control level determines whether or not to show this */}
      <span id="notes"></span>
      {account.control >= controlConfig.account.sets.notes ? (
        <MarkdownInput
          id="set-notes"
          label="Notes"
          update={setNotes}
          current={notes}
          placeholder="You can use markdown here"
        />
      ) : null}
      <button
        onClick={save}
        className="tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-lg tw-flex tw-flex-row tw-items-center tw-gap-4 tw-mx-auto tw-mt-8"
      >
        <UploadIcon />
        Save Measurements Set
      </button>
    </div>
  )
}

/**
 * A (helper) component to display a measurements value
 *
 * @param {object} props - All React props
 * @param {string} val - The value
 * @param {string} m - The measurement name
 * @param {bool} imperial - True for imperial measurements, or metric by default
 */
export const MeasurementValue = ({ val, m, imperial = false }) =>
  isDegreeMeasurement(m) ? (
    <span>{val}°</span>
  ) : (
    <span dangerouslySetInnerHTML={{ __html: formatMm(val, imperial) }}></span>
  )

/**
 * React component to suggest a measurements set for curation
 *
 * @param {object} props - All React props
 * @param {string} mset - The measurements set
 */
export const SuggestCset = ({ mset, Link }) => {
  // State
  const [height, setHeight] = useState('')
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [submission, setSubmission] = useState(false)

  console.log(mset)

  // Hooks
  const backend = useBackend()

  // Method to submit the form
  const suggestSet = async () => {
    setLoadingStatus([true, 'Contacting backend'])
    const result = await backend.suggestCset({ set: mset.id, height, img, name, notes })
    if (result.success && result.data.submission) {
      setSubmission(result.data.submission)
      setLoadingStatus([true, 'Nailed it', true, true])
    } else setLoadingStatus([true, 'An unexpected error occured. Please report this.', true, false])
  }

  const missing = []
  for (const m of measurements) {
    if (typeof mset.measies[m] === 'undefined') missing.push(m)
  }

  if (submission) {
    const url = `/curate/sets/suggested/${submission.id}`

    return (
      <>
        <h2>Thank you</h2>
        <p>Your submission has been registered and will be processed by one of our curators.</p>
        <p>
          It is available at: <Link href={url}>{url}</Link>
        </p>
      </>
    )
  }

  return (
    <>
      <h2>Suggest a measurements set for curation</h2>
      <h4 className="tw-flex tw-flex-row tw-items-center tw-gap-2">
        {missing.length > 0 ? <BoolNoIcon /> : <BoolYesIcon />}
        Measurements
      </h4>
      {missing.length > 0 ? (
        <>
          <p>
            To ensure curated measurements sets work for all designs, you need to provide a full set
            of measurements.
          </p>
          <p>Your measurements set is missing the following measurements:</p>
          <ul className="tw-list tw-list-inside tw-list-disc tw-ml-4">
            {missing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>All measurements are available.</p>
      )}
      <h4 className="tw-flex tw-flex-row tw-items-center tw-gap-2">
        {name.length > 1 ? <BoolYesIcon /> : <BoolNoIcon />}
        Name
      </h4>
      <p>Each curated set has a name. You can suggest your own name or a pseudonym.</p>
      <StringInput label="Name" current={name} update={setName} valid={(val) => val.length > 1} />
      <h4 className="tw-flex tw-flex-row tw-items-center tw-gap-2">
        {height.length > 1 ? <BoolYesIcon /> : <BoolNoIcon />}
        Height
      </h4>
      <p>
        To allow organizing and presenting our curated sets in a structured way, we organize them by
        height.
      </p>
      <StringInput
        label="height"
        current={height}
        update={setHeight}
        valid={(val) => val.length > 1}
      />
      <h4 className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-mt-4">
        {img.length > 0 ? <BoolYesIcon /> : <BoolNoIcon />}
        Image
      </h4>
      <p>
        Finally, we need a picture. Please refer to the documentation to see what makes a good
        picture for a curated measurements set.
        <Link href="/docs/about/site/csets">Documentation</Link>
      </p>
      <PassiveImageInput
        label="Image"
        current={img}
        update={setImg}
        valid={(val) => val.length > 1}
      />
      <h4 className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-mt-4">
        <BoolYesIcon />
        Notes
      </h4>
      <p>If you would like to add any notes, you can do so here.</p>
      <Popout tip compact>
        This field supports markdown
      </Popout>
      <MarkdownInput label="Notes" current={notes} update={setNotes} valid={() => true} />
      <button
        className="tw-daisy-btn tw-daisy-btn-primary tw-w-full tw-mt-4"
        disabled={!(missing.length === 0 && height.length > 1 && img.length > 0)}
        onClick={suggestSet}
      >
        Suggest for curation
      </button>
    </>
  )
}

export const NewSet = () => {
  // Hooks
  const backend = useBackend()
  const { account } = useAccount()
  const { setLoadingStatus, LoadingProgress } = useContext(LoadingStatusContext)

  // State
  const [name, setName] = useState('')

  // Use account setting for imperial
  const imperial = account.imperial

  // Helper method to create a new set
  const createSet = async () => {
    setLoadingStatus([true, 'Storing new measurements set'])
    const [status, body] = await backend.createSet({ name, imperial })
    if (status === 201 && body.result === 'created') {
      setLoadingStatus([true, 'Nailed it', true, true])
      window.location = `/account/data/sets/set?id=${body.set.id}`
    } else
      setLoadingStatus([
        true,
        'Failed to save the measurments set. Please report this.',
        true,
        false,
      ])
  }

  return (
    <div className="tw-max-w-xl">
      <h5>Name</h5>
      <p>Give this set of measurements a name. That will help tell them apart.</p>
      <StringInput
        id="new-set"
        label="Name"
        update={setName}
        current={name}
        valid={(val) => val && val.length > 0}
        placeholder={'Georg Cantor'}
      />
      <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center tw-w-full tw-mt-8 tw-mb-2">
        <button
          className="tw-daisy-btn tw-daisy-btn-primary tw-grow tw-capitalize"
          disabled={name.length < 1}
          onClick={createSet}
        >
          New Measurements Set
        </button>
      </div>
    </div>
  )
}
