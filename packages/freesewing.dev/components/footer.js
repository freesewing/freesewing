import Icon from 'shared/components/icon'

const classes = {
  row: "flex flex-row flex-wrap max-w-screen-xl m-auto",
  h4: "font-bold py-2",
  link: "hover:text-secondary capitalize",
  col: "flex flex-col items-center px-4 w-full mt-4 lg:w-40 lg:mt-2"
}

const Footer = props => (
  <footer className="border-t-2 p-12 border-base-300 bg-primary text-primary-content mt-8 pb-24 lg:pb-4">
    <div className={`${classes.row} justify-between flex-auto`}>
      <div className="w-full lg:w-1/3 my-2 text-center lg:text-left">
        <h4 className={classes.h4}>What is this?</h4>
        <ul>
          <li><a className={classes.link} href="https://freesewing.org/">About FreeSewing</a></li>
          <li><a className={classes.link} href="https://freesewing.org/">Frequently asked questions</a></li>
          <li><a className={classes.link} href="https://freesewing.org/">Become a Patron</a></li>
          <li><a className={classes.link} href="https://freesewing.org/">Code of conduct</a></li>
          <li><a className={classes.link} href="https://freesewing.org/">Where to get help</a></li>
        </ul>
      </div>
      <div className="w-full lg:w-1/3 my-2 text-center">
        <div className="w-28 lg:w-40 m-auto">
        <Icon icon='freesewing' embed className="m-auto"/>
        </div>
        <h4 className={`${classes.h4} mt-4 text-xl`}>FreeSewing</h4>
        <p>
          Come for the sewing patterns
          <br />
          Stay for the community
        </p>
      </div>
      <div className="w-full lg:w-1/3 my-2 text-center lg:text-right">
        <h4 className={classes.h4}>Social media</h4>
        <ul>
          <li><a className={classes.link} href="https://discord.freesewing.org/">discord</a></li>
          <li><a className={classes.link} href="https://instagram.com/freesewing_org">instagram</a></li>
          <li><a className={classes.link} href="https://www.facebook.com/groups/627769821272714/">facebook</a></li>
          <li><a className={classes.link} href="https://github.com/freesewing">github</a></li>
          <li><a className={classes.link} href="https://www.reddit.com/r/freesewing/">reddit</a></li>
          <li><a className={classes.link} href="https://twitter.com/freesewing_org">twitter</a></li>
        </ul>
      </div>
    </div>
    <div className="text-center text-xs mt-12 mb-1">
      These awesome companies harbour us
    </div>
    <div className={`${classes.row} justify-center`}>
      <div className={classes.col}>
        <h4 className={classes.h4}>Search</h4>
        <a href="https://www.algolia.com/">
          <img src="/brands/algolia.svg" />
        </a>
      </div>
      <div className={classes.col}>
        <h4 className={classes.h4}>Translation</h4>
        <a href="https://crowdin.com/">
          <img src="/brands/crowdin.svg" />
        </a>
      </div>
      <div className={classes.col}>
        <h4 className={classes.h4}>Hosting</h4>
        <a href="https://www.netlify.com/">
          <img src="/brands/netlify.svg" />
        </a>
      </div>
      <div className={classes.col}>
        <h4 className={classes.h4}>Error handling</h4>
        <a href="https://www.bugsnag.com/">
          <img src="/brands/bugsnag.svg" />
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
