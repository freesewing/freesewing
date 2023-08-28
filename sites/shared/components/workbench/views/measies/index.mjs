// Dependencies
import { nsMerge } from 'shared/utils.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { designMeasurements } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { SetPicker, ns as setsNs } from 'shared/components/account/sets.mjs'
import { Tabs, Tab } from 'shared/components/tabs.mjs'
import { MeasiesEditor } from './editor.mjs'
import { Popout } from 'shared/components/popout/index.mjs'

export const ns = nsMerge(authNs, setsNs)

const tabNames = ['account:chooseASet', 'editCurrentMeasies']

export const MeasiesView = ({ design, Design, settings, update, missingMeasurements, setView }) => {
  const { t } = useTranslation(['workbench'])
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  const tabs = tabNames.map((n) => t(n)).join(',')

  const loadMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    setView('draft')
    setLoadingStatus([true, 'appliedMeasies', true, true])
  }

  return (
    <div className="max-w-7xl mx-auto my-6">
      <LoadingStatus />
      <div className="max-w-xl m-auto">
        <h2>{t('account:measurements')}</h2>
        {missingMeasurements ? (
          <Popout note dense noP>
            <h5>{t('weLackSomeMeasies', { nr: missingMeasurements.length })}</h5>
            <ol className="list list-inside ml-4 list-decimal">
              {missingMeasurements.map((m, i) => (
                <li key={i}>{t(`measurements:${m}`)}</li>
              ))}
            </ol>
            <p className="text-lg">{t('youCanPickOrEnter')}</p>
          </Popout>
        ) : (
          <Popout note compact ense oP>
            <span className="text-lg">{t('measiesOk')}</span>
          </Popout>
        )}
      </div>
      <Tabs tabs={tabs}>
        <Tab key="choose">
          <SetPicker design={design} clickHandler={loadMeasurements} />
        </Tab>
        <Tab key="edit">
          <MeasiesEditor {...{ Design, settings, update }} />
        </Tab>
      </Tabs>
    </div>
  )
}
