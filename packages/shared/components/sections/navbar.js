import Icon from '../icon'
import Link from 'next/link'
import ThemeChooser from '../theme-chooser'

const iconsize = 32
const Navbar = props => {

  return (
    <header className="w-full mx-auto border-b-2 mb-8 fixed bg-base-100 z-20 border-base-200">
      <div className='max-w-screen-xl px-4 py-2 flex flex-row gap-x-8 w-full mx-auto justify-between'>
        <div>
          <Link href="/">
            <button className="btn btn-ghost">
              <Icon icon='freesewing' size={iconsize}/>
              <span className='px-2'>FreeSewing.dev</span>
            </button>
          </Link>
        </div>
        <div></div>
        <div className='flex flex-row'>
          <Link href="/">
            <button className="btn btn-ghost" title="Chat on Discord">
              <Icon icon='discord' size={iconsize}/>
              <span className='px-2'>Chat on Discord</span>
            </button>
          </Link>
          <ThemeChooser />
          <Link href="https://github.com/freesewing/freesewing/">
            <button className="btn btn-ghost" title="Code on GitHub">
              <Icon icon='github' size={iconsize}/>
            </button>
          </Link>
        </div>
      </div>
    </header>
  )

}

export default Navbar
