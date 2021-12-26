import NextLink from 'next/link'
import Logo from 'shared/components/logos/freesewing.js'

const Link = ({ href, txt }) => (
  <NextLink href={href}>
    <a title={txt} className="hover:underline text-secondary font-bold hover:pointer">{txt}</a>
  </NextLink>
)
const link = "text-secondary font-bold hover:pointer hover:underline"

const social = {
  Discord: 'https://discord.freesewing.org/',
  Instagram: 'https://instagram.com/freesewing_org',
  Facebook: 'https://www.facebook.com/groups/627769821272714/',
  Github: 'https://github.com/freesewing',
  Reddit: 'https://www.reddit.com/r/freesewing/',
  Twitter: 'https://twitter.com/freesewing_org',
}


const Footer = ({ app }) => {
  return (
      <footer>
        <div className={`theme-gradient h-2 w-full relative ${app.loading ? 'loading' : ''}`}></div>
        <div className="p-4 py-16 flex flex-row bg-neutral -mt-2 z-0 gap-8 flex-wrap justify-around text-neutral-content">
          <div className="w-full sm:w-auto">
            <h5 className="text-neutral-content">What is this?</h5>
            <div className="theme-gradient h-1 mb-4"></div>
            <ul>
              <li>
                <Link href="https://freesewing.org/docs/guide/what" txt="About FreeSewing" />
              </li>
              <li>
                <Link href="https://freesewing.org/docs/faq" txt="Frequently Asked Questions" />
              </li>
              <li>
                <Link href="https://freesewing.org/patrons/join" txt="Become a Patron" />
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-auto sm:max-w-xs">
            <h5 className="text-neutral-content">Where can I turn for help?</h5>
            <div className="theme-gradient h-1 mb-2"></div>
            <p className="text-sm text-neutral-content">
              <a className={link} href={social.discord}>Our Discord server</a> is
              the best place to ask questions and get help. It's where our community hangs out
              so you'll get the fastest response and  might even make a few new friends along the way.
            </p>
            <p className="text-sm text-neutral-content">
              You can also <a href={social.twitter} className={link} >reach out on Twitter</a> or <a
                href="https://github.com/freesewing/freesewing/issues/new/choose"
                className={link}
              > create an issue on Github </a> if Discord is not your jam.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <h5 className="text-neutral-content">Social Media</h5>
            <div className="theme-gradient h-1 mb-4"></div>
            <ul>
              {Object.keys(social).map(item => <li key={item}><Link href={social[item]} txt={item}/></li>)}
            </ul>
          </div>

          <div className="text-center">
            <Logo fill='currentColor' stroke='none' size={164} className="m-auto"/>
            <h5 className="text-neutral-content">FreeSewing</h5>
            <p className="bold text-neutral-content text-sm">
              Come for the sewing patterns
              <br />
              Stay for the community
            </p>
          </div>

        </div>
      </footer>
  )
}

export default Footer

