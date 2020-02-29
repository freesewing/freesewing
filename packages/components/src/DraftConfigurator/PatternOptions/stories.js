import React from 'react'
import { storiesOf } from '@storybook/react'
import PatternOptions from '.'

const props = {
  raiseEvent: (type, data) => console.log(`Action of type ${type} triggered, data passed is`, data),
  updateValue: (type, data) => console.log(`Update ${type} with new value`, data),
  data: {
    settings: {
      options: {}
    }
  }
}

storiesOf('Low level/PatternOptions', module)
  .add('Simon metric', () => (
    <PatternOptions pattern="simon" data={false} units="metric" {...props} />
  ))
  .add('Trayvon imperial', () => (
    <PatternOptions design="trayvon" data={false} units="imperial" {...props} />
  ))
