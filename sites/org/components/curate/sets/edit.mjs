// Dependencies
import { capitalize } from 'shared/utils.mjs'
import { siteConfig } from 'site/site.config.mjs'
import { freeSewingConfig as conf } from 'shared/config/freesewing.config.mjs'
import { measurements } from 'config/measurements.mjs'
import { designMeasurements } from 'site/prebuild/design-measurements.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
// Hooks
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Components
import { Collapse } from 'shared/components/collapse.mjs'
import { ClearIcon, EditIcon, FilterIcon } from 'shared/components/icons.mjs'
import Timeago from 'react-timeago'
import { PageLink } from 'shared/components/page-link.mjs'
import { MeasieRow } from 'shared/components/account/sets.mjs'
import { ModalDesignPicker } from 'shared/components/modal/design-picker.mjs'

export const ns = ['toast', 'curate', 'sets', 'account']

const EditField = (props) => {
  if (props.field === 'nameEn') return <EditName {...props} lang="en" />
  if (props.field === 'nameDe') return <EditName {...props} lang="de" />
  if (props.field === 'nameEs') return <EditName {...props} lang="es" />
  if (props.field === 'nameFr') return <EditName {...props} lang="fr" />
  if (props.field === 'nameNl') return <EditName {...props} lang="nl" />
  if (props.field === 'notesEn') return <EditNotes {...props} lang="en" />
  if (props.field === 'notesDe') return <EditNotes {...props} lang="de" />
  if (props.field === 'notesEs') return <EditNotes {...props} lang="es" />
  if (props.field === 'notesFr') return <EditNotes {...props} lang="fr" />
  if (props.field === 'notesNl') return <EditNotes {...props} lang="nl" />
  if (props.field === 'tagsEn') return <EditTags {...props} lang="en" />
  if (props.field === 'tagsDe') return <EditTags {...props} lang="de" />
  if (props.field === 'tagsEs') return <EditTags {...props} lang="es" />
  if (props.field === 'tagsFr') return <EditTags {...props} lang="fr" />
  if (props.field === 'tagsNl') return <EditTags {...props} lang="nl" />
  if (props.field === 'img') return <EditImg {...props} />

  return <p>FIXME: No edit component for this field</p>
}
export const EditRow = (props) => (
  <Collapse
    color="secondary"
    openTitle={props.title}
    title={
      <>
        <div className="w-24 text-left md:text-right block md:inline font-bold pr-4">
          {props.title}
        </div>
        <div className="grow">{props.children}</div>
      </>
    }
    toggle={<EditIcon />}
    toggleClasses="btn btn-secondary"
  >
    <EditField field="name" {...props} />
  </Collapse>
)

const EditImg = ({ t }) => {
  return (
    <Collapse
      title={t('img')}
      primary
      buttons={[
        <button key="edit" className="btn btn-secondary hover:text-secondary-content border-0">
          <EditIcon key="button1" />
        </button>,
      ]}
    ></Collapse>
  )
}

const EditName = ({ mset, t, lang }) => {
  return (
    <Collapse
      title={
        <div className="flex flex-row items-center gap-2">
          <b>{`${t('name')} (${lang.toUpperCase()})`}</b>
          {mset[`name${capitalize(lang)}`]}
        </div>
      }
      primary
      buttons={[
        <button key="edit" className="btn btn-secondary hover:text-secondary-content border-0">
          <EditIcon key="button1" />
        </button>,
      ]}
    >
      {mset[`name${capitalize(lang)}`]}
    </Collapse>
  )
}

const EditNotes = ({ mset, t, lang }) => {
  return (
    <Collapse
      title={<b>{`${t('notes')} (${lang.toUpperCase()})`}</b>}
      primary
      buttons={[
        <button key="edit" className="btn btn-secondary hover:text-secondary-content border-0">
          <EditIcon key="button1" />
        </button>,
      ]}
    >
      {mset[`name${capitalize(lang)}`]}
    </Collapse>
  )
}

const EditTags = ({ mset, t, lang }) => {
  return (
    <Collapse
      title={<b>{`${t('tags')} (${lang.toUpperCase()})`}</b>}
      primary
      buttons={[
        <button key="edit" className="btn btn-secondary hover:text-secondary-content border-0">
          <EditIcon key="button1" />
        </button>,
      ]}
    >
      {mset[`name${capitalize(lang)}`]}
    </Collapse>
  )
}

