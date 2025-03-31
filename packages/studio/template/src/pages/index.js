// Hooks
import { useState, useEffect } from 'react'
// Components
import Link from '@docusaurus/Link'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import Layout from '@theme/Layout'
import {
  ChatIcon,
  DesignIcon,
  DocsIcon,
  FreeSewingIcon,
  HelpIcon,
  NewsletterIcon,
  NoIcon,
  OkIcon,
  ShowcaseIcon,
} from '@freesewing/react/components/Icon'
import { SignUp } from '@freesewing/react/components/SignUp'
import { CardLink } from '@freesewing/react/components/Link'
import { PleaseSubscribe } from '@freesewing/react/components/Patrons'

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
  title: 'Free Bespoke Sewing Patterns',
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
            FreeSewing
          </h1>
          <h2 className="tw-text-xl lg:tw-text-3xl tw-font-medium tw-tracking-tighter tw-mt-0 tw-pt-0">
            Free Bespoke Sewing Patterns
          </h2>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-8 md:tw-grid md:tw-grid-cols-2 md:tw-gap-4 tw-mt-12 md:tw-mt-20 md:tw-px-4">
          <Card
            title="What is FreeSewing?"
            icon={<OkIcon className="tw-w-12 tw-h-12 tw-text-success" stroke={4} />}
          >
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              FreeSewing is open source software to generate bespoke sewing patterns, loved by home
              sewers and fashion entrepreneurs alike.
            </p>
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              Industry sizing is a bunch of lies. Join the slow fashion revolution and enjoy clothes
              that fit you.
            </p>
          </Card>
          <Card
            title="What is FreeSewing not?"
            icon={<NoIcon className="tw-w-12 tw-h-12 tw-text-error" stroke={3} />}
          >
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              FreeSewing is not a company. We do not sell anything. We do not have staff or
              employees. We do not have an office. We do not get paid.
            </p>
            <p className="tw-font-medium tw-text-lg">
              Our website does not contain any advertising. We do not track you. We do not sell your
              personal data, or use it to train AI algorithms. We do not violate your privacy.
            </p>
          </Card>
        </div>
      </div>
    </DocusaurusPage>
  )
}
