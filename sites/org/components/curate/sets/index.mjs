// Dependencies
import orderBy from 'lodash.orderby'
import { measurements } from 'site/prebuild/design-measurements.mjs'
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
import { TrashIcon, EditIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import Timeago from 'react-timeago'
import { siteConfig } from 'site/site.config.mjs'
import { capitalize } from 'shared/utils.mjs'

export const ns = ['toast', 'curate', 'sets', 'account']

const Row = ({ title, children }) => (
  <div className="flex flex-row flex-wrap items-center lg:gap-4 my-2">
    <div className="w-24 text-left md:text-right block md:inline font-bold pr-4">{title}</div>
    <div className="grow">{children}</div>
  </div>
)

const CuratedSet = ({ set, account, t, startLoading, stopLoading, backend, refresh, toast }) => {
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
      title={set.nameEn}
      openTitle={set.nameEn}
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
      <Link href={`/curate/sets/${set.id}`}>edit</Link>
    </Collapse>
  )
}

export const CurateSets = () => {
  // Context
  const { startLoading, stopLoading } = useContext(LoadingContext)

  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation('sets', 'curate', 'toast', 'account')
  const toast = useToast()

  // State
  const [curatedSets, setCuratedSets] = useState({})
  const [list, setList] = useState([])
  const [reload, setReload] = useState(0)

  // Force a refresh
  const refresh = () => setReload(reload + 1)

  // Effects
  useEffect(() => {
    const getCuratedSets = async () => {
      const result = await backend.getCuratedSets()
      if (result.success) {
        const all = {}
        for (const set of result.data.curatedSets) all[set.id] = set
        setCuratedSets(all)
      }
    }
    getCuratedSets()
  }, [reload])

  return (
    <div className="max-w-xl xl:pl-4">
      {Object.keys(curatedSets).map((set) => (
        <CuratedSet
          set={curatedSets[set]}
          {...{ account, t, startLoading, stopLoading, backend, refresh, toast }}
        />
      ))}
    </div>
  )
}
