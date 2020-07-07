import React from 'react'
import { storiesOf } from '@storybook/react'
import Workbench from '.'
import freesewing from '@freesewing/core'

const config = {
  name: 'aaron',
  version: '0.1',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'menswear',
  type: 'pattern',
  difficulty: 1,
  tags: ['story', 'test'],
  optionGroups: {
    fit: ['armholeDrop', 'backlineBend']
  },
  measurements: ['bicepsCircumference', 'hpsToHipsBack'],
  parts: ['base'],
  options: {
    armholeDrop: { pct: 10, min: 1, max: 75 },
    backlineBend: { mm: 50, min: 50, max: 100 }
  }
}

const gist = {
  settings: {
    embed: true,
    sa: 10,
    complete: true,
    paperless: false,
    locale: 'en',
    units: 'metric',
    margin: 2,
    options: {
      armholeDrop: 50
    }
  }
}

const props = {
  freesewing,
  Pattern: () => 'aaron',
  config,
  from: gist
}

storiesOf('Workbench', module)
  .add('Metric', () => <Workbench {...props} units="metric" />)
  .add('Imperial', () => <Workbench {...props} units="imperial" />)
