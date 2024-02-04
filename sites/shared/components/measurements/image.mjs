//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Hooks
import { useTranslation } from 'next-i18next'
//Components
import { Tabs, Tab } from '../tabs.mjs'
import { images as sarahImages } from './sarah/index.mjs'
import { images as timImages } from './tim/index.mjs'

// Measurements shown seated
const seated = ['crotchdepth']

export const ns = ['measurements']

// Re-use this style object
const style = { backgroundSize: 'cover' }

/*
 * This component shows an image that helps to know how to make measurements
 * It shows a JPG background, and SVG overlay
 *
 * Sarah and Tim are the models. They are just names to tell them apart.
 */
export const MeasieImage = (props) => {
  const { t } = useTranslation(ns)

  const m = props.m ? props.m.toLowerCase() : false
  if (!m) return null

  const pose = seated.includes(m) ? 'seated' : 'standing'

  return (
    <Tabs tabs="Sarah, Tim">
      <Tab tabId="Sarah">
        <img
          className="shadow aspect-[4/3]"
          height={sarahImages[m].height}
          width={sarahImages[m].height}
          src={sarahImages[m].height}
          alt={t('measurements:' + m)}
          style={{ ...style, backgroundImage: `url(/img/sarah-${pose}.jpg)` }}
        />
      </Tab>
      <Tab tabId="Tim">
        <img
          className="shadow"
          height={timImages[m].height}
          width={timImages[m].height}
          src={timImages[m].height}
          alt={t('measurements:' + m)}
          style={{ ...style, backgroundImage: `url(/img/tim-${pose}.jpg)` }}
        />
      </Tab>
    </Tabs>
  )
}
