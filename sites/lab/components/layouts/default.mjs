// Components
import { BaseLayout, BaseLayoutWide } from 'shared/components/base-layout.mjs'

export const ns = []

export const DefaultLayout = ({ children = [], pageTitle = false }) => (
  <BaseLayout>
    <BaseLayoutWide>
      {pageTitle && <h1 className="break-words">{pageTitle}</h1>}
      <div>{children}</div>
    </BaseLayoutWide>
  </BaseLayout>
)