export const EditCuratedSet = ({ id }) => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)
  const { setModal } = useContext(ModalContext)

  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const {
    t,
    //i18n
  } = useTranslation('sets', 'curate', 'toast', 'account')
  //const { language } = i18n
  const toast = useToast()

  // State
  const [set, setSet] = useState([])
  const [reload] = useState(0)
  const [filter, setFilter] = useState(false)

  // Force a refresh
  //const refresh = () => setReload(reload + 1)

  // Effects
  useEffect(() => {
    const getCuratedSet = async () => {
      const result = await backend.getCuratedSet(id)
      if (result.success) {
        setSet(result.data.curatedSet)
      }
    }
    getCuratedSet()
  }, [reload, backend, id])

  const editProps = {
    startLoading,
    stopLoading,
    account,
    backend,
    t,
    toast,
    mset: set,
    curated: true,
  }

  const filterMeasurements = () => {
    if (!filter) return measurements.map((m) => t(`measurements:${m}`)).sort()
    else return designMeasurements[filter].map((m) => t(`measurements:${m}`)).sort()
  }

  return (
    <div className="max-w-2xl xl:pl-4">
      <div className="p-4">
        {/* Meta info */}
        {account.control > 2 ? (
          <div className="flex flex-row gap-4 text-sm items-center justify-center mb-2">
            <div className="flex flex-row gap-2 items-center">
              <b>{t('permalink')}:</b>
              <PageLink href={`/sets/${set.id}`} txt={`/curated-sets/${set.id}`} />
            </div>
            <div>
              <b>{t('created')}</b>: <Timeago date={set.createdAt} />
            </div>
            <div>
              <b>{t('updated')}</b>: <Timeago date={set.updatedAt} />
            </div>
          </div>
        ) : null}

        {/* JSON & YAML links */}
        {account.control > 3 ? (
          <div className="flex flex-row gap-4 text-sm items-center justify-center">
            <a
              className="badge badge-secondary font-bold"
              href={`${conf.backend}/curated-sets/${set.id}.json`}
            >
              JSON
            </a>
            <a
              className="badge badge-success font-bold"
              href={`${conf.backend}/curated-sets/${set.id}.yaml`}
            >
              YAML
            </a>
          </div>
        ) : null}

        <h2>{t('account:data')}</h2>

        {/* img: Control level determines whether or not to show this */}
        {account.control >= conf.account.sets.img ? (
          <EditRow title={t('account:img')} field="img" {...editProps}>
            <img src={set.img} className="w-10 mask mask-squircle bg-neutral aspect-square" />
          </EditRow>
        ) : null}

        {/* Name is always shown */}
        {siteConfig.languages.map((lang) => (
          <EditRow
            title={`${t('account:name')} (${lang.toUpperCase()})`}
            field={`name${capitalize(lang)}`}
            {...editProps}
            key={`name${lang}`}
          >
            {set[`name${capitalize(lang)}`]}
          </EditRow>
        ))}

        {/* Notes are always shown */}
        {account.control >= conf.account.sets.notes
          ? siteConfig.languages.map((lang) => (
              <EditRow
                title={`${t('account:notes')} (${lang.toUpperCase()})`}
                field={`notes${capitalize(lang)}`}
                {...editProps}
                key={`notes${lang}`}
              >
                {set[`notes${capitalize(lang)}`]}
              </EditRow>
            ))
          : null}

        <h2>{t('account:measies')}</h2>

        <div className="flex flex-row items-center justify-center">
          <button
            className="btn btn-secondary btn-outline flex flex-row gap-4 rounded-r-none"
            onClick={() =>
              setModal(
                <ModalDesignPicker
                  designs={Object.keys(designMeasurements)}
                  setModal={setModal}
                  setter={setFilter}
                />
              )
            }
          >
            <FilterIcon />
            {filter ? t(`designs:${filter}.t`) : t(`designs:allDesigns`)}
          </button>
          <button
            className="btn btn-secondary btn-outline rounded-l-none border-l-0"
            onClick={() => setFilter(false)}
          >
            <ClearIcon />
          </button>
        </div>
        {filterMeasurements().map((m) => (
          <MeasieRow key={m} m={m} {...editProps} />
        ))}
      </div>
    </div>
  )
}
