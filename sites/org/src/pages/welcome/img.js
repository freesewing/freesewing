import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Avatar } from '@freesewing/react/components/Account'

export default function WelcomeAvatarPage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tw-text-base-content tw-max-w-prose tw-text-base-content tw-text-current tw-mx-auto tw-my-8 tw-w-full">
        <h1>Avatar</h1>
        <p>A picture says more than a 1000 words.</p>
        <DocusaurusDoc>
          <RoleBlock user>
            <Avatar welcome />
          </RoleBlock>
        </DocusaurusDoc>
      </div>
    </Layout>
  )
}
