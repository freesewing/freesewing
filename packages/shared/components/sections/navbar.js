import Icon from 'shared/components/icon'
import NavigationButtons from 'site/components/navigation-buttons'

const Navbar = props => (
  <header className={`
    z-20 bg-base-100 border-base-200 w-full mx-auto
    fixed bottom-0 border-t-2
    lg:relative lg:border-b-2 lg:mb-8
  `}>
    <div className='max-w-screen-xl px-4 py-2 flex flex-row gap-x-8 w-full mx-auto justify-between'>
      <NavigationButtons {...props} iconSize={32} navbar />
    </div>
  </header>
)

export default Navbar
