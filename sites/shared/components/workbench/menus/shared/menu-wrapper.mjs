import { useMemo } from 'react'
import { WrenchIcon } from 'shared/components/icons.mjs'
import { useMobileMenu } from 'shared/context/mobile-menubar-context.mjs'

const defaultClasses = `w-1/3 shrink grow-0 lg:p-4 max-w-2xl h-full overflow-scroll`
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
      MenuContent: children,
      keepOpenOnClick,
      type,
      order,
    }),
    [Icon, children, keepOpenOnClick, type]
  )

  useMobileMenu(type, menuProps)

  return (
    <>
      <div className={`hidden lg:block ${wrapperClass}`}>{children}</div>
    </>
  )
}
