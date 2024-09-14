// Dependencies
import { slugify, slugifyNoTrim, cloudflareImageUrl } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useCallback } from 'react'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useDropzone } from 'react-dropzone'
import { Popout } from 'shared/components/popout/index.mjs'
import { Loading } from 'shared/components/spinner.mjs'
import { DownloadIcon } from 'shared/components/icons.mjs'

export const ns = ['account']

export const AuthorInput = ({ author, setAuthor }) => (
  <input
    className={`input input-text input-bordered input-lg w-full mb-2 ${
      author ? 'input-success' : 'input-error'
    }`}
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    value={author}
    placeholder="Enter the user ID here"
    onChange={(evt) => setAuthor(evt.target.value)}
  />
)

export const CaptionInput = ({ caption, setCaption }) => (
  <input
    className={`input input-text input-bordered input-lg w-full ${
      caption.length < 4 ? 'input-error' : 'input-success'
    }`}
    value={caption}
    placeholder="Type your caption here"
    onChange={(evt) => setCaption(evt.target.value)}
  />
)

export const IntroInput = ({ intro, setIntro }) => (
  <input
    className={`input input-text input-bordered input-lg w-full ${
      intro.length < 4 ? 'input-error' : 'input-success'
    }`}
    value={intro}
    placeholder="Type your intro here"
    onChange={(evt) => setIntro(evt.target.value)}
  />
)

export const BodyInput = ({ body, setBody }) => (
  <textarea
    className={`input input-text input-bordered input-lg w-full h-96 ${
      body.length < 4 ? 'input-error' : 'input-success'
    }`}
    placeholder="Type your post body here"
    onChange={(evt) => setBody(evt.target.value)}
    rows={16}
    value={body}
  />
)

export const TitleInput = ({ title, setTitle }) => (
  <input
    className={`input input-text input-bordered input-lg w-full ${
      title.length < 11 ? 'input-error' : 'input-success'
    }`}
    value={title}
    placeholder="Type your title here"
    onChange={(evt) => setTitle(evt.target.value)}
  />
)

export const SlugInput = ({ slug, setSlug, title, slugAvailable }) => {
  useEffect(() => {
    if (title !== slug) setSlug(slugify(title))
  }, [title])

  return (
    <input
      className={`input input-text input-bordered input-lg w-full mb-2 ${
        !slugAvailable || slug.length < 4 ? 'input-error' : 'input-success'
      }`}
      value={slug}
      placeholder="Type your title here"
      onChange={(evt) => setSlug(slugifyNoTrim(evt.target.value))}
    />
  )
}

export const ImageInput = ({ slug = false, setImg, img, type = 'showcase', subId = false }) => {
  const backend = useBackend()
  const { t } = useTranslation(ns)
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState('')

  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader()
      reader.onload = async () => {
        setUploading(true)
        const result = await backend.uploadImage({ type, subId, slug, img: reader.result })
        setUploading(false)
        if (result.success) setImg(result.data.imgId)
      }
      acceptedFiles.forEach((file) => reader.readAsDataURL(file))
    },
    [slug]
  )

  const imageFromUrl = async () => {
    setUploading(true)
    const result = await backend.uploadImage({ type, subId, slug, url })
    setUploading(false)
    if (result.success) setImg(result.data.imgId)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const removeImage = async () => {
    setUploading(true)
    const result = await backend.removeImage(img)
    setUploading(false)
    if (result.response.status === 204) setImg('')
  }

  if (!slug)
    return (
      <Popout note compact>
        A <b>slug</b> is mandatory
      </Popout>
    )
  if (!subId)
    return (
      <Popout note compact>
        A <b>subId</b> prop is mandatory
      </Popout>
    )

  if (uploading) return <Loading />

  if (img)
    return (
      <div>
        <div
          className="bg-base-100 w-full h-36 mb-2"
          style={{
            backgroundImage: `url(${cloudflareImageUrl({
              id: img,
              variant: 'sq500',
            })})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <button className="btn btn-error btn-sm" onClick={removeImage}>
          Remove Image
        </button>
      </div>
    )

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
        flex rounded-lg w-full flex-col items-center justify-center
        lg:p-6 lg:border-4 lg:border-secondary lg:border-dashed
      `}
      >
        <input {...getInputProps()} />
        <p className="hidden lg:block p-0 m-0">{t('imgDragAndDropImageHere')}</p>
        <p className="hidden lg:block p-0 my-2">{t('or')}</p>
        <button className={`btn btn-secondary btn-outline mt-4 px-8`}>{t('imgSelectImage')}</button>
      </div>
      <p className="hidden lg:block p-0 my-2 text-center">{t('or')}</p>
      <div className="flex flex-row items-center">
        <input
          type="url"
          className="input input-secondary w-full input-bordered rounded-r-none"
          placeholder="Paste an image URL here and click the download icon"
          value={url}
          onChange={(evt) => setUrl(evt.target.value)}
        />
        <button disabled={!url} className="btn btn-secondary rounded-l-none" onClick={imageFromUrl}>
          <DownloadIcon />
        </button>
      </div>
    </div>
  )
}
