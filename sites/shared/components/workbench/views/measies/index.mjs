import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SetPicker, ns as setsNs } from 'shared/components/sets/set-picker.mjs'
import { Tab } from 'shared/components/account/bio.mjs'
import { Popout } from 'shared/components/popout.mjs'

export const ns = ['wbmeasies']

export const MeasiesView = ({ design, missingMeasurements, settings }) => {
  const { t, i18n } = useTranslation(ns)
  const [activeTab, setActiveTab] = useState('pick')

  // Shared props for tabs
  const tabProps = { activeTab, setActiveTab, t }

  return (
    <div className="m-auto max-w-6xl">
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

      <div className="tabs w-full">
        <Tab id="pick" {...tabProps} />
        <Tab id="edit" {...tabProps} />
      </div>
      {activeTab === 'pick' && <SetPicker design={design} />}
      {activeTab === 'edit' && <pre>{JSON.stringify(settings, null, 2)}</pre>}
    </div>
  )
}
