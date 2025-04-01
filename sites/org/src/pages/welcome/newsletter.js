import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Newsletter } from '@freesewing/react/components/Account'

export default function WelcomeNewsletterPage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tw-text-base-content tw-max-w-prose tw-text-base-content tw-text-current tw-mx-auto tw-my-8">
        <h1>Newsletter</h1>
        <p>You wil get email from us every three months. No more. No less.</p>
        <DocusaurusDoc>
          <RoleBlock user>
            <Newsletter welcome />
          </RoleBlock>
        </DocusaurusDoc>
      </div>
    </Layout>
  )
}
