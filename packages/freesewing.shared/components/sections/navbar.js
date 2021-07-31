import Icon from '@/shared/components/icon'
import NavigationButtons from '@/site/components/navigation-buttons'

const Navbar = props => (
  <header className={`
    z-20 bg-neutral text-neutral-content w-full mx-auto
    fixed bottom-0 border-0
    lg:relative lg:mb-8
  `}>
    <div className={`
      flex flex-row justify-between
      max-w-screen-2xl mx-auto w-full
      lg:px-4 lg:py-2 lg:gap-x-8
    `}>
      <NavigationButtons {...props} iconSize={32} navbar />
    </div>
  </header>
)

export default Navbar
