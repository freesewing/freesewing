import DocusaurusLayout from '@theme/Layout'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import { NoTitleLayout } from '@freesewing/react/components/Layout'
import { SignUp } from '@freesewing/react/components/SignUp'

/*
 * This is the sign in page. Each page MUST be wrapped in the DocusaurusPage component.
 * You also MUST pass in the DocusaurusLayout compoment.
 */
export default function SignUpPage() {
  return (
    <DocusaurusPage
      DocusaurusLayout={DocusaurusLayout}
      Layout={NoTitleLayout}
      title="Sign Up"
      description="Sign Up for a FreeSewing account to unlock all features"
    >
      <div className="flex flex-col items-center h-screen justify-center text-base-content px-4">
        <div className="max-w-lg w-full">
          <SignUp />
        </div>
      </div>
    </DocusaurusPage>
  )
}
