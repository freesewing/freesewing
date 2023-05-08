// Dependencies
import orderBy from 'lodash.orderby'
import { capitalize } from 'shared/utils.mjs'
import { siteConfig } from 'site/site.config.mjs'
import { freeSewingConfig as conf } from 'shared/config/freesewing.config.mjs'
import { measurements, isDegreeMeasurement } from 'config/measurements.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Hooks
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Components
import Link from 'next/link'
import { PopoutWrapper } from 'shared/components/wrappers/popout.mjs'
import { Collapse, useCollapseButton } from 'shared/components/collapse.mjs'
import { ClearIcon, TrashIcon, EditIcon, FilterIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Timeago from 'react-timeago'
import { Tag } from 'shared/components/tag.mjs'
import { Row } from './index.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { EditRow, MeasieRow } from 'shared/components/account/sets.mjs'

export const ns = ['toast', 'curate', 'sets', 'account']

const EditImg = ({ set, t }) => {
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

const EditName = ({ set, t, lang }) => {
  return (
    <Collapse
      title={
        <div className="flex flex-row items-center gap-2">
          <b>{`${t('name')} (${lang.toUpperCase()})`}</b>
          {set[`name${capitalize(lang)}`]}
        </div>
      }
      primary
      buttons={[
        <button key="edit" className="btn btn-secondary hover:text-secondary-content border-0">
          <EditIcon key="button1" />
        </button>,
      ]}
    >
      {set[`name${capitalize(lang)}`]}
    </Collapse>
  )
}

const EditNotes = ({ set, t, lang }) => {
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
      {set[`name${capitalize(lang)}`]}
    </Collapse>
  )
}

const EditTags = ({ set, t, lang }) => {
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
      {set[`name${capitalize(lang)}`]}
    </Collapse>
  )
}

export const EditCuratedSet = ({ id }) => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)
  const { setNavigation } = useContext(NavigationContext)

  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t, i18n } = useTranslation('sets', 'curate', 'toast', 'account')
  const { language } = i18n
  const toast = useToast()

  // State
  const [set, setSet] = useState([])
  const [reload, setReload] = useState(0)
  const [filter, setFilter] = useState(false)

  // Force a refresh
  const refresh = () => setReload(reload + 1)

  // Effects
  useEffect(() => {
    const getCuratedSet = async () => {
      const result = await backend.getCuratedSet(id)
      if (result.success) {
        setSet(result.data.curatedSet)
      }
    }
    getCuratedSet()
  }, [reload])

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
