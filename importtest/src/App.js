import React from 'react'
import freesewing from '@freesewing/core'
import Workbench from '@freesewing/components/Workbench'
import 'typeface-roboto-condensed'
import '@freesewing/css-theme'
import brian from '@freesewing/penelope'

function App() {
  //let instance = new Pattern()
  let instance = new brian({
    sa: 10
  })
  let config = instance.config

  return <Workbench freesewing={freesewing} Pattern={brian} config={config} userLanguage="en" />
}

export default App
