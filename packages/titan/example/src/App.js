import React from 'react'
import freesewing from '@freesewing/core'
import Workbench from '@freesewing/components/Workbench'
import 'typeface-roboto-condensed'
import '@freesewing/css-theme'

import Pattern from 'pattern'

const App = (props) => {
  let instance = new Pattern()
  let config = instance.config

  // Adding untranslated strings
  let translations = {
    'measurements.ankleEntry': 'Ankle entry',
    'measurements.backWaist': 'Back waist',
    'measurements.crotchDepth': 'Crotch depth',
    'measurements.crotchLength': 'Crotch length',
    'measurements.frontCrotchLength': 'Front crotch length',
    'measurements.frontHip': 'Front hip'
  }

  return (
    <Workbench
      freesewing={freesewing}
      Pattern={Pattern}
      config={config}
      userLanguage="en"
      translations={translations}
    />
  )
}

export default App
