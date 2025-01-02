import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Control } from '@freesewing/react/components/Account'

export default function WelcomeStartPage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tw-text-base-content mdx tw-text-base-content tw-max-w-prose tw-text-current tw-mx-auto tw-my-8">
        <h1>Welcome</h1>
        <p>We will ask you a few questions to set up your account. This won&apos;t take long.</p>
        <DocusaurusDoc>
          <RoleBlock user>
            <Control welcome />
          </RoleBlock>
        </DocusaurusDoc>
      </div>
    </Layout>
  )
}
