import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Units } from '@freesewing/react/components/Account'

export default function WelcomeNewsletterPage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tw-text-base-content tw-max-w-prose tw-text-base-content tw-text-current tw-mx-auto tw-my-8">
        <h1>Units</h1>
        <p>
          FreeSewing supports both metric units, and the imperial system.
          <br />
          <small>The latter one slightly reluctant, but support it we do.</small>
        </p>
        <DocusaurusDoc>
          <RoleBlock user>
            <Units welcome />
          </RoleBlock>
        </DocusaurusDoc>
      </div>
    </Layout>
  )
}
