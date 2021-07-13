// Shared components
import Navigation from 'shared/components/navigation/tree'
import Breadcrumbs from 'shared/components/navigation/breadcrumbs'
import H1 from 'shared/components/elements/h1'
import Icon from 'shared/components/icon'
import ThemeChooser from 'shared/components/theme-chooser'
import Button from 'shared/components/elements/button'
// Site components
import NavigationButtons from 'site/components/navigation-buttons'
import Search from 'site/components/search'

const iconSize= 32

const DefaultLayout = props => (
  <div className={`
  flex flex-row flex-nowrap justify-center
  mt-4 max-w-screen-xl w-full mx-auto min-h-screen
  lg:mt-0 lg:gap-12
  ${props.menu ? 'mt-24': ''}
  `}>
    <main className={`
      ${props.menu ? 'hidden' : 'block'}
      px-4 pb-12 max-w-full mx-auto
      lg:w-2/3 lg:px-8 lg:mt-8
    `}>
      {!props.noCrumbs && <Breadcrumbs {...props} />}
      <H1>{props.title || props.pages[props.href.slice(1)].frontmatter.title}</H1>
      {props.children}
    </main>
    <aside className={`
      ${props.menu ? 'block' : 'hidden'}
      w-full max-w-prose mx-auto px-4
      lg:w-1/3 lg:block lg:mt-12`
    }>
      <div className="lg:sticky lg:top-24">
        {props.sidebar ? props.sidebar : (
          <>
            <Navigation {...props} />
            {props.menu && (
              <div className="mt-4 mb-32">
                <NavigationButtons {...props} />
              </div>
            )}
          </>
        )}
      </div>
    </aside>
    {props.search && (
      <div className={`fixed w-full min-h-screen bg-base-200 px-4 lg:py-24 top-0 z-20`}>
        <Search {...props}/>
      </div>
    )}
  </div>
)

export default DefaultLayout
