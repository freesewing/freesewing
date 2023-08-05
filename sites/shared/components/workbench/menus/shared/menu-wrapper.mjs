import { useMemo } from 'react'
import { WrenchIcon } from 'shared/components/icons.mjs'
import { useMobileMenu } from 'shared/context/mobile-menubar-context.mjs'

const defaultClasses = `w-1/3 shrink grow-0 lg:p-4 max-w-md h-full overflow-scroll`

/**
 * a wrapper that displays its contents normally on larger screens
 * and adds its contents as a menu on the {@link MobileMenubar} for smaller screens
 * @param {ReactChildren} children
 * @param {String} wrapperClass - classes to add to the wrapper for larger screens
 * @param {ReactComponent} Icon - Icon for the menu button on smaller screens
 * @param {Boolean} [keepOpenOnClick=true] - should the modal for this menu stay open when clicked?
 * @param {String} [type='settings'] - the type of menu this is. will be used to key the menu in the MobileMenubar
 * @param {Number} [order=-1] - the order of this menu in the MobileMenubar
 */
export const MenuWrapper = ({
  children,
  wrapperClass = defaultClasses,
  Icon = WrenchIcon,
  keepOpenOnClick = true,
  type = 'settings',
  order = -1,
}) => {
  const menuProps = useMemo(
    () => ({
      Icon,
      menuContent: children,
      keepOpenOnClick,
      order,
    }),
    [Icon, children, keepOpenOnClick, order]
  )

  useMobileMenu(type, menuProps)

  return (
    <>
      <div className={`hidden lg:block ${wrapperClass}`}>{children}</div>
    </>
  )
}
