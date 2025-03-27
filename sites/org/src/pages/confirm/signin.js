import DocusaurusLayout from '@theme/Layout'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import { NoTitleLayout } from '@freesewing/react/components/Layout'
import { SignInConfirmation } from '@freesewing/react/components/SignIn'

/*
 * This is the sign in confirmation page (via email).
 * Each page MUST be wrapped in the DocusaurusPage component.
 * You also MUST pass in the DocusaurusLayout compoment.
 */
export default function SignInPage() {
  return (
    <DocusaurusPage
      DocusaurusLayout={DocusaurusLayout}
      Layout={NoTitleLayout}
      title="Sign In"
      description="Sign In to your FreeSewing account to unlock all features"
    >
      <div className="tw-flex tw-flex-col tw-items-center tw-text-base-content tw-px-4">
        <div className="tw-max-w-lg tw-w-full">
          <SignInConfirmation onSuccess={() => (window.location.href = '/account')} silent />
        </div>
      </div>
    </DocusaurusPage>
  )
}
