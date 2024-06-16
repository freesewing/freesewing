import { useState, useMemo, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'

export const useDebouncedHandlers = ({ handleChange = () => {}, val }) => {
  // hold onto what we're showing as the value so that the input doesn't look unresponsive
  const [displayVal, setDisplayVal] = useState(val)

  // the debounce function needs to be it's own memoized value so we can flush it on unmount
  const debouncer = useMemo(
    () => debounce(handleChange, 300, { leading: true, trailing: true }),
    [handleChange]
  )

  // this is the change handler
  const debouncedHandleChange = useCallback(
    (newVal) => {
      // always set the display
      setDisplayVal(newVal)
      // debounce the actual update
      debouncer(newVal)
    },
    [setDisplayVal, debouncer]
  )

  // immediately call the debounced function on unmount so we don't miss an update
  useEffect(() => debouncer.flush, [debouncer])

  // set the display val to the current value when it gets changed
  useEffect(() => {
    setDisplayVal(val)
  }, [val])

  return { debouncedHandleChange, displayVal }
}
