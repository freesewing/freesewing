// Hooks
import { useContext } from 'react'
import { useNavigation } from 'site/hooks/use-navigation.mjs'
// Context
import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Components
//import { AsideNavigation, ns as navNs } from 'shared/components/navigation/aside.mjs'
//import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'
//import { NavigationContext } from 'shared/context/navigation-context.mjs'

import { BaseLayout, BaseLayoutLeft, BaseLayoutWide } from 'shared/components/base-layout.mjs'
import { NavLinks, Breadcrumbs, MainSections } from 'shared/components/navigation/sitenav.mjs'

export const ns = [] //navNs

export const DefaultLayout = ({ children = [], slug, pageTitle = false }) => {
  const { siteNav } = useNavigation({ ignoreControl: true })

  return (
    <BaseLayout>
      <BaseLayoutLeft>
        {slug ? (
          <>
            <MainSections {...{ siteNav, slug }} />
            <NavLinks {...{ siteNav, slug }} />
          </>
        ) : (
          <p>Slug not passed to layout</p>
        )}
      </BaseLayoutLeft>

      <BaseLayoutWide>
        {pageTitle && (
          <div className="xl:pl-4">
            {slug && <Breadcrumbs {...{ siteNav, slug }} />}
            <h1 className="break-words">{pageTitle}</h1>
          </div>
        )}
        <div className="xl:pl-4">{children}</div>
      </BaseLayoutWide>
    </BaseLayout>
  )
}
