import React from 'react'
import Logo from '../Logo'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import IconButton from '@material-ui/core/IconButton'
import Icon from '../Icon'
import { version } from '../../package.json'

const Footer = props => {
  const icons = {
    gitter: 'https://gitter.im/freesewing/chat',
    twitter: 'https://twitter.com/freesewing_org',
    github: 'https://github.com/freesewing',
    instagram: 'https://instagram.com/freesewing_org'
  }
  const links =
    props.links === false
      ? {
          left: {
            blog: 'https://' + props.language + '.freesewing.org/blog',
            aboutFreesewing: 'https://' + props.language + '.freesewing.org/docs/about',
            faq: 'https://' + props.language + '.freesewing.org/faq'
          },
          right: {
            becomeAPatron: 'https://' + props.language + '.freesewing.org/patrons/join',
            makerDocs: 'https://' + props.language + '.freesewing.org/docs/',
            devDocs: 'https://' + props.language + '.freesewing.dev/'
          }
        }
      : props.links
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }
  return (
    <footer>
      <a href={props.home} data-test="logo">
        <Logo size={101} />
      </a>
      <p data-test="social">
        {Object.keys(icons).map(i => (
          <IconButton href={icons[i]} className={i} title={i} key={i}>
            <Icon icon={i} />
          </IconButton>
        ))}
      </p>
      <p data-test="text">
        <FormattedHTMLMessage id="app.txt-footer" />
      </p>
      {props.patrons}
      <div style={styles.container}>
        {Object.keys(links).map(l => {
          let items = []
          for (let i of Object.keys(links[l])) {
            items.push(
              <li key={i} style={{ textAlign: 'center' }}>
                <a href={links[l][i]} data-test={i}>
                  <FormattedMessage id={'app.' + i} />
                </a>
              </li>
            )
          }
          return (
            <div key={l}>
              <ul style={{ margin: '0 1rem' }}>{items}</ul>
            </div>
          )
        })}
      </div>
      <p className="version">{version}</p>
    </footer>
  )
}

Footer.defaultProps = {
  home: '/',
  links: false,
  patrons: null
}
export default Footer
