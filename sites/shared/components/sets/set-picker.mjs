// Dependencies
import orderBy from 'lodash.orderby'
import { measurements } from 'site/prebuild/design-measurements.mjs'
// Hooks
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Components
import { SetCandidate, ns as setNs } from 'shared/components/sets/set-candidate.mjs'

export const ns = setNs

export const SetPicker = ({ design }) => {
  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation('sets')

  // State
  const [sets, setSets] = useState({})
  const [list, setList] = useState([])

  // Effects
  useEffect(() => {
    const getSets = async () => {
      const result = await backend.getSets()
      if (result.success) {
        const all = {}
        for (const set of result.data.sets) all[set.id] = set
        setSets(all)
      }
    }
    getSets()
  }, [])

  // Need to sort designs by their translated title
  const translated = {}
  for (const d of list) translated[t(`${d}.t`)] = d

  return (
    <>
      <h2>Please choose a set of measurements</h2>
      <p>
        FreeSewing generates made-to-measure sewing patterns. You need to pick a measurements set to
        generate a pattern for.
      </p>
      {Object.keys(sets).length > 0 ? (
        <div className="flex flex-row flex-wrap gap-2">
          {orderBy(sets, ['name'], ['asc']).map((set) => (
            <div className="w-full lg:w-96">
              <SetCandidate set={set} requiredMeasies={measurements[design]} design={design} />
            </div>
          ))}
        </div>
      ) : (
        <p>no measies</p>
      )}
    </>
  )
}
