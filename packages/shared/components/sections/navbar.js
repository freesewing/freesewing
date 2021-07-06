import Icon from '../icon'
import Link from 'next/link'
import ThemeChooser from '../theme-chooser'

const iconsize = 32
const Navbar = props => {

  return (
    <header className='w-full mx-auto'>
      <div className='max-w-screen-xl p-4 flex flex-row gap-x-8 w-full mx-auto justify-between'>
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
            <button className="btn btn-ghost">
              <Icon icon='discord' size={iconsize}/>
              <span className='px-2'>Chat on Discord</span>
            </button>
          </Link>
          <ThemeChooser />
        </div>
      </div>
    </header>
  )

}

export default Navbar
