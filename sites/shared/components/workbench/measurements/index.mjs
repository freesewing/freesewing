import React, { useMemo, useEffect, useState } from 'react'
import { MeasurementInput } from '../inputs/measurement.mjs'
import { adult, doll, giant } from '@freesewing/models'
import {
  CisFemaleIcon as WomenswearIcon,
  CisMaleIcon as MenswearIcon,
} from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'
import { Setting } from '../menu/core-settings/setting.mjs'
import { settings } from '../menu/core-settings/index.mjs'
import { Tab, Tabs } from 'shared/components/mdx/tabs.mjs'

const groups = { adult, doll, giant }

const icons = {
  cisFemale: <WomenswearIcon />,
  cisMale: <MenswearIcon />,
}

export const WorkbenchMeasurements = ({ app, design, gist, updateGist, gistReady }) => {
  const { t } = useTranslation(['app', 'cfp'])

  // Method to handle measurement updates
  const updateMeasurements = (value, m = false) => {
    if (m === false) {
      // Set all measurements
      updateGist('measurements', value)
    } else {
      // Set one measurement
      updateGist(['measurements', m], value)
    }
  }

  const [firstInvalid, setFirstInvalid] = useState(undefined)

  useEffect(() => {
    if (!gistReady) {
      return
    }
    for (const m of design.patternConfig?.measurements || []) {
      if (!gist?.measurements?.[m]) {
        setFirstInvalid(m)
        return
      }

      setFirstInvalid(undefined)
    }
  }, [gistReady])

  // Save us some typing
  const inputProps = useMemo(() => ({ app, updateMeasurements, gist }), [app, gist])
  const shortname = design.designConfig.data.name.replace('@freesewing/', '')

  return (
    <div className="m-auto max-w-2xl">
      <h1>
        <span className="capitalize mr-4 opacity-70">{shortname}:</span> {t('measurements')}
      </h1>
      <h2>{t('cfp:preloadMeasurements')}</h2>
      <Tabs tabs="Adults, Dolls, Giants">
        {Object.keys(groups).map((group) => (
          <Tab tabId={group} key={group}>
            {Object.keys(icons).map((type) => (
              <React.Fragment key={type}>
                <h4 className="mt-4">{t(type)}</h4>
                <ul className="flex flex-row flex-wrap gap-2">
                  {Object.keys(groups[group][type]).map((m) => (
                    <li key={`${m}-${type}-${group}`} className="">
                      <button
                        className="flex flex-row btn btn-outline"
                        onClick={() => updateMeasurements(groups[group][type][m], false)}
                      >
                        {icons[type]}
                        {group === 'adult' ? `${t('size')} ${m}` : `${m}%`}
                      </button>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ))}
          </Tab>
        ))}
      </Tabs>

      <h2 className="mt-8">{t('cfp:enterMeasurements')}</h2>
      <div className="my-2 border p-4 rounded-lg shadow bg-base-200">
        <Setting
          key={'units'}
          setting={'units'}
          config={settings.units}
          updateGist={updateGist}
          {...inputProps}
        />
      </div>
      {design.patternConfig.measurements.length > 0 && (
        <>
          <h3>{t('requiredMeasurements')}</h3>
          {design.patternConfig.measurements.map((m) => (
            <MeasurementInput key={m} m={m} focus={m == firstInvalid} {...inputProps} />
          ))}
        </>
      )}
      {design.patternConfig.optionalMeasurements.length > 0 && (
        <>
          <h3>{t('optionalMeasurements')}</h3>
          {design.patternConfig.optionalMeasurements.map((m) => (
            <MeasurementInput key={m} m={m} optional={true} {...inputProps} />
          ))}
        </>
      )}
    </div>
  )
}
