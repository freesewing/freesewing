import { useState, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import useBackend from 'site/hooks/useBackend.js'
import Link from 'next/link'
import { Icons, welcomeSteps } from '../shared.js'
import { useDropzone } from 'react-dropzone'

export const namespaces = ['img']

const ImgSettings = ({ app, title = false, welcome = false }) => {
  const backend = useBackend(app)
  const { t } = useTranslation(namespaces)

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
    await backend.updateAccount({ img })
  }

  const nextHref = '/docs/guide'

  return (
    <>
      {title ? <h1 className="text-4xl">{t('title')}</h1> : null}
      <div>
        {!welcome || img !== false ? (
          <img alt="img" src={img || app.account.img} className="shadow mb-4" />
        ) : null}
        <div
          {...getRootProps()}
          className={`
          flex rounded-lg w-full flex-col items-center justify-center
          lg:h-64 lg:border-4 lg:border-secondary lg:border-dashed
        `}
        >
          <input {...getInputProps()} />
          <p className="hidden lg:block p-0 m-0">{t('dragAndDropImageHere')}</p>
          <p className="hidden lg:block p-0 my-2">{t('or')}</p>
          <button className={`btn btn-secondary btn-outline mt-4 w-64`}>{t('selectImage')}</button>
        </div>
      </div>
      <button className={`btn btn-secondary mt-4 w-64`} onClick={save} disabled={!img}>
        {t('save')}
      </button>

      {welcome ? (
        <>
          <Link href={nextHref} className="btn btn-primary w-full mt-12">
            {t('continue')}
          </Link>
          {welcomeSteps[app.account.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={700 / welcomeSteps[app.account.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                7 / {welcomeSteps[app.account.control].length}
              </span>
              <Icons
                done={welcomeSteps[app.account.control].slice(0, 6)}
                todo={welcomeSteps[app.account.control].slice(7)}
                current="img"
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default ImgSettings
