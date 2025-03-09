// Components
import Layout from '@theme/Layout'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import { PleaseSubscribe } from '@freesewing/react/components/Patrons'

const meta = {
  title: 'Join the FreeSewing Patrons',
  description:
    'If you think FreeSewing is worthwhile, and if you can spare ' +
    'a few coins each month without hardship, please support our work.',
}

export default function PatronsPage() {
  return (
    <DocusaurusPage DocusaurusLayout={Layout} {...meta} Layout={false}>
      <div className="tw-max-w-7xl tw-mx-auto tw-my-12 tw-px-4">
        <h1>Join the FreeSewing Patrons</h1>
        <div className="tw--mx-4">
          <PleaseSubscribe />
        </div>
      </div>
    </DocusaurusPage>
  )
}
