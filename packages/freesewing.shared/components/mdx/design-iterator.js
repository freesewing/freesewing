import { list as designs } from '@freesewing/pattern-info'

const DesignIterator = props => {
  const Component = props.component
  return designs.map(design => <Component design={design} />)
}

export default DesignIterator
