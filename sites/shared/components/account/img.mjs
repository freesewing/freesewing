// Dependencies
import { useState, useContext, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { useDropzone } from 'react-dropzone'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
// Components
import { Icons, welcomeSteps, BackToAccountButton } from './shared.mjs'
import { ContinueButton } from 'site/components/buttons/continue-button.mjs'
import { SaveSettingsButton } from 'site/components/buttons/save-settings-button.mjs'

export const ns = ['account', 'toast']

export const ImgSettings = ({ title = false, welcome = false }) => {
  const { loading, startLoading, stopLoading } = useContext(LoadingContext)
  const { account, setAccount, token } = useAccount()
  const backend = useBackend(token)
  const toast = useToast()
  const { t } = useTranslation(ns)

  const [img, setImg] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    acceptedFiles.forEach((file) => reader.readAsDataURL(file))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const save = async () => {
    startLoading()
    const result = await backend.updateAccount({ img })
    if (result.success) {
      setAccount(result.data.account)
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  const nextHref = '/docs/guide'

  return (
    <div className="max-w-xl">
      {title ? <h2 className="text-4xl">{t('imgTitle')}</h2> : null}
      <div>
        {!welcome || img !== false ? (
          <img alt="img" src={img || account.img} className="shadow mb-4" />
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
          <button className={`btn btn-secondary btn-outline mt-4 w-64`}>
            {t('imgSelectImage')}
          </button>
        </div>
      </div>

      {welcome ? (
        <>
          <button className={`btn btn-secondary mt-4 w-64`} onClick={save} disabled={!img}>
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
          <BackToAccountButton loading={loading} />
        </>
      )}
    </div>
  )
}
