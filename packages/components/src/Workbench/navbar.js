import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { FormattedMessage } from 'react-intl'
import Icon from '../Icon'
import LanguageIcon from '@material-ui/icons/Translate'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import DraftIcon from '@material-ui/icons/Gesture'
import TestIcon from '@material-ui/icons/DoneAll'
import MeasurementsIcon from '@material-ui/icons/Height'
import ExportIcon from '@material-ui/icons/ScreenShare'
import Logo from '../Logo'

export default function ButtonAppBar(props) {

  const style = {
    wrapper: {
      flexGrow: 1,
      width: '100%',
      margin: 0,
      padding: 0,
      background: '#1a1d21',
      zIndex: 15
    },
    button: {
      height: '64px',
      padding: '0 18px'
    },
    iconButton: {
    },
    icon: {
      maxWidth: '24px',
      maxHeight: '24px',
      marginRight: '0.5rem'
    },
    spacer: {
      flexGrow: 1
    },
    darkModeIcon: {
      transform: 'rotate(26deg)',
      maxWidth: '24px',
      maxHeight: '24px',
      color: '#ffe066'
    },
  }

  const buttonProps = {
    color: 'primary',
    size: 'large',
    style: style.button
  }
  buttonProps['aria-haspopup'] = 'true'

  const iconStyle = {
    marginRight: '0.5rem',
  }

  const icons = {
    draft: <DraftIcon />,
    sample: <TestIcon />,
    measurements: <MeasurementsIcon />,
    xport: <ExportIcon />
  }
  const links = {
    draft: <FormattedMessage id="cfp.draftThing" values={{ thing: props.config.name }} />,
    sample: <FormattedMessage id="cfp.testThing" values={{ thing: props.config.name }} />,
    measurements: <FormattedMessage id="app.measurements" />,
    xport: <FormattedMessage id="app.export" />
  }

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="transparent" elevation={2}>
        <Toolbar disableGutters={true}>
          <a role="button" href='#' className='navlink' onClick={() => props.setDisplay(null)}>
            <Logo />
            <br />
            <span className="text">{props.config.name}</span>
          </a>
          <span style={style.spacer} />
          {Object.keys(icons).map((link) => {
            return (
              <a key={link} role="button" href={`#${link}`} className={`navlink ${props.display===link ? 'active' : ''}`} onClick={() => props.setDisplay(link)}>
                {icons[link]}
                <br />
                <span className="text">{links[link]}</span>
              </a>
            )
          })}

          <span style={style.spacer} />

          <a href='https://discord.freesewing.org/' className='navlink'>
            <Icon style={{ ...iconStyle }} icon="discord" />
            <br />
            <span className="text"><FormattedMessage id="app.askForHelp" /></span>
          </a>

          <a href="https://github.com/freesewing/freesewing/tags" className='navlink'>
            <Icon style={{ ...iconStyle }} icon="github" />
            <br />
            <span className="text">{props.config.version}</span>
          </a>

          <a role="button" href='#i18n' className='navlink' onClick={() => props.setDisplay('languages')}>
            <LanguageIcon />
            <br />
            <span className="text"><FormattedMessage id={`i18n.${props.language}`}/></span>
          </a>
          <a role="button" href='#theme' className='navlink theme' onClick={props.toggleDarkMode}>
            {props.theme === 'dark' ? (
              <LightModeIcon tyle={style.icon} />
            ) : (
              <DarkModeIcon tyle={style.darkModeIcon} />
            )}
            <br />
            <span className="text"><FormattedMessage id={`app.${props.theme === 'dark' ? 'dark' : 'light'}Mode`}/></span>
          </a>
        </Toolbar>
      </AppBar>
    </div>
  )
}
