// Dependencies
import { useState, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { useDropzone } from 'react-dropzone'
import { cloudflareImageUrl } from 'shared/utils.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'
import { SaveSettingsButton } from 'shared/components/buttons/save-settings-button.mjs'

export const ns = ['account', 'status']

export const ImgSettings = ({ title = false, welcome = false }) => {
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const { t } = useTranslation(ns)

  const [img, setImg] = useState(false)
  const [url, setUrl] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach((file) => reader.readAsDataURL(file))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const save = async () => {
    setLoadingStatus([true, 'processingUpdate'])
    const result = await backend.updateAccount({ img: url ? url : img })
    if (result.success) {
      setAccount(result.data.account)
      setLoadingStatus([true, 'settingsSaved', true, true])
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const nextHref = '/docs/guide'

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      {title ? <h2 className="text-4xl">{t('imgTitle')}</h2> : null}
      <div>
        {!welcome || img !== false ? (
          <img
            alt="img"
            src={img || cloudflareImageUrl({ id: `user-${account.ihash}`, variant: 'public' })}
            className="shadow mb-4"
          />
        ) : null}
        <div
          {...getRootProps()}
          className={`
          flex rounded-lg w-full flex-col items-center justify-center
          lg:h-64 lg:border-4 lg:border-secondary lg:border-dashed
        `}
        >
          <input {...getInputProps()} />
          <p className="hidden lg:block p-0 m-0">{t('imgDragAndDropImageHere')}</p>
          <p className="hidden lg:block p-0 my-2">{t('or')}</p>
          <button className={`btn btn-secondary btn-outline mt-4 px-8`}>
            {t('imgSelectImage')}
          </button>
        </div>
        <p className="hidden lg:block p-0 my-2 text-center">{t('or')}</p>
        <div className="flex flex-row items-center">
          <input
            type="url"
            className="input input-secondary w-full input-bordered"
            placeholder="Paste an image URL here"
            value={url}
            onChange={(evt) => setUrl(evt.target.value)}
          />
        </div>
      </div>

      {welcome ? (
        <>
          <button className={`btn btn-secondary mt-4 px-8`} onClick={save} disabled={!img}>
            {t('save')}
          </button>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={700 / welcomeSteps[account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                7 / {welcomeSteps[account.control].length}
              </span>
              <Icons
                done={welcomeSteps[account.control].slice(0, 6)}
                todo={welcomeSteps[account.control].slice(7)}
                current="img"
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          <SaveSettingsButton btnProps={{ onClick: save }} />
          <BackToAccountButton />
        </>
      )}
    </div>
  )
}
