// Dependencies
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { freeSewingConfig as conf, controlLevels } from 'shared/config/freesewing.config.mjs'
import { shortDate, cloudflareImageUrl, capitalize } from 'shared/utils.mjs'
//import orderBy from 'lodash.orderby'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
// Components
import { DisplayRow } from './account/shared.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Markdown from 'react-markdown'
import Timeago from 'react-timeago'
import { MeasieVal } from './account/sets.mjs'
import { CameraIcon } from 'shared/components/icons.mjs'

export const ns = ['account', 'patterns', 'status', 'measurements', 'sets']

const SetLineup = ({ sets = [], onClick = false }) => (
  <div
    className={`w-full flex flex-row ${
      sets.length > 1 ? 'justify-start px-8' : 'justify-center'
    } overflow-x-scroll`}
    style={{
      backgroundImage: `url(/img/lineup-backdrop.svg)`,
      width: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
    }}
  >
    {sets.map((set) => {
      const props = {
        className: 'aspect-[1/3] w-auto h-96',
        style: {
          backgroundImage: `url(${cloudflareImageUrl({ id: set.img, type: 'lineup' })})`,
          width: 'auto',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
      }
      if (onClick) props.onClick = () => onClick(set.id)

      if (onClick) return <button {...props} key={set.id}></button>
      else return <div {...props} key={set.id}></div>
    })}
  </div>
)

const ShowCuratedSet = ({ cset }) => {
  const { control } = useAccount()
  const { t, i18n } = useTranslation(ns)
  const lang = i18n.language
  const { setModal } = useContext(ModalContext)

  if (!cset) return null

  return (
    <>
      <h2>{cset[`name${capitalize(lang)}`]}</h2>
      <div className="w-full">
        <SetLineup sets={[cset]} />
      </div>

      <div className="flex flex-wrap flex-row gap-2 w-full mt-4 items-center justify-end">
        {control > 3 && (
          <>
            <a
              className="badge badge-secondary font-bold badge-lg"
              href={`${conf.backend}/curated-sets/${cset.id}.json`}
            >
              JSON
            </a>
            <a
              className="badge badge-success font-bold badge-lg"
              href={`${conf.backend}/curated-sets/${cset.id}.yaml`}
            >
              YAML
            </a>
          </>
        )}
        <button
          onClick={() =>
            setModal(
              <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
                <img src={cloudflareImageUrl({ type: 'lineup', id: cset.img })} />
              </ModalWrapper>
            )
          }
          className={`btn btn-secondary btn-outline flex flex-row items-center justify-between w-48 grow-0`}
        >
          <CameraIcon />
          {t('showImage')}
        </button>
      </div>

      <h2>{t('data')}</h2>
      <DisplayRow title={t('name')}>{cset[`name${capitalize(lang)}`]}</DisplayRow>
      {control >= controlLevels.sets.notes && (
        <DisplayRow title={t('notes')}>
          <Markdown>{cset[`notes${capitalize(lang)}`]}</Markdown>
        </DisplayRow>
      )}
      {control >= controlLevels.sets.createdAt && (
        <DisplayRow title={t('created')}>
          <Timeago date={cset.createdAt} />
          <span className="px-2 opacity-50">|</span>
          {shortDate(i18n.language, cset.createdAt, false)}
        </DisplayRow>
      )}
      {control >= controlLevels.sets.updatedAt && (
        <DisplayRow title={t('updated')}>
          <Timeago date={cset.updatedAt} />
          <span className="px-2 opacity-50">|</span>
          {shortDate(i18n.language, cset.updatedAt, false)}
        </DisplayRow>
      )}
      {control >= controlLevels.sets.id && <DisplayRow title={t('id')}>{cset.id}</DisplayRow>}

      <h2>{t('measies')}</h2>
      {Object.entries(cset.measies).map(([m, val]) =>
        val > 0 ? (
          <DisplayRow title={<MeasieVal m={m} val={val} />} key={m}>
            <span className="font-medium">{t(m)}</span>
          </DisplayRow>
        ) : null
      )}
    </>
  )
}

export const CuratedSet = ({ id }) => {
  // Hooks
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const backend = useBackend()

  // State
  const [cset, setCset] = useState()

  // Effect
  useEffect(() => {
    const getCset = async () => {
      setLoadingStatus([true, 'status:contactingBackend'])
      const result = await backend.getCuratedSet(id)
      if (result.success) {
        setCset(result.data.curatedSet)
        setLoadingStatus([true, 'status:dataLoaded', true, true])
      } else setLoadingStatus([true, 'status:backendError', true, false])
    }
    if (id) getCset()
  }, [id])

  if (!id || !cset) return null

  return (
    <div className="max-w-2xl">
      <LoadingStatus />
      <ShowCuratedSet cset={cset} />
    </div>
  )
}

// Component for the curated-sets page
export const CuratedSets = () => {
  // Hooks
  const backend = useBackend()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  // State
  const [sets, setSets] = useState([])
  const [selected, setSelected] = useState(false)

  // Effects
  useEffect(() => {
    const getSets = async () => {
      setLoadingStatus([true, 'contactingBackend'])
      const result = await backend.getCuratedSets()
      if (result.success) {
        const allSets = {}
        for (const set of result.data.curatedSets) allSets[set.id] = set
        setSets(allSets)
        setLoadingStatus([true, 'status:dataLoaded', true, true])
      } else setLoadingStatus([true, 'status:backendError', true, false])
    }
    getSets()
  }, [])

  return (
    <div className="max-w-7xl xl:pl-4">
      <LoadingStatus />
      <SetLineup sets={Object.values(sets)} onClick={setSelected} />
      {selected && <ShowCuratedSet cset={sets[selected]} />}
    </div>
  )
}
