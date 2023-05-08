// Dependencies
import orderBy from 'lodash.orderby'
import { measurements } from 'site/prebuild/design-measurements.mjs'
import { capitalize } from 'shared/utils.mjs'
import { siteConfig } from 'site/site.config.mjs'
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
import Link from 'next/link'
import { PopoutWrapper } from 'shared/components/wrappers/popout.mjs'
import { Collapse, useCollapseButton } from 'shared/components/collapse.mjs'
import { TrashIcon, EditIcon, FilterIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Timeago from 'react-timeago'
import { Tag } from 'shared/components/tag.mjs'

export const ns = ['toast', 'curate', 'sets', 'account']

export const Row = ({ title, children }) => (
  <div className="flex flex-row flex-wrap items-center lg:gap-4 my-2">
    <div className="w-24 text-left md:text-right block md:inline font-bold pr-4">{title}</div>
    <div className="grow">{children}</div>
  </div>
)

const CuratedSet = ({
  set,
  account,
  t,
  startLoading,
  stopLoading,
  backend,
  refresh,
  toast,
  language,
}) => {
  const { setModal } = useContext(ModalContext)

  const remove = async () => {
    startLoading()
    const result = await backend.removeCuratedMeasurementsSet(set.id)
    if (result) toast.success(t('gone'))
    else toast.for.backendError()
    // This just forces a refresh of the list from the server
    // We obviously did not add a key here, but rather removed one
    refresh()
    stopLoading()
  }

  const removeModal = () => {
    setModal(
      <ModalWrapper slideFrom="top">
        <h2>{t('curate:areYouCertain')}</h2>
        <p>{t('curate:deleteCuratedItemWarning')}</p>
        <p className="flex flex-row gap-4 items-center justify-center">
          <button className="btn btn-neutral btn-outline px-8">{t('cancel')}</button>
          <button className="btn btn-error px-8" onClick={remove}>
            {t('delete')}
          </button>
        </p>
      </ModalWrapper>
    )
  }

  return (
    <Collapse
      title={set[`name${capitalize(language)}`]}
      primary
      buttons={[
        <Link
          key="edit"
          className="btn btn-secondary hover:text-secondary-content border-0"
          href={`/curate/sets/${set.id}`}
        >
          <EditIcon key="button1" />
        </Link>,
        <button
          key="rm"
          className="btn btn-error hover:text-error-content border-0"
          onClick={account.control > 4 ? remove : removeModal}
        >
          <TrashIcon key="button2" />
        </button>,
      ]}
    >
      <img src={set.img} />
      <Row title="ID">{set.id}</Row>
      <Row title={t('account:created')}>
        <Timeago date={set.createdAt} />
      </Row>
      <Row title={t('account:updated')}>
        <Timeago date={set.updatedAt} />
      </Row>
      {siteConfig.languages
        .sort()
        .map((lang) => capitalize(lang))
        .map((lang) => (
          <Row
            title={
              <>
                <span className="uppercase">{lang}</span> {t('name')}
              </>
            }
            key={`name${lang}`}
          >
            {set[`name${lang}`]}
          </Row>
        ))}
      <Link href={`/curate/sets/${set.id}`} className="btn btn-secondary w-full">
        edit
      </Link>
    </Collapse>
  )
}

export const CurateSets = () => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t, i18n } = useTranslation('sets', 'curate', 'toast', 'account')
  const { language } = i18n
  const toast = useToast()

  // State
  const [curatedSets, setCuratedSets] = useState([])
  const [filter, setFilter] = useState([])
  const [tags, setTags] = useState([])
  const [reload, setReload] = useState(0)

  // Force a refresh
  const refresh = () => setReload(reload + 1)

  // Effects
  useEffect(() => {
    const getCuratedSets = async () => {
      const result = await backend.getCuratedSets()
      if (result.success) {
        const all = []
        const allTags = new Set()
        for (const set of result.data.curatedSets) {
          all.push(set)
          for (const tag of set[`tags${capitalize(language)}`]) allTags.add(tag)
        }
        setCuratedSets(all)
        setTags([...allTags])
      }
    }
    getCuratedSets()
  }, [reload])

  const addFilter = (tag) => {
    const newFilter = [...filter, tag]
    setFilter(newFilter)
  }

  const removeFilter = (tag) => {
    const newFilter = filter.filter((t) => t !== tag)
    setFilter(newFilter)
  }

  const applyFilter = () => {
    const newList = new Set()
    for (const set of curatedSets) {
      const setTags = []
      for (const lang of siteConfig.languages) {
        const key = `tags${capitalize(lang)}`
        setTags.push(...set[key])
      }
      let match = 0
      for (const tag of filter) {
        if (setTags.includes(tag)) match++
      }
      if (match === filter.length) newList.add(set)
    }

    return [...newList]
  }

  const list = applyFilter()

  return (
    <div className="max-w-xl xl:pl-4">
      {tags.map((tag) => (
        <Tag onClick={() => addFilter(tag)}>{tag}</Tag>
      ))}
      <div className="flex flex-row items-center justify-between gap-2 my-2 p-2 px-4 border rounded-lg bg-secondary bg-opacity-10">
        <FilterIcon className="w-6 h-6 text-secondary" />
        <span>
          {list.length} / {curatedSets.length}
        </span>
        <button onClick={() => setFilter([])} className="btn btn-secondary btn-sm">
          clear
        </button>
      </div>
      {filter.map((tag) => (
        <Tag onClick={() => removeFilter(tag)} color="success" hoverColor="error">
          {tag}
        </Tag>
      ))}
      {list.map((set) => (
        <CuratedSet
          key={set.id}
          {...{ set, account, t, startLoading, stopLoading, backend, refresh, toast, language }}
        />
      ))}
    </div>
  )
}
