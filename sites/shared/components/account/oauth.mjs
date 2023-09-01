import React from 'react'
import Provider from './provider'
import oauthConfig from '../../../config/oauth'

const Oauth = (props) => {
  const handleSignup = (provider) => {
    props.app.setLoading(true)
    props.app.backend
      .initOauth({
        provider: provider,
        language: process.env.GATSBY_LANGUAGE,
      })
      .then((result) => {
        if (result.status === 200) window.location = oauthConfig[provider] + result.data.state
        else {
          props.app.setLoading(false)
          props.app.setNotification({
            type: 'error',
            msg: props.app.translate('errors.something'),
          })
        }
      })
  }

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
  }

  if (props.list)
    return [
      <Provider
        provider="google"
        login={props.login}
        app={props.app}
        signup={() => handleSignup('google')}
        list
      />,
      <Provider
        provider="github"
        login={props.login}
        app={props.app}
        signup={() => handleSignup('github')}
        list
      />,
    ]

  return (
    <div style={styles.wrapper}>
      <Provider
        provider="google"
        login={props.login}
        app={props.app}
        signup={() => handleSignup('google')}
      />
      <Provider
        provider="github"
        login={props.login}
        app={props.app}
        signup={() => handleSignup('github')}
      />
    </div>
  )
}

export default Oauth
