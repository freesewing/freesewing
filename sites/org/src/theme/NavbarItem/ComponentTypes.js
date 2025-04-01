import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes'
import { NavbarItem as FreeSewingNavbarItem } from '@freesewing/react/components/Docusaurus'
import Link from '@docusaurus/Link'

export default {
  ...ComponentTypes,
  'custom-FreeSewingNavbarItem': (props) =>
    FreeSewingNavbarItem({ ...props, Link, Default: ComponentTypes.default }),
}
