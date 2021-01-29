import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FormattedMessage } from 'react-intl'
import Icon from '../Icon'
import LanguageIcon from '@material-ui/icons/Translate'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'

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
    logo: {
      textDecoration: 'none',
      height: '42px',
      width: '42px',
      padding: '11px',
      display: 'inline-block'
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
    }
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

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="transparent" elevation={2}>
        <Toolbar disableGutters={true}>
          <Button {...buttonProps} href="#" onClick={() => props.setDisplay('null')}>
            <span>{props.config.name}</span>
            <span style={{ color: '#ced4da', fontSize: '80%' }}>.FreeSewing.dev</span>
          </Button>

          <Button {...buttonProps} href="https://chat.freesewing.org/">
            <Icon style={{ ...iconStyle }} icon="discord" />
            <FormattedMessage id="app.chatOnDiscord" />
          </Button>

          <span style={style.spacer} />

          <Button {...buttonProps} href="https://github.com/freesewing/freesewing/tags">
            <Icon style={{ ...iconStyle }} icon="github" />
            {props.config.version}
          </Button>

          <Button
            href="#"
            onClick={() => props.setDisplay('languages')}
            active={props.display === 'languages' ? true : false}
          >
            <LanguageIcon className="nav-icon" />
          </Button>

          <IconButton
            style={style.darkModeButton}
            aria-label="menu"
            onClick={props.toggleDarkMode}
            title={props.theme}
          >
            {props.theme === 'dark' ? (
              <LightModeIcon style={style.icon} />
            ) : (
              <DarkModeIcon style={style.darkModeIcon} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
