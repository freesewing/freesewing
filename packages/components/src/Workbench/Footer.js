import React from 'react'
import Logo from '../Logo'

const Footer = (props) => {

  return (
    <footer>
      <div className="cols">
        <div>
          <ul>
            <li className="heading">
              Wie ben jij?
            </li>
            <li>Ik ben <a href="https://github.com/joostdecock">Joost</a></li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="heading">
              Wat is dit?
            </li>
            <li>Lessen informatica, maar dan zonder dat geouwehoer dat je in een school te horen krijgt</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="heading">
              Voor wie is het?
            </li>
            <li>Origineel voor Katleen en Sorcha, maar voor iedereen mag meedoen</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="heading">
              Klopt er iets niet?
            </li>
            <li>
              Dan kan je dat gewoon <a href="https://github.com/joostdecock/cursus">
                zelf aanpassen op Github
              </a>
            </li>
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
