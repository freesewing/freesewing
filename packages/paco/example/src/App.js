import React from 'react'
import freesewing from '@freesewing/core'
import Workbench from '@freesewing/components/Workbench'
import 'typeface-roboto-condensed'
import 'typeface-raleway'
import '@freesewing/css-theme'

import Pattern from 'pattern'

const App = (props) => {
  // You can use this to add transations
  /*
  let translations = {
    JSON: 'JSON',
    someOtherString: 'Some other string that needs translation'
  }
  */

  // Adds support for loading an external pattern configuration
  let recreate
  if (window) recreate = window.location.pathname.substr(1).split('/')
  if (recreate.length === 3 && recreate[0] === 'from')
    recreate = { from: recreate[1], id: recreate[2] }
  else recreate = false

  return (
    <Workbench
      freesewing={freesewing}
      Pattern={Pattern}
      userLanguage="en"
      recreate={recreate}
      //translations={translations}
    />
  )
}

export default App
