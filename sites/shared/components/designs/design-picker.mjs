import { useState } from 'react'
import { designs } from 'shared/config/designs.mjs'
import { Design, ns as designNs } from 'shared/components/designs/design.mjs'

export const ns = designNs

export const DesignPicker = () => {
  const [list, setList] = useState(Object.keys(designs))

  return list.map((name) => <Design name={name} />)
}
