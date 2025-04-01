// Components
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import Layout from '@theme/Layout'
import { FreeSewingIcon, NoIcon, OkIcon } from '@freesewing/react/components/Icon'
import { linkClasses } from '@freesewing/utils'
import Link from '@docusaurus/Link'

const Card = ({ title, children, icon }) => (
  <div className={`tw-px-8 tw-bg-primary/5 tw-py-10 tw-rounded-lg tw-block tw-shadow-lg tw-grow`}>
    <h2 className="tw-mb-4 tw-text-inherit tw-flex tw-flex-row tw-gap-4 tw-justify-between tw-items-center tw-font-medium">
      {title}
      {icon}
    </h2>
    {children}
  </div>
)

const meta = {
  title: 'FreeSewing Studio',
  description:
    'FreeSewing is open source software to generate bespoke sewing ' +
    'patterns, loved by home sewers and fashion entrepreneurs alike.',
}

export default function Home() {
  return (
    <DocusaurusPage DocusaurusLayout={Layout} {...meta} Layout={false}>
      <div className="tw-max-w-7xl tw-mx-auto tw-my-12 tw-px-4">
        <div className="tw-text-center">
          <FreeSewingIcon className="tw-w-48 tw-h-48 tw-mx-auto tw-pr-3" />
          <h1 className="tw-font-black tw-text-5xl lg:tw-text-7xl tw-tracking-tighter tw-mb-0 tw-pb-0">
            FreeSewing Studio
          </h1>
          <h2 className="tw-text-xl lg:tw-text-3xl tw-font-medium tw-tracking-tighter tw-mt-0 tw-pt-0">
            Design your own bespoke sewing patterns
          </h2>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-8 md:tw-grid md:tw-grid-cols-2 md:tw-gap-4 tw-mt-12 md:tw-mt-20 md:tw-px-4">
          <Card
            title="Batteries Included"
            icon={<OkIcon className="tw-w-12 tw-h-12 tw-text-success" stroke={4} />}
          >
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              The FreeSewing Studio ships with <b>all FreeSewing designs</b> on board. You can
              utilize them as they are, or extend them for your own needs.
            </p>
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              The studio is also integrated with the FreeSewing backend, so you can access all your
              account data, and can store your patterns.
            </p>
            <p className="tw-font-medium tw-text-lg tw-text-center tw-mt-4">
              <Link
                className="tw-daisy-btn tw-daisy-btn-primary hover:tw-no-underline hover:tw-text-primary-content"
                href="/collection"
              >
                Browse Collection
              </Link>
            </p>
          </Card>
          <Card
            title="Add your own designs"
            icon={<OkIcon className="tw-w-12 tw-h-12 tw-text-success" stroke={4} />}
          >
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              <Link href="/add" className={linkClasses}>
                Adding your own custom design
              </Link>{' '}
              to the FreeSewing Studio is{' '}
              <Link href="/add" className={linkClasses}>
                a one-liner
              </Link>
              .
            </p>
            <p className="tw-font-medium tw-text-lg">
              You can start a new design from scratch, or start from one of our blocks. Just pick
              the option you want, and your new design will be added to the studio.
            </p>
            <p className="tw-font-medium tw-text-lg tw-text-center tw-mt-4">
              <Link
                className="tw-daisy-btn tw-daisy-btn-primary hover:tw-no-underline hover:tw-text-primary-content"
                href="/add"
              >
                Add a new design
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </DocusaurusPage>
  )
}
