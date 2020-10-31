import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Logo from '../Logo'
import { FormattedMessage } from 'react-intl'
import Icon from '../Icon'
import LanguageIcon from '@material-ui/icons/Translate'
import DarkModeIcon from '@material-ui/icons/Brightness3'

export default function ButtonAppBar(props) {
  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }

  const style = {
    wrapper: {
      flexGrow: 1,
      width: '100%',
      margin: 0,
      padding: 0,
      background: props.theme === 'dark' ? colors.light : colors.dark,
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
      color: colors[props.theme]
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
      maxHeight: '24px'
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
    color: props.theme === 'dark' ? '#b197fc' : '#845ef7'
  }

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar disableGutters={true}>
          <Button {...buttonProps} href="#" onClick={() => props.setDisplay('null')}>
            <span>{props.config.name}</span>
            <span style={{ color: '#845ef7', fontSize: '80%' }}>.FreeSewing.dev</span>
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

          <Button onClick={props.toggleDarkMode} href="#">
            <DarkModeIcon className="nav-icon moon" />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
