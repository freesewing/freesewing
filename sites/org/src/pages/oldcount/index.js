import DocusaurusLayout from '@theme/Layout'
import { DocusaurusPage } from '@freesewing/react/components/DocusaurusPage'
import { CustomSidebar } from '@site/src/components/AccountSidebar.js'

/*
 * Some things should never generated as SSR
 * So for these, we run a dynamic import and disable SSR rendering
const DynamicAuthWrapper = dynamic(
  () => import('shared/components/wrappers/auth/index.mjs').then((mod) => mod.AuthWrapper),
  { ssr: false }
)

const DynamicAccountOverview = dynamic(
  () => import('shared/components/account/overview.mjs').then((mod) => mod.AccountOverview),
  { ssr: false }
)
 */

export default function AccountIndexPage() {
  return (
    <DocusaurusPage
      DocusaurusLayout={DocusaurusLayout}
      title="Account"
      description="Sign In to your FreeSewing account to unlock all features"
    >
      <CustomSidebar />
      <pre>account here</pre>
    </DocusaurusPage>
  )
}
