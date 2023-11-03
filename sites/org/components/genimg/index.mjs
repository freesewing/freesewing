import { nsMerge } from 'shared/utils.mjs'
import { useState } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
import { StringInput, ListInput, ns as inputNs } from 'shared/components/inputs.mjs'

export const ns = nsMerge('genimg', inputNs)

const binaryToData = (binary) => {
  const img = new Image()
}

export const GenerateImage = () => {
  const backend = useBackend()
  const { t } = useTranslation(ns)

  const [title, setTitle] = useState('')
  const [intro, setIntro] = useState('')
  const [type, setType] = useState('tall')
  const [site, setSite] = useState(false)
  const [preview, setPreview] = useState(false)

  const generate = async () => {
    let result
    try {
      result = await backend.img({ title, intro, type, site })
      if (result.success) {
        const uint8Array = new Uint8Array(result.data)
        const base64String = btoa(String.fromCharCode.apply(null, uint8Array))
        setPreview(`data:image/png;base64,${base64String}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="max-w-xl">
      {preview ? (
        <>
          <img src={preview} />
          <button className="btn btn-primary w-full mt-4" onClick={() => setPreview(false)}>
            {t('genimg:generateAgain')}
          </button>
        </>
      ) : (
        <>
          <StringInput
            label={t('genimg:title')}
            current={title}
            update={setTitle}
            valid={() => true}
          />
          <StringInput
            label={t('genimg:intro')}
            current={intro}
            update={setIntro}
            valid={() => true}
          />
          <ListInput
            label={t('genimg:type')}
            current={type}
            update={setType}
            list={[
              {
                val: 'tall',
                label: t('genimg:tall'),
                desc: t('genimg:tallMsg'),
              },
              {
                val: 'square',
                label: t('genimg:square'),
                desc: t('genimg:squareMsg'),
              },
              {
                val: 'wide',
                label: t('genimg:wide'),
                desc: t('genimg:wideMsg'),
              },
            ]}
          />
          {type === 'wide' ? (
            <ListInput
              label={t('genimg:site')}
              current={site}
              update={setSite}
              list={[
                {
                  val: false,
                  label: t('genimg:none'),
                },
                {
                  val: 'org',
                  label: 'FreeSewing.org',
                },
                {
                  val: 'dev',
                  label: 'FreeSewing.dev',
                },
                {
                  val: 'social',
                  label: 'FreeSewing.social',
                },
              ]}
            />
          ) : null}
          <button onClick={generate} className="btn btn-primary w-full mt-4">
            {t('genimg:generate')}
          </button>
        </>
      )}
    </div>
  )
}
