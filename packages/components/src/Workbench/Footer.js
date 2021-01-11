import React from 'react'
import Logo from '../Logo'
import { FormattedMessage } from 'react-intl'

const Footer = (props) => {

  return (
    <footer>
      <div className="cols">
        <div>
          <ul>
            <li className="heading">
              <FormattedMessage id='app.docs'/>
            </li>
            <li><a href="https://freesewing.dev/reference/api/">Core API</a></li>
            <li><a href="https://freesewing.dev/reference/macros/">Macros</a></li>
            <li><a href="https://freesewing.dev/reference/plugins/">Plugins</a></li>
            <li><a href="https://freesewing.dev/reference/snippets/">Snippets</a></li>
            <li><a href="https://freesewing.dev/reference/config/">Pattern configuration</a></li>
            <li><a href="https://freesewing.dev/reference/settings/">Pattern settings</a></li>
            <li><a href="https://freesewing.dev/howtos/code/">Common code challenges</a></li>
            <li><a href="https://freesewing.dev/howtos/code/">Common code challenges</a></li>
            <li><a href="https://freesewing.dev/howtos/design/">Common design challenges</a></li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="heading">
              Links
            </li>
            <li><a href="https://freesewing.org/">FreeSewing.org</a></li>
            <li><a href="https://freesewing.dev/">FreeSewing.dev</a></li>
            <li><a href="https://discord.freesewing.org/">discord.freesewing.org</a></li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="heading">
              Social Media
            </li>
            <li><a href="https://discord.gg/YDV4GvU" title="discord">Discord</a></li>
            <li><a href="https://instagram.com/freesewing_org" title="instagram">Instagram</a></li>
            <li><a href="https://www.facebook.com/groups/627769821272714/" title="facebook">Facebook</a></li>
            <li><a href="https://github.com/freesewing" title="github">Github</a></li>
            <li><a href="https://www.reddit.com/r/freesewing/" title="reddit">Reddit</a></li>
            <li><a href="https://twitter.com/freesewing_org" title="twitter">Twitter</a></li>
          </ul>
        </div>
        <div>
          <div className="logo">
            <a href="https://freesewing.org/" title='freesewing.org'>
              <Logo size={100} />
            </a>
            <div className="name">
              <span className="free">Free</span>Sewing
            </div>
          </div>
          <div className="slogan">
            Come for the sewing patterns
            <br />
            Stay for the community
          </div>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
