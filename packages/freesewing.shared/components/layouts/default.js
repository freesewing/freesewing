import { useState } from 'react'
// Shared components
import PrimaryMenu from 'shared/components/navigation/primary'
//import Breadcrumbs from '@/shared/components/navigation/breadcrumbs'
import H1 from 'shared/components/elements/h1'
//import Icon from '@/shared/components/icon'
//import Button from '@/shared/components/elements/button'
// Site components
//import NavigationButtons from '@/site/components/navigation-buttons'
//import Search from '@/site/components/search'

const iconSize= 48

const DefaultLayout = props => {

  const [leftNav, setLeftNav] = useState(false)

  const toggleLeftNav = () => setLeftNav(!leftNav)

  return (
    <div className={`
    flex flex-col justify-between
    min-h-screen
    bg-base-100
    `} data-theme={props.app.theme}>
      <header className={`
        bg-primary
        p-4
        block
        sm:hidden
      `}>
        header
      </header>
      <main className={`
        grow flex flex-row
        sm:py-8
      `}>
        <aside className={`
          fixed top-0 right-0
          ${props.app.primaryMenu ? '' : 'translate-x-[-100%]'} transition-transform
          sm:relative sm:transform-none
          h-screen
          w-screen
          sm:max-w-[38.2%]
          sm:flex sm:flex-row-reverse
        `}>
          <PrimaryMenu app={props.app}/>
        </aside>
        <section>
          <H1>{props.title}</H1>
          {props.children}
        </section>
      </main>
      <footer className="bg-primary p-8">footer</footer>
    </div>
  )
}

export default DefaultLayout
