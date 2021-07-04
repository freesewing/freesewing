import Icon from '../icon'
import Link from 'next/link'
import { themes } from '../config'

const Navbar = props => {

  return (
    <header className='max-w-screen-xl p-4 flex flex-row gap-x-8 w-full mx-auto'>
      <div className='flex flex-row'>
        <Link href="/">
        <button className="btn btn-ghost">
          <Icon icon='freesewing' size={32}/>
          <span className='px-4'>FreeSewing</span>
        </button>
        </Link>
      </div>
      <div className='flex flex-row flex-grow'>
        <p>navbar here</p>
      </div>
      <div className='flex flex-row'>
        <div className="dropdown dropdown-end">
          <div tabIndex="0" className="m-1 btn btn-ghost">
            <Icon icon='colors' size={32}/>
            <span className='px-4'>Theme</span>
          </div>
          <ul className="shadow menu dropdown-content bg-base-100 rounded-box w-52">
            {themes.map(theme => <li key={theme}><button className='btn btn-ghost' data-set-theme={theme}>{theme}</button></li>)}
          </ul>
        </div>
      </div>
    </header>
  )

}

export default Navbar
