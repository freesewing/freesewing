import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Username } from '@freesewing/react/components/Account'

export default function WelcomeComparePage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tw-text-base-content tw-max-w-prose tw-text-base-content tw-text-current tw-mx-auto tw-my-8 tw-w-full">
        <h1>Username</h1>
        <p>Everyone needs one. What will yours be?</p>
        <DocusaurusDoc>
          <RoleBlock user>
            <Username welcome />
          </RoleBlock>
        </DocusaurusDoc>
      </div>
    </Layout>
  )
}
