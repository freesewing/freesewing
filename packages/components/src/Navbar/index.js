import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../Logo'
import Emblem from '../Emblem'
import { FormattedMessage } from 'react-intl'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Navbar = props => {
  const mobile = useMediaQuery('(max-width:599px)')

  if (mobile) return null

  const renderNav = (key, nav) => {
    let title = nav.title || nav.text
    let text =
      typeof nav.text === 'string' ? (
        <FormattedMessage id={nav.text} data-test={'navbar-' + key} />
      ) : (
        nav.text
      )
    if (nav.type === 'component') return nav.component
    else if (nav.type === 'button')
      return (
        <button
          title={title}
          onClick={nav.onClick}
          key={key}
          className={nav.active ? 'active' : ''}
          data-test={'navbar-' + key}
        >
          {text}
        </button>
      )
    return (
      <a
        href={nav.href}
        className={nav.active ? 'nav active' : 'nav'}
        title={title}
        key={key}
        data-test={'navbar-' + key}
      >
        {text}
      </a>
    )
  }

  let homeProps = {
    href: '#home'
  }
  if (typeof props.home === 'function') homeProps.onClick = props.home
  else homeProps.href = props.home

  let logo = (
    <div className="logo">
      <a id="home" {...homeProps} data-test="navbar-home">
        {props.logo}
      </a>
    </div>
  )
  let emblem = (
    <div className="emblem">
      <a {...homeProps}>{props.emblem}</a>
    </div>
  )
  return (
    <header className="navbar">
      <div>
        <div style={{ display: 'flex' }}>
          {logo}
          {emblem}
          {Object.keys(props.navs.left).map(key => renderNav(key, props.navs.left[key]))}
        </div>
        <div className="spread" />
        <div style={{ display: 'flex' }}>
          {Object.keys(props.navs.right).map(key => renderNav(key, props.navs.right[key]))}
        </div>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  navs: PropTypes.object,
  logo: PropTypes.node,
  emblem: PropTypes.node,
  home: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

Navbar.defaultProps = {
  home: 'https://freesewing.org/',
  navs: { left: [], right: [], mleft: {}, mright: {} },
  logo: <Logo embed color="#e9ecef" />,
  emblem: <Emblem />
}
export default Navbar
