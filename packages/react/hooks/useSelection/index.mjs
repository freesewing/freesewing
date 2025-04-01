import React, { useState } from 'react'

export const useSelection = (items) => {
  const [selection, setSelection] = useState({})

  /*
   * This variable keeps track of how many are selected
   */
  const count = Object.keys(selection).length

  /*
   * This method toggles a single item in the selection
   */
  const toggle = (id) => {
    const newSelection = { ...selection }
    if (newSelection[id]) delete newSelection[id]
    else newSelection[id] = 1
    setSelection(newSelection)
  }

  /*
   * This method toggles all on or off
   */
  const toggleAll = () => {
    if (count === items.length) setSelection({})
    else {
      const newSelection = {}
      for (const item of items) newSelection[item.id] = 1
      setSelection(newSelection)
    }
  }

  return {
    count,
    selection,
    setSelection,
    toggle,
    toggleAll,
  }
}
