import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { SetPicker, ns as setsNs } from 'shared/components/sets/set-picker.mjs'
import { Tabs, Tab } from 'shared/components/mdx/tabs.mjs'
import { MeasiesEditor } from './editor.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { designMeasurements } from 'shared/utils.mjs'
import { useTranslation } from 'next-i18next'
import { useToast } from 'shared/hooks/use-toast.mjs'

export const ns = ['wbmeasies', ...authNs, setsNs]

const tabNames = ['chooseNew', 'editCurrent']
export const MeasiesView = ({ design, Design, settings, update, missingMeasurements, setView }) => {
  const { t } = useTranslation(['wbmeasies'])
  const toast = useToast()

  const tabs = tabNames.map((n) => t(n)).join(',')

  const loadMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    setView('draft')
    toast.success(t('updatedMeasurements'))
  }

  return (
    <div className="m-6">
      <h1 className="max-w-6xl m-auto text-center">{t('measurements')}</h1>
      {missingMeasurements ? (
        <Popout note>
          <h5>We lack {missingMeasurements.length} measurements to create this pattern:</h5>
          <ul className="list list-inside list-disc ml-4">
            {missingMeasurements.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p>
            <b>
              You can either pick a measurements set, or enter them by hand, but we cannot proceed
              without these measurements.
            </b>
          </p>
        </Popout>
      ) : (
        <Popout tip>
          <h5>We have all required measurements to create this pattern.</h5>
        </Popout>
      )}
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
