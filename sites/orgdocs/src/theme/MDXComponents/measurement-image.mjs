import React from 'react'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import { images as sarahImages } from './sarah/index.mjs'
import { images as timImages } from './tim/index.mjs'
import { useLocation } from '@docusaurus/router'
import measurements from '../../../../../i18n/measurements.yaml'

// Measurements shown seated
const seated = ['crotchdepth']

// Re-use this style object
const style = {
  backgroundSize: 'cover',
  width: '100%',
  display: 'block',
  aspectRatio: '4/3',
}

// Map lowercase measurement name to translation key
const caseMap = {}
for (const m of Object.keys(measurements)) caseMap[m.toLowerCase()] = m

/*
 * This component shows an image that helps to know how to make measurements
 * It shows a JPG background, with an SVG overlay
 *
 * Sarah and Tim are the models.
 * They are just names to tell them apart.
 */
export const MeasurementImage = (props) => {
  const location = useLocation()

  // Figure out what measurement to use
  const m = props.m
    ? props.m.toLowerCase()
    : location.pathname
        .split('/')
        .filter((dir) => dir)
        .pop()
  if (!m || !measurements[caseMap[m]])
    return <p>Unable to match the input {m} to MeasurementImage to a measurement name</p>

  const pose = seated.includes(m) ? 'seated' : 'standing'

  return (
    <Tabs>
      <TabItem value="sarah" label="Sarah">
        <img
          height={sarahImages[m].height}
          width={sarahImages[m].width}
          src={sarahImages[m]}
          alt={measurements[caseMap[m]]}
          style={{ ...style, backgroundImage: `url(/img/sarah-${pose}.jpg)` }}
        />
      </TabItem>
      <TabItem value="tim" label="Tim">
        <img
          height={timImages[m].height}
          width={timImages[m].width}
          src={timImages[m]}
          alt={measurements[caseMap[m]]}
          style={{ ...style, backgroundImage: `url(/img/tim-${pose}.jpg)` }}
        />
      </TabItem>
    </Tabs>
  )
}
