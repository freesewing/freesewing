import { useContext } from 'react'
// Components
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { AsideNavigation } from 'shared/components/navigation/aside.mjs'

export const ns = []

export const DocsLayout = ({ children = [], pageTitle = false }) => {
  const { title, crumbs } = useContext(NavigationContext)

  return (
    <div className="grid grid-cols-4 m-auto justify-center place-items-stretch lg:mt-16">
      <AsideNavigation />
      <section className="col-span-4 lg:col-span-3 py-8 lg:py-16 px-4 lg:pl-8 bg-base-50">
        {title && (
          <div className="xl:pl-4">
            <Breadcrumbs crumbs={crumbs} title={pageTitle ? pageTitle : title} />
            <h1 className="break-words searchme">{pageTitle ? pageTitle : title}</h1>
          </div>
        )}
        <div className="xl:pl-4">{children}</div>
      </section>
    </div>
  )
}
