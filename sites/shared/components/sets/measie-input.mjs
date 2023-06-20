import { isDegreeMeasurement } from 'config/measurements.mjs'
import { measurementAsMm, formatMm } from 'shared/utils.mjs'
import { Collapse, useCollapseButton } from 'shared/components/collapse.mjs'
import {
  FilterIcon,
  ClearIcon,
  PlusIcon,
  OkIcon,
  NoIcon,
  TrashIcon,
  EditIcon,
} from 'shared/components/icons.mjs'
import { useState } from 'react'
export const ns = ['account']

const Mval = ({ m, val = false, imperial = false, className = '' }) =>
  val ? (
    isDegreeMeasurement(m) ? (
      <span className={className}>{val}°</span>
    ) : (
      <span
        dangerouslySetInnerHTML={{ __html: formatMm(val, imperial ? 'imperial' : 'metric') }}
        className={className}
      />
    )
  ) : null

const heightClasses = {
  2: 'h-12',
  4: 'h-10',
  8: 'h-8',
  16: 'h-6',
  32: 'h-4',
}
const fractionClasses =
  'w-full border-2 border-solid border-base-100 hover:border-secondary bg-secondary rounded bg-opacity-50 hover:bg-opacity-100'
const FractionButtons = ({ t, fraction }) => (
  <div className="flex flex-row mt-1 content-center items-center justify-around">
    <span className="text-xs inline-block pr-2">{t('fractions')}</span>
    <div className="grow max-w-2xl flex items-baseline">
      {Array.from({ length: 31 }, (_null, i) => {
        let denom = 32
        let num = i + 1

        for (var n = 4; n > 0; n--) {
          let fac = Math.pow(2, n)
          if (num % fac === 0) {
            denom = 32 / fac
            num = num / fac
            break
          }
        }

        return (
          <span className="group w-[3.125%] relative" key={i}>
            <button
              className={`${heightClasses[denom]} ${fractionClasses}`}
              title={`${num}/${denom}"`}
              onClick={() => fraction(num, denom)}
            />
            <span className="group-hover:visible invisible text-xs text-center absolute left-0 -bottom-6">{`${num}/${denom}"`}</span>
          </span>
        )
      })}
    </div>
  </div>
)
export const MeasieRow = (props) => {
  const { t, m, mset } = props

  const isSet = typeof mset.measies?.[m] === 'undefined' ? false : true

  return (
    <Collapse
      color="secondary"
      openTitle={t(m)}
      title={
        <>
          <div className="grow text-left md:text-right block md:inline font-bold pr-4">{t(m)}</div>
          {isSet ? (
            <Mval m={m} val={mset.measies[m]} imperial={mset.imperial} className="w-1/3" />
          ) : (
            <div className="w-1/3" />
          )}
        </>
      }
      toggle={isSet ? <EditIcon /> : <PlusIcon />}
      toggleClasses={`btn ${isSet ? 'btn-secondary' : 'btn-neutral bg-opacity-50'}`}
    >
      <MeasieInput {...props} />
    </Collapse>
  )
}

export const MeasieInput = ({
  t,
  m,
  mset,
  startLoading,
  stopLoading,
  backend,
  refresh,
  toast,
  children,
  onUpdate,
}) => {
  const isDegree = isDegreeMeasurement(m)
  const factor = isDegree ? 1 : mset.imperial ? 25.4 : 10

  const isValValid = (val) =>
    typeof val === 'undefined' || val === '' ? null : val != false && !isNaN(val)
  const isValid = (newVal) => (typeof newVal === 'undefined' ? isValValid(val) : isValValid(newVal))

  const [val, setVal] = useState(mset.measies?.[m] / factor || '')
  const [valid, setValid] = useState(isValid(mset.measies?.[m] / factor || ''))

  // Update onChange
  const update = (evt) => {
    setVal(evt.target.value)

    let useVal = isDegree
      ? evt.target.value
      : measurementAsMm(evt.target.value, mset.imperial ? 'imperial' : 'metric')
    const validUpdate = isValid(useVal)
    setValid(validUpdate)

    if (validUpdate && typeof onUpdate === 'function') {
      onUpdate(m, useVal)
    }
  }

  const save = async () => {
    // FIXME
    startLoading()
    const measies = {}
    measies[m] = val * factor
    const result = await backend.updateSet(mset.id, { measies })
    if (result.success) {
      refresh()
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  const fraction = (i, base) => update({ target: { value: Math.floor(val) + i / base } })

  if (!m) return null

  return (
    <div className="form-control mb-2 ">
      <div className="flex items-center gap-4 flex-wrap mx-auto">
        <label className="shrink-0 grow max-w-full">
          {children}
          <span className="input-group">
            <input
              type="number"
              step={mset.imperial && !isDegree ? 0.03125 : 0.1}
              className={`
                input input-bordered text-base-content border-r-0 w-full
                ${valid === false && 'input-error'}
                ${valid === true && 'input-success'}
              `}
              value={val}
              onChange={update}
            />
            {mset.imperial ? (
              <span
                className={`bg-transparent border-y w-20
                ${valid === false && 'border-error text-neutral-content'}
                ${valid === true && 'border-success text-neutral-content'}
                ${valid === null && 'border-base-200 text-base-content'}
           `}
              >
                <Mval
                  imperial={true}
                  val={val * 25.4}
                  m={m}
                  className="text-base-content bg-transparent text-success text-xs font-bold p-0"
                />
              </span>
            ) : null}
            <span
              role="img"
              className={`bg-transparent border-y
              ${valid === false && 'border-error text-neutral-content'}
              ${valid === true && 'border-success text-neutral-content'}
              ${valid === null && 'border-base-200 text-base-content'}
           `}
            >
              {valid === true && '👍'}
              {valid === false && '🤔'}
            </span>
            <span
              className={`w-14 text-center
              ${valid === false && 'bg-error text-neutral-content'}
              ${valid === true && 'bg-success text-neutral-content'}
              ${valid === null && 'bg-base-200 text-base-content'}
           `}
            >
              {isDegree ? '°' : mset.imperial ? 'in' : 'cm'}
            </span>
          </span>
        </label>
        {mset.imperial && (
          <div className="grow my-2 sm:min-w-[22rem]">
            {!isDegree && <FractionButtons {...{ t, fraction }} />}
          </div>
        )}
      </div>
      {backend && (
        <button className="btn btn-secondary w-24" onClick={save} disabled={!valid}>
          {t('save')}
        </button>
      )}
    </div>
  )
}
