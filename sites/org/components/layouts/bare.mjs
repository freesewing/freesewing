import { AsideNavigation } from 'shared/components/navigation/aside.mjs'

export const ns = []

export const BareLayout = (props) => (
  <>
    <AsideNavigation mobileOnly />
    {props.children}
  </>
)
