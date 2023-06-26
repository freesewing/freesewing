import { useContext } from 'react'
// Components
import { AsideNavigation, ns as navNs } from 'shared/components/navigation/aside.mjs'
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'
import { NavigationContext } from 'shared/context/navigation-context.mjs'

export const ns = navNs

export const DocsLayout = ({ children = [], pageTitle = false }) => {
  const { title, crumbs } = useContext(NavigationContext)

  return (
    <div className="grid grid-cols-4 m-auto justify-center place-items-stretch">
      <AsideNavigation />
      <section className="col-span-4 lg:col-span-3 py-8 lg:py-24 px-4 lg:pl-8 bg-base-50">
        {title && (
          <div className="xl:pl-4">
            <Breadcrumbs crumbs={crumbs} title={pageTitle ? pageTitle : title} />
            <h1 className="break-words">{pageTitle ? pageTitle : title}</h1>
          </div>
        )}
        <div className="xl:pl-4">{children}</div>
      </section>
    </div>
  )
}
