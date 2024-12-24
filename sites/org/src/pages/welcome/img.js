import Layout from '@theme/Layout'
import { DocusaurusDoc } from '@freesewing/react/components/Docusaurus'
import { RoleBlock } from '@freesewing/react/components/Role'
import { Avatar } from '@freesewing/react/components/Account'

export default function WelcomeAvatarPage() {
  return (
    <Layout title="Welcome to FreeSewing" description="Just a few questions to set up your account">
      <div className="tailwind-container">
        <div className="text-base-content mdx max-w-prose text-base-content max-w-prose text-current xl:pl-4 mx-auto my-8">
          <h1>Avatar</h1>
          <p>A picture says more than a 1000 words.</p>
          <DocusaurusDoc>
            <RoleBlock user>
              <Avatar welcome />
            </RoleBlock>
          </DocusaurusDoc>
        </div>
      </div>
    </Layout>
  )
}
