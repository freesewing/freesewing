//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import { horFlexClasses, notEmpty } from 'shared/utils.mjs'
// Hooks
import { useContext, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { BookmarkIcon } from 'shared/components/icons.mjs'
import { StringInput } from 'shared/components/inputs.mjs'

export const ns = 'account'

export const CreateBookmark = ({ type, title, slug }) => {
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)
  const [name, setName] = useState(title)
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const { setModal } = useContext(ModalContext)

  const url = i18n.language === 'en' ? `/${slug}` : `/${i18n.language}/${slug}`

  const bookmark = async (evt) => {
    evt.stopPropagation()
    setLoadingStatus([true, 'status:contactingBackend'])
    const result = await backend.createBookmark({ type, title, url })
    if (result.success) {
      setLoadingStatus([true, 'status:nailedIt', true, true])
      setModal(false)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  return (
    <>
      <h2>{t('account:bookmarkThisThing', { thing: t(`account:${type}`) })}</h2>
      <StringInput
        label={t('account:title')}
        current={name}
        update={setName}
        valid={notEmpty}
        labelBL={url}
      />
      <button className="btn btn-primary w-full mt-4" onClick={bookmark}>
        <span>{t('account:bookmarkThisThing', { thing: t(`account:${type}`) })}</span>
      </button>
    </>
  )
}

export const BookmarkButton = ({ slug, type, title }) => {
  const { t } = useTranslation('account')
  const { setModal } = useContext(ModalContext)

  return (
    <button
      className={`btn btn-secondary btn-outline ${horFlexClasses}`}
      onClick={() =>
        setModal(
          <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
            <CreateBookmark {...{ type, title, slug }} />
          </ModalWrapper>
        )
      }
    >
      <BookmarkIcon />
      <span>{t('account:bookmark')}</span>
    </button>
  )
}
