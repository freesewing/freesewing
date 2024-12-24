import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Newsletter } from '@freesewing/react/components/Account'

export default function WelcomeNewsletterPage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tailwind-container">
        <div className="text-base-content mdx max-w-prose text-base-content max-w-prose text-current xl:pl-4 mx-auto my-8">
          <h1>Newsletter</h1>
          <p>You wil get email from us every three months. No more. No less.</p>
          <DocusaurusDoc>
            <RoleBlock user>
              <Newsletter welcome />
            </RoleBlock>
          </DocusaurusDoc>
        </div>
      </div>
    </Layout>
  )
}
