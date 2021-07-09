import Link from 'next/link'
import Icon from 'shared/components/icon'
import ThemeChooser from 'shared/components/theme-chooser'

const ExtraNavs = props => {
  const navs = {
    theme: <ThemeChooser block={props.menu} />,
    search: (
      <button
        className={`btn btn-ghost ${props.menu ? 'btn-block my-2' : 'px-8'}`}
        onClick={props.toggleSearch}
      >
        <Icon icon='search' size={props.iconSize}/>
        <span className='px-2'>Search for answers</span> [Ctrl-k]
      </button>
    ),
    discord: (
      <a
        className={`btn btn-ghost ${props.menu ? 'btn-block my-2' : 'px-8'}`}
        title="Or ask on Discord" href="https://discord.freesewing.org/"
      >
        <Icon icon='discord' size={props.iconSize}/>
        <span className='px-2'>Or ask on Discord</span>
      </a>
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
        className="btn btn-ghost btn-block"
        title="Open menu"
        onClick={props.toggleMenu}
      >
        <span className='px-2'>{props.menu && 'Close '} Menu</span>
      </button>
    ),
  }


  return props.menu
    ? props.navbar
      ? navs.menu
      : [navs.theme, navs.search, navs.discord, navs.github]
    : (
      <>
        <div className="lg:block hidden">
          {navs.search}
          {navs.discord}
        </div>
        <div className="lg:hidden flex flex-row flex-grow justify-around">
          {navs.menu}
        </div>
        <div className='hidden lg:flex lg:flex-row'>
          {navs.theme}
          {navs.github}
        </div>
      </>
    )
}

export default ExtraNavs
