import Link from 'next/link'
import Icon from '@/shared/components/icon'
import ThemeChooser from '@/shared/components/theme-chooser'

const btnClasses= 'btn btn-ghost btn-block h-8 min-h-8 lg:h-12 lg:min-h-12'

const ExtraNavs = props => {
  const navs = {
    theme: <ThemeChooser block={props.menu} />,
    search: (
      <button
        className={`${btnClasses} lg:w-auto`}
        onClick={props.toggleSearch}
      >
        <Icon icon='search' size={props.iconSize} className="hidden lg:inline"/>
        <span className='px-2'>
          Search
          <span className="hidden lg:inline"> for answers [Ctrl-k]</span>
        </span>
      </button>
    ),
    discord: (
      <a
        className={`btn btn-ghost ${props.menu ? 'btn-block my-2' : 'px-8'}`}
        title="Or ask on Discord" href="https://discord.freesewing.org/"
      >
        <Icon icon='discord' size={props.iconSize}/>
        <span className='px-2'>
          <span className="hidden lg:inline">Or ask </span>
          <span className="inline lg:hidden">Chat </span>
          on Discord
        </span>
      </a>
    ),
    blog: (
      <Link href="/blog">
        <button
          className={`btn btn-ghost ${props.menu ? 'btn-block my-2' : ''}`}
          title="Dev blog"
        >
          <Icon icon='blog' size={props.iconSize}/>
          {!props.menu && <span className='px-2'>Blog</span>}
          {props.menu && <span className='px-2'>Developer Blog</span>}
        </button>
      </Link>
    ),
    github: (
      <Link href="https://github.com/freesewing/freesewing/">
        <button
          className={`btn btn-ghost ${props.menu ? 'btn-block my-2' : ''}`}
          title="Code on GitHub"
        >
          <Icon icon='github' size={props.iconSize}/>
          {props.menu && <span className='px-2'>Code on Github</span>}
        </button>
      </Link>
    ),
    menu: (
      <button
        className={`${btnClasses} lg:w-auto`}
        title="Open menu"
        onClick={props.toggleMenu}
      >
        {!props.menu && <Icon icon='menu' size={props.iconSize} className="hidden lg:inline"/>}
        <span className='px-2'>{props.menu && 'Close '} Menu</span>
      </button>
    ),
  }


  return props.menu
    ? props.navbar
      ? navs.menu
      : [navs.theme, navs.discord, navs.github]
    : (
      <>
        <div className="lg:block hidden">
          {navs.search}
          {navs.discord}
        </div>
        <div className="lg:hidden flex flex-row flex-1 divide-x divide-base-300 py-1">
          <div className="w-1/2 px-1">{navs.search}</div>
          <div className="w-1/2 px-1">{navs.menu}</div>
        </div>
        <div className='hidden lg:flex lg:flex-row'>
          {navs.blog}
          {navs.theme}
          {navs.github}
        </div>
      </>
    )
}

export default ExtraNavs
