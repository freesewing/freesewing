//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Dependencies
import { cloudflareImageUrl } from 'shared/utils.mjs'
import { collection } from 'site/hooks/use-design.mjs'
// Context
import { ModalContext } from 'shared/context/modal-context.mjs'
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Hooks
import { useState, useCallback, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useDropzone } from 'react-dropzone'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { Mdx } from 'shared/components/mdx/dynamic.mjs'
import { ResetIcon, DocsIcon, UploadIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { isDegreeMeasurement } from 'config/measurements.mjs'
import { measurementAsMm, measurementAsUnits, parseDistanceInput } from 'shared/utils.mjs'
import { Tabs, Tab } from 'shared/components/tabs.mjs'

export const ns = ['account', 'measurements', 'designs']

/*
 * Helper component to display a tab heading
 */
export const _Tab = ({
  id, // The tab ID
  label, // A label for the tab, if not set we'll use the ID
  activeTab, // Which tab (id) is active
  setActiveTab, // Method to set the active tab
}) => (
  <button
    className={`text-lg font-bold capitalize tab tab-bordered grow
    ${activeTab === id ? 'tab-active' : ''}`}
    onClick={() => setActiveTab(id)}
  >
    {label ? label : id}
  </button>
)

/*
 * Helper component to wrap a form control with a label
 */
export const FormControl = ({
  label, // the (top-left) label
  children, // Children to go inside the form control
  docs = false, // Optional top-right label
  labelBL = false, // Optional bottom-left label
  labelBR = false, // Optional bottom-right label
  forId = false, // ID of the for element we are wrapping
}) => {
  const { setModal } = useContext(ModalContext)

  if (labelBR && !labelBL) labelBL = <span></span>

  const topLabelChildren = (
    <>
      <span className="label-text text-lg font-bold mb-0 text-inherit">{label}</span>
      {docs ? (
        <span className="label-text-alt">
          <button
            className="btn btn-ghost btn-sm btn-circle hover:btn-secondary"
            onClick={() =>
              setModal(
                <ModalWrapper
                  flex="col"
                  justify="top lg:justify-center"
                  slideFrom="right"
                  keepOpenOnClick
                >
                  <div className="mdx max-w-prose">{docs}</div>
                </ModalWrapper>
              )
            }
          >
            <DocsIcon />
          </button>
        </span>
      ) : null}
    </>
  )
  const bottomLabelChildren = (
    <>
      {labelBL ? <span className="label-text-alt">{labelBL}</span> : null}
      {labelBR ? <span className="label-text-alt">{labelBR}</span> : null}
    </>
  )

  return (
    <div className="form-control w-full mt-2">
      {forId ? (
        <label className="label pb-0" htmlFor={forId}>
          {topLabelChildren}
        </label>
      ) : (
        <div className="label pb-0">{topLabelChildren}</div>
      )}
      {children}
      {labelBL || labelBR ? (
        forId ? (
          <label className="label" htmlFor={forId}>
            {bottomLabelChildren}
          </label>
        ) : (
          <div className="label">{bottomLabelChildren}</div>
        )
      ) : null}
    </div>
  )
}

/*
 * Helper method to wrap content in a button
 */
export const ButtonFrame = ({
  children, // Children of the button
  onClick, // onClick handler
  active, // Whether or not to render the button as active/selected
  accordion = false, // Set this to true to not set a background color when active
  dense = false, // Use less padding
}) => (
  <button
    className={`
    btn btn-ghost btn-secondary
    w-full ${dense ? 'mt-1 py-0 btn-sm' : 'mt-2 py-4 h-auto content-start'}
    border-2 border-secondary text-left bg-opacity-20
    ${accordion ? 'hover:bg-transparent' : 'hover:bg-secondary hover:bg-opacity-10'}
    hover:border-secondary hover:border-solid hover:border-2
    ${active ? 'border-solid' : 'border-dotted'}
    ${active && !accordion ? 'bg-secondary' : 'bg-transparent'}
    `}
    onClick={onClick}
  >
    {children}
  </button>
)

/*
 * Input for integers
 */
export const NumberInput = ({
  label, // Label to use
  update, // onChange handler
  valid, // Method that should return whether the value is valid or not
  current, // The current value
  original, // The original value
  placeholder, // The placeholder text
  docs = false, // Docs to load, if any
  id = '', // An id to tie the input to the label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
  max = 0,
  min = 220,
  step = 1,
}) => (
  <FormControl {...{ label, labelBL, labelBR, docs }} forId={id}>
    <input
      id={id}
      type="text"
      inputMode="decimal"
      placeholder={placeholder}
      value={current}
      onChange={(evt) => update(evt.target.value)}
      className={`input w-full input-bordered ${
        current === original ? 'input-secondary' : valid(current) ? 'input-success' : 'input-error'
      }`}
      {...{ max, min, step }}
    />
  </FormControl>
)

/*
 * Input for strings
 */
export const StringInput = ({
  label, // Label to use
  update, // onChange handler
  valid, // Method that should return whether the value is valid or not
  current, // The current value
  original, // The original value
  placeholder, // The placeholder text
  docs = false, // Docs to load, if any
  id = '', // An id to tie the input to the label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
}) => (
  <FormControl {...{ label, labelBL, labelBR, docs }} forId={id}>
    <input
      id={id}
      type="text"
      placeholder={placeholder}
      value={current}
      onChange={(evt) => update(evt.target.value)}
      className={`input w-full input-bordered ${
        current === original ? 'input-secondary' : valid(current) ? 'input-success' : 'input-error'
      }`}
    />
  </FormControl>
)

/*
 * Input for MFA code
 */
export const MfaInput = ({
  update, // onChange handler
  current, // The current value
  id = 'mfa', // An id to tie the input to the label
}) => {
  const { t } = useTranslation(['susi'])

  return (
    <StringInput
      label={t('susi:mfaCode')}
      valid={(val) => val.length > 4}
      {...{ update, current, id }}
      placeholder={t('susi:mfaCode')}
      docs={false}
    />
  )
}

/*
 * Input for passwords
 */
export const PasswordInput = ({
  label, // Label to use
  update, // onChange handler
  valid, // Method that should return whether the value is valid or not
  current, // The current value
  placeholder = '¯\\_(ツ)_/¯', // The placeholder text
  docs = false, // Docs to load, if any
  id = '', // An id to tie the input to the label
  onKeyDown = false, // Optionall capture certain keys (like enter)
}) => {
  const { t } = useTranslation(['account'])
  const [reveal, setReveal] = useState(false)

  const extraProps = onKeyDown ? { onKeyDown } : {}

  return (
    <FormControl
      label={label}
      docs={docs}
      forId={id}
      labelBR={
        <button
          className="btn btn-primary btn-ghost btn-xs -mt-2"
          onClick={() => setReveal(!reveal)}
        >
          {reveal ? t('hidePassword') : t('revealPassword')}
        </button>
      }
    >
      <input
        id={id}
        type={reveal ? 'text' : 'password'}
        placeholder={placeholder}
        value={current}
        onChange={(evt) => update(evt.target.value)}
        className={`input w-full input-bordered ${
          valid(current) ? 'input-success' : 'input-error'
        }`}
        {...extraProps}
      />
    </FormControl>
  )
}

/*
 * Input for email addresses
 */
export const EmailInput = ({
  label, // Label to use
  update, // onChange handler
  valid, // Method that should return whether the value is valid or not
  current, // The current value
  original, // The original value
  placeholder, // The placeholder text
  docs = false, // Docs to load, if any
  id = '', // An id to tie the input to the label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
}) => (
  <FormControl {...{ label, docs, labelBL, labelBR }} forId={id}>
    <input
      id={id}
      type="email"
      placeholder={placeholder}
      value={current}
      onChange={(evt) => update(evt.target.value)}
      className={`input w-full input-bordered ${
        current === original ? 'input-secondary' : valid(current) ? 'input-success' : 'input-error'
      }`}
    />
  </FormControl>
)

/*
 * Dropdown for designs
 */
export const DesignDropdown = ({
  label, // Label to use
  update, // onChange handler
  current, // The current value
  docs = false, // Docs to load, if any
  firstOption = null, // Any first option to add in addition to designs
  id = '', // An id to tie the input to the label
}) => {
  const { t } = useTranslation(['designs'])

  return (
    <FormControl label={label} docs={docs} forId={id}>
      <select
        id={id}
        className="select select-bordered w-full"
        onChange={(evt) => update(evt.target.value)}
        value={current}
      >
        {firstOption}
        {collection.map((design) => (
          <option key={design} value={design}>
            {t(`${design}.t`)}
          </option>
        ))}
      </select>
    </FormControl>
  )
}

/*
 * Input for an image
 */
export const ImageInput = ({
  label, // The label
  update, // The onChange handler
  current, // The current value
  original, // The original value
  docs = false, // Docs to load, if any
  active = false, // Whether or not to upload images
  imgType = 'showcase', // The image type
  imgSubid, // The image sub-id
  imgSlug, // The image slug or other unique identifier to use in the image ID
  id = '', // An id to tie the input to the label
}) => {
  const { t } = useTranslation(ns)
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const [url, setUrl] = useState(false)
  const [uploadedId, setUploadedId] = useState(false)

  const upload = async (img, fromUrl = false) => {
    setLoadingStatus([true, 'uploadingImage'])
    const data = {
      type: imgType,
      subId: imgSubid,
      slug: imgSlug,
    }
    if (fromUrl) data.url = img
    else data.img = img
    const result = await backend.uploadAnonImage(data)
    setLoadingStatus([true, 'allDone', true, true])
    if (result.success) {
      update(result.data.imgId)
      setUploadedId(result.data.imgId)
    } else setLoadingStatus([true, 'backendError', true, false])
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader()
      reader.onload = async () => {
        if (active) upload(reader.result)
        else update(reader.result)
      }
      acceptedFiles.forEach((file) => reader.readAsDataURL(file))
    },
    [current]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  if (current)
    return (
      <FormControl label={label} docs={docs}>
        <div
          className="bg-base-100 w-full h-36 mb-2 mx-auto flex flex-col items-center text-center justify-center"
          style={{
            backgroundImage: `url(${
              uploadedId ? cloudflareImageUrl({ type: 'public', id: uploadedId }) : current
            })`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50%',
          }}
        >
          <button
            className="btn btn-neutral btn-circle opacity-50 hover:opacity-100"
            onClick={() => update(original)}
          >
            <ResetIcon />
          </button>
        </div>
      </FormControl>
    )

  return (
    <FormControl label={label} docs={docs} forId={id}>
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
      <p className="p-0 my-2 text-center">{t('or')}</p>
      <div className="flex flex-row items-center">
        <input
          id={id}
          type="url"
          className="input input-secondary w-full input-bordered"
          placeholder={t('imgPasteUrlHere')}
          value={current}
          onChange={active ? (evt) => setUrl(evt.target.value) : (evt) => update(evt.target.value)}
        />
        {active && (
          <button
            className="btn btn-secondary ml-2 capitalize"
            disabled={!url || url.length < 1}
            onClick={() => upload(url, true)}
          >
            <UploadIcon /> {t('upload')}
          </button>
        )}
      </div>
    </FormControl>
  )
}

/*
 * Input for an image that is active (it does upload the image)
 */
export const ActiveImageInput = (props) => <ImageInput {...props} active={true} />

/*
 * Input for an image that is passive (it does not upload the image)
 */
export const PassiveImageInput = (props) => <ImageInput {...props} active={false} />

/*
 * Input for a list of things to pick from
 */
export const ListInput = ({
  update, // the onChange handler
  label, // The label
  list, // The list of items to present { val, label, desc }
  current, // The (value of the) current item
  docs = false, // Docs to load, if any
}) => (
  <FormControl label={label} docs={docs}>
    {list.map((item, i) => (
      <ButtonFrame key={i} active={item.val === current} onClick={() => update(item.val)}>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full text-lg leading-5">{item.label}</div>
          {item.desc ? (
            <div className="w-full text-normal font-normal normal-case pt-1 leading-5">
              {item.desc}
            </div>
          ) : null}
        </div>
      </ButtonFrame>
    ))}
  </FormControl>
)

/*
 * Input for markdown content
 */
export const MarkdownInput = ({
  label, // The label
  current, // The current value (markdown)
  update, // The onChange handler
  placeholder, // The placeholder content
  docs = false, // Docs to load, if any
  id = '', // An id to tie the input to the label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
}) => (
  <FormControl {...{ label, labelBL, labelBR, docs }} forId={id}>
    <Tabs tabs={['edit', 'preview']}>
      <Tab key="edit">
        <div className="flex flex-row items-center mt-4">
          <textarea
            id={id}
            rows="5"
            className="textarea textarea-bordered textarea-lg w-full"
            value={current}
            placeholder={placeholder}
            onChange={(evt) => update(evt.target.value)}
          />
        </div>
      </Tab>
      <Tab key="preview">
        <div className="flex flex-row items-center mt-4">
          <Mdx md={current} />
        </div>
      </Tab>
    </Tabs>
  </FormControl>
)

export const MeasieInput = ({
  imperial, // True for imperial, False for metric
  m, // The measurement name
  original, // The original value
  update, // The onChange handler
  placeholder, // The placeholder content
  docs = false, // Docs to load, if any
  id = '', // An id to tie the input to the label
}) => {
  const { t } = useTranslation(['measurements'])
  const isDegree = isDegreeMeasurement(m)
  const units = imperial ? 'imperial' : 'metric'

  const [localVal, setLocalVal] = useState(
    typeof original === 'undefined'
      ? original
      : isDegree
        ? Number(original)
        : measurementAsUnits(original, units)
  )
  const [validatedVal, setValidatedVal] = useState(measurementAsUnits(original, units))
  const [valid, setValid] = useState(null)

  // Update onChange
  const localUpdate = (newVal) => {
    setLocalVal(newVal)
    const parsedVal = isDegree ? Number(newVal) : parseDistanceInput(newVal, imperial)
    if (parsedVal) {
      update(m, isDegree ? parsedVal : measurementAsMm(parsedVal, units))
      setValid(true)
      setValidatedVal(parsedVal)
    } else setValid(false)
  }

  if (!m) return null

  // Various visual indicators for validating the input
  let inputClasses = 'input-secondary'
  let bottomLeftLabel = null
  if (valid === true) {
    inputClasses = 'input-success'
    const val = `${validatedVal}${isDegree ? '°' : imperial ? '"' : 'cm'}`
    bottomLeftLabel = <span className="font-medium text-base text-success -mt-2 block">{val}</span>
  } else if (valid === false) {
    inputClasses = 'input-error'
    bottomLeftLabel = (
      <span className="font-medium text-error text-base -mt-2 block">¯\_(ツ)_/¯</span>
    )
  }

  /*
   * I'm on the fence here about using a text input rather than number
   * Obviously, number is the more correct option, but when the user enter
   * text, it won't fire an onChange event and thus they can enter text and it
   * will not be marked as invalid input.
   * See: https://github.com/facebook/react/issues/16554
   */
  return (
    <FormControl
      label={t(m) + (isDegree ? ' (°)' : '')}
      docs={docs}
      forId={id}
      labelBL={bottomLeftLabel}
    >
      <input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={placeholder}
        value={localVal}
        onChange={(evt) => localUpdate(evt.target.value)}
        className={`input w-full input-bordered ${inputClasses}`}
      />
    </FormControl>
  )
}

export const FileInput = ({
  label, // The label
  valid = () => true, // Method that should return whether the value is valid or not
  update, // The onChange handler
  current, // The current value
  original, // The original value
  id = '', // An id to tie the input to the label
  dropzoneConfig = {}, // Configuration for react-dropzone
}) => {
  /*
   * Ondrop handler
   */
  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader()
      reader.onload = async () => update(reader.result)
      acceptedFiles.forEach((file) => reader.readAsDataURL(file))
    },
    [update]
  )

  /*
   * Dropzone hook
   */
  const { getRootProps, getInputProps } = useDropzone({ onDrop, ...dropzoneConfig })

  /*
   * If we have a current file, return this
   */
  if (current)
    return (
      <FormControl label={label} isValid={valid(current)}>
        <div className="bg-base-100 w-full h-36 mb-2 mx-auto flex flex-col items-center text-center justify-center">
          <button
            className="btn btn-neutral btn-circle opacity-50 hover:opacity-100"
            onClick={() => update(original)}
          >
            <ResetIcon />
          </button>
        </div>
      </FormControl>
    )

  /*
   * Return upload form
   */
  return (
    <FormControl label={label} forId={id} isValid={valid(current)}>
      <div
        {...getRootProps()}
        className={`
        flex rounded-lg w-full flex-col items-center justify-center
        sm:p-6 sm:border-4 sm:border-secondary sm:border-dashed
      `}
      >
        <input {...getInputProps()} />
        <p className="hidden lg:block p-0 m-0">Drag and drop your file here</p>
        <button className={`btn btn-secondary btn-outline mt-4 px-8`}>Browse...</button>
      </div>
    </FormControl>
  )
}

/*
 * Input for booleans
 */
export const ToggleInput = ({
  label, // Label to use
  update, // onChange handler
  current, // The current value
  disabled = false, // Allows rendering a disabled view
  list = [true, false], // The values to chose between
  labels = ['Yes', 'No'], // The labels for the values
  on = true, // The value that should show the toggle in the 'on' state
  id = '', // An id to tie the input to the label
  labelTR = false, // Top-Right label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
}) => (
  <FormControl
    {...{ labelBL, labelBR, labelTR }}
    label={
      label
        ? `${label} (${current === on ? labels[0] : labels[1]})`
        : `${current === on ? labels[0] : labels[1]}`
    }
    forId={id}
  >
    <input
      id={id}
      disabled={disabled}
      type="checkbox"
      value={current}
      onChange={() => update(list.indexOf(current) === 0 ? list[1] : list[0])}
      className="toggle my-3 toggle-primary"
      checked={list.indexOf(current) === 0 ? true : false}
    />
  </FormControl>
)
