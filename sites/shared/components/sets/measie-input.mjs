import { isDegreeMeasurement } from 'config/measurements.mjs'
import { measurementAsMm, formatMm, measurementAsUnits } from 'shared/utils.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { PlusIcon, EditIcon } from 'shared/components/icons.mjs'
import { NumberInput } from 'shared/components/workbench/menus/shared/inputs.mjs'
import { useState, useCallback } from 'react'
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
  'w-full border-4 border-solid border-base-200 hover:border-secondary bg-secondary rounded bg-opacity-50 hover:bg-opacity-100'

const FractionButtons = ({ t, fraction }) => (
  <div className="flex flex-row mt-1 content-center items-center justify-around">
    <span className="text-xs inline-block pr-2">{t('fractions')}</span>
    <div className="grow max-w-2xl flex items-baseline">
      {Array.from({ length: 31 }, (_null, i) => {
        let denom = 32
        let num = i + 1

        for (let n = 4; n > 0; n--) {
          const fac = Math.pow(2, n)
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
              title={`${num}/${denom}″`}
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

  const isSet = typeof mset.measies?.[m] !== 'undefined'

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
  backend,
  refresh,
  toast,
  children,
  onUpdate,
  startLoading = () => null,
  stopLoading = () => null,
}) => {
  const isDegree = isDegreeMeasurement(m)
  const units = mset.imperial ? 'imperial' : 'metric'
  const [val, setVal] = useState(() => {
    const measie = mset.measies?.[m]
    if (!measie) return ''
    if (isDegree) return measie
    return measurementAsUnits(measie, units)
  })

  const [valid, setValid] = useState(null)

  // Update onChange
  const update = useCallback(
    (validVal, rawVal) => {
      setValid(validVal)
      setVal(validVal || rawVal)

      if (validVal && typeof onUpdate === 'function') {
        const useVal = isDegree ? validVal : measurementAsMm(validVal, units)
        onUpdate(m, useVal)
      }
    },
    [isDegree, setValid, setVal, onUpdate, units, m]
  )

  const save = async () => {
    // FIXME
    startLoading()
    const measies = {}
    measies[m] = isDegree ? val : measurementAsMm(val, units)
    const result = await backend.updateSet(mset.id, { measies })
    if (result.success) {
      refresh()
      toast.for.settingsSaved()
    } else toast.for.backendError()
    stopLoading()
  }

  const fraction = (i, base) => update(Math.floor(('' + val).split(/[\s.]/)[0]) + i / base)

  if (!m) return null

  return (
    <div className="form-control mb-2 ">
      <div className="flex items-center gap-4 flex-wrap mx-auto">
        <label className="shrink-0 grow max-w-full">
          {children}
          <span className="input-group focus-within:outline focus-within:ring outline-2 outline-offset-4 outline-primary-focus rounded-lg">
            <NumberInput
              className={`border-r-0 w-full border-4 focus:outline-0 input-primary`}
              value={val}
              onUpdate={update}
              onMount={setValid}
            />
            <span
              className={`bg-transparent border-y border-y-4 w-20
              ${valid === false && 'border-error  text-neutral-content'}
              ${valid && 'border-success text-neutral-content'}
              ${valid === null && 'text-base-content border-primary'}
         `}
            >
              <Mval
                imperial={mset.imperial}
                val={isDegree ? val : measurementAsMm(val, units)}
                m={m}
                className="text-base-content bg-transparent text-success text-xs font-bold p-0"
              />
            </span>
            <span
              role="img"
              className={`bg-transparent border-y border-y-4
              ${valid === false && 'border-error text-neutral-content'}
              ${valid && 'border-success text-neutral-content'}
              ${valid === null && 'border-primary text-base-content'}
           `}
            >
              <span className={`bg-transparent ${valid === null && 'invisible'}`}>
                {' '}
                {valid ? '👍' : '🤔'}
              </span>
            </span>
            <span
              className={`w-14 text-center
              ${valid === false && 'bg-error text-neutral-content'}
              ${valid && 'bg-success text-neutral-content'}
              ${valid === null && 'bg-primary text-primary-content'}
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
        <button className="btn btn-secondary w-24 mt-4" onClick={save} disabled={!valid}>
          {t('save')}
        </button>
      )}
    </div>
  )
}
