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
import { CuratedSetCandidate } from 'shared/components/sets/curated-set-candidate.mjs'
import { PopoutWrapper } from 'shared/components/wrappers/popout.mjs'

export const ns = setNs

export const CuratedSetPicker = ({ design }) => {
  // Hooks
  const { account, token } = useAccount()
  const backend = useBackend(token)
  const { t } = useTranslation('sets')

  // State
  const [curatedSets, setCuratedSets] = useState({})
  const [list, setList] = useState([])

  // Effects
  useEffect(() => {
    const getCuratedSets = async () => {
      const result = await backend.getCuratedSets()
      if (result.success) {
        const all = {}
        for (const set of result.data.curatedSets) all[set.id] = set
        setCuratedSets(all)
      }
    }
    getCuratedSets()
  }, [])

  // Need to sort designs by their translated title
  const translated = {}
  for (const d of list) translated[t(`${d}.t`)] = d

  return (
    <>
      <h2>{t('chooseSet')}</h2>
      <PopoutWrapper tip>
        <h5>{t('patternForWhichSet')}</h5>
        <p>{t('fsmtm')}</p>
      </PopoutWrapper>
      {Object.keys(curatedSets).length > 0 ? (
        <>
          <div className="flex flex-row flex-wrap gap-2">
            {orderBy(curatedSets, ['name'], ['asc']).map((set) => (
              <div className="w-full lg:w-96">
                <CuratedSetCandidate
                  set={set}
                  requiredMeasies={measurements[design]}
                  design={design}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <PopoutWrapper fixme compact>
          Implement UI for when there are no sets
        </PopoutWrapper>
      )}
    </>
  )
}

export const UserSetPicker = ({ design }) => {
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
      <h2>{t('chooseSet')}</h2>
      <PopoutWrapper tip>
        <h5>{t('patternForWhichSet')}</h5>
        <p>{t('fsmtm')}</p>
      </PopoutWrapper>
      {Object.keys(sets).length > 0 ? (
        <>
          <div className="flex flex-row flex-wrap gap-2">
            {orderBy(sets, ['name'], ['asc']).map((set) => (
              <div className="w-full lg:w-96">
                <SetCandidate set={set} requiredMeasies={measurements[design]} design={design} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <PopoutWrapper fixme compact>
          Implement UI for when there are no sets
        </PopoutWrapper>
      )}
    </>
  )
}

export const SetPicker = ({ design }) => (
  <>
    <UserSetPicker design={design} />
    <CuratedSetPicker design={design} />
  </>
)
