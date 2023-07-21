// Components
import { BaseLayout, BaseLayoutLeft, BaseLayoutWide } from 'shared/components/base-layout.mjs'
import { NavLinks, Breadcrumbs, MainSections } from 'shared/components/navigation/sitenav.mjs'

export const ns = []

export const DefaultLayout = ({ children = [], pageTitle = false }) => (
  <BaseLayout>
    <BaseLayoutLeft>
      <MainSections />
      <NavLinks sections={['new']} />
    </BaseLayoutLeft>

    <BaseLayoutWide>
      {pageTitle && (
        <div className="xl:pl-4">
          <Breadcrumbs />
          <h1 className="break-words">{pageTitle}</h1>
        </div>
      )}
      <div className="xl:pl-4">{children}</div>
    </BaseLayoutWide>
  </BaseLayout>
)
