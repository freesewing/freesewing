import Icon from '@/shared/components/icon'
import NavigationButtons from '@/site/components/navigation-buttons'

const Navbar = props => (
  <header className={`
    z-20 bg-neutral text-neutral-content w-full mx-auto
    fixed bottom-0 border-t-2 border-base-300
    lg:relative lg:border-0 lg:border-b-2 lg:border-base-200 lg:mb-8 lg:border-top-2 lg:bg-base-100 lg:text-base-content
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
