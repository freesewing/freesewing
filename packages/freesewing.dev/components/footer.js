import NextLink from 'next/link'
import Logo from 'shared/components/logos/freesewing.js'
import contributors from 'site/prebuild/allcontributors.js'
import patrons from 'site/prebuild/patrons.js'
import OsiLogo from 'shared/components/logos/osi.js'
import CreativeCommonsLogo from 'shared/components/logos/cc.js'
import CcByLogo from 'shared/components/logos/cc-by.js'

const Link = ({ href, txt }) => (
  <NextLink href={href}>
    <a title={txt} className="hover:underline text-secondary font-bold hover:pointer">{txt}</a>
  </NextLink>
)
const link = "text-secondary font-bold hover:pointer hover:underline px-1"

const social = {
  Discord: 'https://discord.freesewing.org/',
  Instagram: 'https://instagram.com/freesewing_org',
  Facebook: 'https://www.facebook.com/groups/627769821272714/',
  Github: 'https://github.com/freesewing',
  Reddit: 'https://www.reddit.com/r/freesewing/',
  Twitter: 'https://twitter.com/freesewing_org',
}

const Footer = ({ app }) => (
  <footer className="bg-neutral">
    <div className={`theme-gradient h-1 w-full relative ${app.loading ? 'loading' : ''}`}></div>
    <div className="p-4 py-16 flex flex-row bg-neutral -mt-1 z-0 gap-8 flex-wrap justify-around text-neutral-content">
      <div className="w-64 mt-2">
        <div className="px-4 mb-4"><CreativeCommonsLogo /></div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="basis-1/4">
            <CcByLogo />
          </div>
          <p className="text-sm text-neutral-content text-right basis-3/4">
            Content on freesewing.org is licensed under
            a <a className={link} href="https://creativecommons.org/licenses/by/4.0/">Creative
            Commons Attribution 4.0 International license</a>
          </p>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="basis-1/4">
            <OsiLogo />
          </div>
          <p className="text-sm text-neutral-content text-right basis-3/4">
            Our source code and markdown is <a href="https://github.com/freesewing/freesewing"
            className={link}>available
            on GitHub</a> under <a href="https://opensource.org/licenses/MIT"
            className={link}>the MIT license</a>
          </p>
        </div>
      </div>

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
          the best place to ask questions and get help. It&apos;s where our community hangs out
          so you&apos;ll get the fastest response and  might even make a few new friends along the way.
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
    <p className="text-center text-neutral-content text-sm px-2">
      <span
        className="px-1 text-lg font-bold block sm:inline">FreeSewing</span> is made by these <span
      className="text-accent font-bold text-lg px-1 block sm:inline">wonderful contributors</span>
    </p>
    <div className="p-4 pb-16 flex flex-row bg-neutral -mt-2 z-0 gap-1 lg:gap-2 flex-wrap justify-around text-neutral-content lg:px-24">
      {contributors.map(person => (
        <a title={person.name} href={person.profile} className="m-auto" key={person.profile+person.name}>
          <img
            src={person.avatar_url} alt={`Avatar of ${person.name}`}
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-secondary hover:border-accent"
          />
        </a>
      ))}
    </div>

    <p className="text-center text-neutral-content text-sm px-2">
      <span
        className="px-1 text-lg font-bold block sm:inline">FreeSewing</span> is supported by these <span
      className="text-accent font-bold text-lg px-1 block sm:inline">generous patrons</span>
    </p>
    <div className="p-4 pb-16 flex flex-row bg-neutral -mt-2 z-0 gap-1 lg:gap-2 flex-wrap justify-around text-neutral-content lg:px-24">
      {patrons.map(person => (
        <a
          title={person.name}
          href={`https://freesewing.org/users/${person.username}`}
          className="m-auto"
          key={person.username}
        >
          <img
            src={person.img}
            alt={`Avatar of ${person.name}`}
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-secondary hover:border-accent"
          />
        </a>
      ))}
    </div>

    <p className="text-center text-neutral-content text-sm px-2">
      <span
        className="px-1 text-lg font-bold block sm:inline">FreeSewing</span> is hosted by these <span
      className="text-accent font-bold text-lg px-1 block sm:inline">awesome companies</span>
    </p>
    <div className="p-4 py-16 flex flex-row bg-neutral -mt-2 z-0 gap-8 flex-wrap justify-center items-center text-neutral-content">
      <a title="Search powered by Algolia" href="https://www.algolia.com/">
        <img src="/brands/algolia.svg" className="w-64 mx-12 sm:mx-4" alt="Search powered by Algolia"/>
      </a>
      <a title="Translation powered by Crowdin" href="https://www.crowdin.com/">
        <img src="/brands/crowdin.svg" className="w-64 mx-12 sm:mx-4" alt="Translation powered by Crowdin" />
      </a>
      <a title="Deploys & hosting by Netlify" href="https://www.netlify.com/">
        <img src="/brands/netlify.svg" className="w-44 mx-12 sm:mx-4" alt="Deploys & hosting by Netlify" />
      </a>
      <a title="Error handling by Bugsnag" href="https://www.bugsnag.com/">
        <img src="/brands/bugsnag.svg" className="h-36 mx-12 sm:mx-4" alt="Error handling by bugsnag" />
      </a>
    </div>

  </footer>
)

export default Footer

