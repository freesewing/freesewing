// Dependencies
import {
  cloudflareImageUrl,
  measurementAsMm,
  measurementAsUnits,
  distanceAsMm,
} from '@freesewing/utils'
import { collection } from '@freesewing/collection'
import { measurements as measurementsTranslations } from '@freesewing/i18n'
// Context
import { ModalContext } from '@freesewing/react/context/Modal'
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
// Hooks
import React, { useState, useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { useBackend } from '@freesewing/react/hooks/useBackend'
// Components
import { ResetIcon, UploadIcon } from '@freesewing/react/components/Icon'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { isDegreeMeasurement } from '@freesewing/config'
import { Tabs, Tab } from '@freesewing/react/components/Tab'
import Markdown from 'react-markdown'

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
    className={`tw-text-lg tw-font-bold tw-capitalize tw-daisy-tab tw-daisy-tab-bordered tw-grow
    ${activeTab === id ? 'tw-daisy-tab-active' : ''}`}
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
  labelBL = false, // Optional bottom-left label
  labelBR = false, // Optional bottom-right label
  forId = false, // ID of the for element we are wrapping
}) => {
  if (labelBR && !labelBL) labelBL = <span></span>

  const topLabelChildren = (
    <span className="tw-daisy-label-text tw-text-sm lg:tw-text-base tw-font-bold tw-mb-1 tw-text-inherit">
      {label}
    </span>
  )
  const bottomLabelChildren = (
    <>
      {labelBL ? <span className="tw-daisy-label-text-alt">{labelBL}</span> : null}
      {labelBR ? <span className="tw-daisy-label-text-alt">{labelBR}</span> : null}
    </>
  )

  return (
    <div className="tw-daisy-form-control tw-w-full tw-mt-2">
      {forId ? (
        <label className="tw-daisy-label tw-pb-0" htmlFor={forId}>
          {topLabelChildren}
        </label>
      ) : label ? (
        <div className="tw-daisy-label tw-pb-0">{topLabelChildren}</div>
      ) : null}
      {children}
      {labelBL || labelBR ? (
        forId ? (
          <label className="tw-daisy-label" htmlFor={forId}>
            {bottomLabelChildren}
          </label>
        ) : (
          <div className="tw-daisy-label">{bottomLabelChildren}</div>
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
    tw-daisy-btn tw-daisy-btn-ghost tw-daisy-btn-secondary tw-h-fit
    tw-w-full ${dense ? 'tw-mt-1 tw-daisy-btn-sm tw-font-light' : 'tw-mt-2 tw-py-4 tw-h-auto tw-content-start'}
    tw-border-2 tw-border-secondary tw-text-left tw-bg-opacity-20
    ${accordion ? 'hover:tw-bg-transparent' : 'hover:tw-bg-secondary hover:tw-bg-opacity-10'}
    hover:tw-border-secondary hover:tw-border-solid hover:tw-border-2
    ${active ? 'tw-border-solid' : 'tw-border-dotted'}
    ${active && !accordion ? 'tw-bg-secondary' : 'tw-bg-transparent'}
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
  id = '', // An id to tie the input to the label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
  max = 0,
  min = 220,
  step = 1,
}) => (
  <FormControl {...{ label, labelBL, labelBR }} forId={id}>
    <input
      id={id}
      type="text"
      inputMode="decimal"
      placeholder={placeholder}
      value={current}
      onChange={(evt) => update(evt.target.value)}
      className={`tw-daisy-input tw-w-full tw-daisy-input-bordered ${
        current === original
          ? 'tw-daisy-input-secondary'
          : valid(current)
            ? 'tw-daisy-input-success'
            : 'tw-daisy-input-error'
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
  id = '', // An id to tie the input to the label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
}) => (
  <FormControl {...{ label, labelBL, labelBR }} forId={id}>
    <input
      id={id}
      type="text"
      placeholder={placeholder}
      value={current}
      onChange={(evt) => update(evt.target.value)}
      className={`tw-daisy-input tw-w-full tw-daisy-input-bordered tw-text-current ${
        current === original
          ? 'tw-daisy-input-secondary'
          : valid(current)
            ? 'tw-daisy-input-success'
            : 'tw-daisy-input-error'
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
  return (
    <StringInput
      label="MFA Code"
      valid={(val) => val.length > 4}
      {...{ update, current, id }}
      placeholder="MFA Code"
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
  id = '', // An id to tie the input to the label
  onKeyDown = false, // Optionall capture certain keys (like enter)
}) => {
  const [reveal, setReveal] = useState(false)

  const extraProps = onKeyDown ? { onKeyDown } : {}

  return (
    <FormControl
      label={label}
      forId={id}
      labelBR={
        <button
          className="tw-btn tw-btn-primary tw-btn-ghost tw-btn-xs tw--mt-2"
          onClick={() => setReveal(!reveal)}
        >
          {reveal ? 'Hide Password' : 'Reveal Password'}
        </button>
      }
    >
      <input
        id={id}
        type={reveal ? 'text' : 'password'}
        placeholder={placeholder}
        value={current}
        onChange={(evt) => update(evt.target.value)}
        className={`tw-daisy-input tw-w-full tw-daisy-input-bordered ${
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
  id = '', // An id to tie the input to the label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
}) => (
  <FormControl {...{ label, labelBL, labelBR }} forId={id}>
    <input
      id={id}
      type="email"
      placeholder={placeholder}
      value={current}
      onChange={(evt) => update(evt.target.value)}
      className={`tw-daisy-input tw-w-full tw-daisy-input-bordered ${
        current === original
          ? 'tw-daisy-input-secondary'
          : valid(current)
            ? 'tw-daisy-input-success'
            : 'tw-daisy-input-error'
      }`}
    />
  </FormControl>
)

/*
 * Input for designs
 */
export const DesignInput = ({
  label, // Label to use
  update, // onChange handler
  current, // The current value
  firstOption = null, // Any first option to add in addition to designs
  id = '', // An id to tie the input to the label
}) => {
  return (
    <FormControl label={label} forId={id}>
      <select
        id={id}
        className="tw-daisy-select tw-daisy-select-bordered tw-w-full"
        onChange={(evt) => update(evt.target.value)}
        value={current}
      >
        {firstOption}
        {collection.map((design) => (
          <option key={design} value={design}>
            {design}
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
  active = false, // Whether or not to upload images
  imgType = 'showcase', // The image type
  imgSubid, // The image sub-id
  imgSlug, // The image slug or other unique identifier to use in the image ID
  id = '', // An id to tie the input to the label
}) => {
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
      <FormControl label={label}>
        <div
          className="tw-bg-base-100 tw-w-full tw-h-36 tw-mb-2 tw-mx-auto tw-flex tw-flex-col tw-items-center tw-text-center tw-justify-center"
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
            className="tw-daisy-btn tw-daisy-btn-neutral tw-daisy-btn-circle tw-opacity-50 hover:tw-opacity-100"
            onClick={() => update(original)}
          >
            <ResetIcon />
          </button>
        </div>
      </FormControl>
    )

  return (
    <FormControl label={label} forId={id}>
      <div
        {...getRootProps()}
        className={`
        tw-flex tw-rounded-lg tw-w-full tw-flex-col tw-items-center tw-justify-center
        lg:tw-p-6 lg:tw-border-4 lg:tw-border-secondary lg:tw-border-dashed
      `}
      >
        <input {...getInputProps()} />
        <p className="tw-hidden lg:tw-block tw-p-0 tw-m-0">Drag and drop and image here</p>
        <p className="tw-hidden lg:tw-block tw-p-0 tw-my-2">or</p>
        <button
          className={`tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline tw-mt-4 tw-px-8`}
        >
          Select an image to use
        </button>
      </div>
      <p className="tw-p-0 tw-my-2 tw-text-center">or</p>
      <div className="tw-flex tw-flex-row tw-items-center">
        <input
          id={id}
          type="url"
          className="tw-daisy-input tw-daisy-input-secondary tw-w-full tw-daisy-input-bordered"
          placeholder="Paste an image URL here"
          value={current}
          onChange={active ? (evt) => setUrl(evt.target.value) : (evt) => update(evt.target.value)}
        />
        {active && (
          <button
            className="tw-daisy-btn tw-daisy-btn-secondary tw-ml-2 tw-capitalize"
            disabled={!url || url.length < 1}
            onClick={() => upload(url, true)}
          >
            <UploadIcon /> Upload
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
}) => (
  <FormControl label={label}>
    {list.map((item, i) => (
      <ButtonFrame key={i} active={item.val === current} onClick={() => update(item.val)}>
        <div className="tw-w-full tw-flex tw-flex-col tw-gap-2">
          <div className="tw-w-full tw-text-lg tw-leading-5">{item.label}</div>
          {item.desc ? (
            <div className="tw-w-full tw-text-normal tw-font-normal tw-normal-case tw-pt-1 tw-leading-5">
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
  id = '', // An id to tie the input to the label
  labelBL = false, // Bottom-Left label
  labelBR = false, // Bottom-Right label
}) => (
  <FormControl
    {...{ label, labelBR }}
    forId={id}
    labelBL={labelBL ? labelBL : 'This field supports markdown'}
  >
    <Tabs tabs={['edit', 'preview']}>
      <Tab key="edit">
        <div className="tw-flex tw-flex-row tw-items-center tw-mt-2">
          <textarea
            id={id}
            rows="5"
            className="tw-daisy-textarea tw-daisy-textarea-bordered tw-daisy-textarea-lg tw-w-full"
            value={current}
            placeholder={placeholder}
            onChange={(evt) => update(evt.target.value)}
          />
        </div>
      </Tab>
      <Tab key="preview">
        <div className="mdx markdown">
          <Markdown>{current}</Markdown>
        </div>
      </Tab>
    </Tabs>
  </FormControl>
)

export const MeasurementInput = ({
  imperial, // True for imperial, False for metric
  m, // The measurement name
  original, // The original value
  update, // The onChange handler
  placeholder, // The placeholder content
  id = '', // An id to tie the input to the label
}) => {
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
    const parsedVal = isDegree ? Number(newVal) : distanceAsMm(newVal, imperial)
    if (parsedVal) {
      update(m, isDegree ? parsedVal : measurementAsMm(parsedVal, units))
      setValid(true)
      setValidatedVal(parsedVal)
    } else setValid(false)
  }

  if (!m) return null

  // Various visual indicators for validating the input
  let inputClasses = 'daisy-input-secondary'
  let bottomLeftLabel = null
  if (valid === true) {
    inputClasses = 'daisy-input-success tw-outline-success'
    const val = `${validatedVal}${isDegree ? '°' : imperial ? '"' : 'cm'}`
    bottomLeftLabel = (
      <span className="tw-font-medium tw-text-base tw-text-success tw--mt-2 tw-block">{val}</span>
    )
  } else if (valid === false) {
    inputClasses = 'daisy-input-error'
    bottomLeftLabel = (
      <span className="tw-font-medium tw-text-error tw-text-base tw--mt-2 tw-block">
        ¯\_(ツ)_/¯
      </span>
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
      label={measurementsTranslations[m] + (isDegree ? ' (°)' : '')}
      forId={id}
      labelBL={bottomLeftLabel}
    >
      <label
        className={`tw-daisy-input tw-daisy-input-bordered tw-flex tw-items-center tw-gap-2 tw-border ${inputClasses} tw-mb-1 tw-outline tw-outline-base-300 tw-bg-transparent tw-outline-2 tw-outline-offset-2`}
      >
        <input
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
          value={localVal}
          onChange={(evt) => localUpdate(evt.target.value)}
          className={`tw-border-0 tw-grow-2 tw-w-full`}
        />
        {isDegree ? '°' : imperial ? 'inch' : 'cm'}
      </label>
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
        <div className="tw-bg-base-100 tw-w-full tw-h-36 tw-mb-2 tw-mx-auto tw-flex tw-flex-col tw-items-center tw-text-center tw-justify-center">
          <button
            className="tw-daisy-btn tw-daisy-btn-neutral tw-daisy-btn-circle tw-opacity-50 hover:tw-opacity-100"
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
        tw-flex tw-rounded-lg tw-w-full tw-flex-col tw-items-center tw-justify-center
        sm:tw-p-6 sm:tw-border-4 sm:tw-border-secondary sm:tw-border-dashed
      `}
      >
        <input {...getInputProps()} />
        <p className="tw-hidden lg:tw-block tw-p-0 tw-m-0">Drag and drop your file here</p>
        <button
          className={`tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline tw-mt-4 tw-px-8`}
        >
          Browse...
        </button>
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
      className="tw-daisy-toggle tw-my-3 tw-daisy-toggle-primary"
      checked={list.indexOf(current) === 0 ? true : false}
    />
  </FormControl>
)
