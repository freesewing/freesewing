/*
 * Checks whether a passed-in value is greater or equal to the ux state (aka control)
 */
export const uxAbove = (Swizzled, check = 0) => Swizzled.state.ui.ux > check
export const uxBelow = (Swizzled, check = 0) => Swizzled.state.ui.ux < check
export const uxIs = (Swizzled, check = 0) => Swizzled.state.ui.ux === check
export const uxMeets = (Swizzled, check = 0) => {
  console.log(Swizzled)
  return Swizzled.state.ui.ux >= check
}
