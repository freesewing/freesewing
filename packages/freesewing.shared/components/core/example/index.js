import examples from '@freesewing/examples'
import rendertest from '@freesewing/rendertest'
import tutorial from '@freesewing/tutorial'
import Draft from '@freesewing/components/Draft'

const Example = ({
  pattern = 'examples',
  caption = '',
  children=null,
  options = {},
  settings,
  part = '',
  sample
}) => {

  if (caption) console.log('Passing the caption prop to @freesewing/components/Example is deprecated. See: https://github.com/freesewing/freesewing/issues/1043')

  const patterns = {
    examples,
    rendertest,
    tutorial
  }
  settings = {
    options: { ...options },
    measurements: { head: 390 },
    ...settings
  }
  if (part !== '') settings.only = [part]
  const patternInstance = new patterns[pattern](settings)
  if (sample) patternInstance.sample()
  else patternInstance.draft()
  const patternProps = patternInstance.getRenderProps()
  return <Draft {...patternProps} />
}

export default Example
