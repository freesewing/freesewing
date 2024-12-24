import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Control } from '@freesewing/react/components/Account'

export default function WelcomeStartPage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tailwind-container">
        <div className="text-base-content mdx max-w-prose text-base-content max-w-prose text-current xl:pl-4 mx-auto my-8">
          <h1>Welcome</h1>
          <p>We will ask you a few questions to set up your account. This won&apos;t take long.</p>
          <DocusaurusDoc>
            <RoleBlock user>
              <Control welcome />
            </RoleBlock>
          </DocusaurusDoc>
        </div>
      </div>
    </Layout>
  )
}
