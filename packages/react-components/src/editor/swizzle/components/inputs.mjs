// Hooks
import { useState } from 'react'

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
  Swizzled, // Object holding swizzled code
}) => {
  if (labelBR && !labelBL) labelBL = <span></span>

  const topLabelChildren = (
    <>
      <span className="label-text text-lg font-bold mb-0 text-inherit">{label}</span>
      {docs ? (
        <span className="label-text-alt">
          <button
            className="btn btn-ghost btn-sm btn-circle hover:btn-secondary"
            onClick={() =>
              Swizzled.methods.setModal(
                <Swizzled.components.ModalWrapper
                  flex="col"
                  justify="top lg:justify-center"
                  slideFrom="right"
                  keepOpenOnClick
                >
                  <div className="mdx max-w-prose">{docs}</div>
                </Swizzled.components.ModalWrapper>
              )
            }
          >
            <Swizzled.components.DocsIcon />
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
  Swizzled, // Object holding swizzled code
}) => (
  <Swizzled.components.FormControl {...{ label, labelBL, labelBR, docs }} forId={id}>
    <input
      id={id}
      type="number"
      placeholder={placeholder}
      value={current}
      onChange={(evt) => update(evt.target.value)}
      className={`input w-full input-bordered ${
        current === original ? 'input-secondary' : valid(current) ? 'input-success' : 'input-error'
      }`}
      {...{ max, min, step }}
    />
  </Swizzled.components.FormControl>
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
  Swizzled, // Object holding swizzled code
}) => (
  <Swizzled.components.FormControl {...{ label, labelBL, labelBR, docs }} forId={id}>
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
  </Swizzled.components.FormControl>
)

/*
 * Input for a list of things to pick from
 */
export const ListInput = ({
  update, // the onChange handler
  label, // The label
  list, // The list of items to present { val, label, desc }
  current, // The (value of the) current item
  docs = false, // Docs to load, if any
  Swizzled, // Object holding swizzled code
}) => (
  <Swizzled.components.FormControl label={label} docs={docs}>
    {list.map((item, i) => (
      <Swizzled.components.ButtonFrame
        key={i}
        active={item.val === current}
        onClick={() => update(item.val)}
      >
        <div className="w-full flex flex-col gap-2">
          <div className="w-full text-lg leading-5">{item.label}</div>
          {item.desc ? (
            <div className="w-full text-normal font-normal normal-case pt-1 leading-5">
              {item.desc}
            </div>
          ) : null}
        </div>
      </Swizzled.components.ButtonFrame>
    ))}
  </Swizzled.components.FormControl>
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
  Swizzled, // Swizzled code
}) => (
  <Swizzled.components.FormControl {...{ label, labelBL, labelBR, docs }} forId={id}>
    <Swizzled.components.Tabs tabs={['edit', 'preview']}>
      <Swizzled.components.Tab key="edit">
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
      </Swizzled.components.Tab>
      <Swizzled.components.Tab key="preview">
        <div className="mdx mt-4 shadow p-2 px-4 rounded">
          <Swizzled.components.Markdown>{current}</Swizzled.components.Markdown>
        </div>
      </Swizzled.components.Tab>
    </Swizzled.components.Tabs>
  </Swizzled.components.FormControl>
)

export const MeasurementInput = ({
  imperial, // True for imperial, False for metric
  m, // The measurement name
  original, // The original value
  update, // The onChange handler
  placeholder, // The placeholder content
  docs = false, // Docs to load, if any
  id = '', // An id to tie the input to the label
  Swizzled, // Swizzled code
}) => {
  const { t } = Swizzled.methods
  const isDegree = Swizzled.methods.isDegreeMeasurement(m)
  const units = imperial ? 'imperial' : 'metric'

  const [localVal, setLocalVal] = useState(
    typeof original === 'undefined'
      ? original
      : isDegree
        ? Number(original)
        : Swizzled.methods.measurementAsUnits(original, units)
  )
  const [validatedVal, setValidatedVal] = useState(
    Swizzled.methods.measurementAsUnits(original, units)
  )
  const [valid, setValid] = useState(null)

  // Update onChange
  const localUpdate = (newVal) => {
    setLocalVal(newVal)
    const parsedVal = isDegree
      ? Number(newVal)
      : Swizzled.methods.parseDistanceInput(newVal, imperial)
    if (parsedVal) {
      update(m, isDegree ? parsedVal : Swizzled.methods.measurementAsMm(parsedVal, units))
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
    <Swizzled.components.FormControl
      label={t(m) + (isDegree ? ' (°)' : '')}
      docs={docs}
      forId={id}
      labelBL={bottomLeftLabel}
    >
      <input
        id={id}
        type="number"
        placeholder={placeholder}
        value={localVal}
        onChange={(evt) => localUpdate(evt.target.value)}
        className={`input w-full input-bordered ${inputClasses}`}
      />
    </Swizzled.components.FormControl>
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
  Swizzled, // Object holding swizzled code
}) => (
  <Swizzled.components.FormControl
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
  </Swizzled.components.FormControl>
)
