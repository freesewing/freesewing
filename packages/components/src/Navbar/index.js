import React from 'react'
import Logo from '../Logo'
import Emblem from '../Emblem'
import { FormattedMessage } from 'react-intl'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Navbar = ({
  home = 'https://freesewing.org/',
  navs = { left: [], right: [], mleft: {}, mright: {} },
  logo = <Logo embed color="#e9ecef" />,
  emblem = <Emblem />
}) => {
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
  if (typeof home === 'function') homeProps.onClick = home
  else homeProps.href = home

  let logoDiv = (
    <div className="logo">
      <a id="home" {...homeProps} data-test="navbar-home">
        {logo}
      </a>
    </div>
  )
  let emblemDiv = (
    <div className="emblem">
      <a {...homeProps}>{emblem}</a>
    </div>
  )
  return (
    <header className="navbar">
      <div>
        <div style={{ display: 'flex' }}>
          {logoDiv}
          {emblemDiv}
          {Object.keys(navs.left).map((key) => renderNav(key, navs.left[key]))}
        </div>
        <div className="spread" />
        <div style={{ display: 'flex' }}>
          {Object.keys(navs.right).map((key) => renderNav(key, navs.right[key]))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
