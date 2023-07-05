// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout as Layout } from 'site/components/layouts/bare.mjs'
import { TranslationStatus } from 'site/components/crowdin/status.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'
import { WebLink } from 'shared/components/web-link.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(pageNs)]

// FIXME: This page (ironically) lacks translation
//
const TranslationPage = ({ page }) => (
  <PageWrapper {...page} layout={Layout}>
    <div className="max-w-6xl mx-auto p-4 mt-4">
      <Breadcrumbs crumbs={[{ s: 'translation', t: 'Translation' }]} title="Translation" />
      <h1>Translation</h1>
      <p>
        Thanks to the translation volunteers in our community FreeSewing is proudly multilingual.
      </p>

      <h2>Get involved</h2>
      <p>
        Translation is a team effort, and getting involved is not hard at all. Refer to{' '}
        <WebLink href="https://freesewing.dev/guides/translation" txt="the translation guide" /> for
        all details.
      </p>

      <h2>Translation Status</h2>
      <TranslationStatus />
      <b className="ml-10">Legend</b>
      <ul className="list list-inside ml-4">
        <li className="flex flex-row items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-full bg-primary"></span>
          <span>Translated & Approved</span>
        </li>
        <li className="flex flex-row items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-full bg-primary bg-opacity-70"></span>
          <span>Translated but not (yet) approved</span>
        </li>
        <li className="flex flex-row items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-full bg-primary bg-opacity-30"></span>
          <span>Not translated (yet)</span>
        </li>
      </ul>

      <h2>Supported Languages</h2>
      <p>We currently support the following five languages:</p>
      <ul className="list list-inside list-disc ml-4">
        <li>
          <b>English</b>{' '}
          <small>
            (This is our source language and the working language of the FreeSewing project)
          </small>
        </li>
        <li>
          <b>Dutch</b>
        </li>
        <li>
          <b>German</b>
        </li>
        <li>
          <b>French</b>
        </li>
        <li>
          <b>Spanish</b>
        </li>
      </ul>
      <p>In addition, comminity members have started initiatives to add the following langauges:</p>
      <ul className="list list-inside list-disc ml-4">
        <li>
          <b>Ukranian</b>
        </li>
      </ul>
      <Popout tip>
        <h5>Looking to add a language?</h5>
        <p>
          We would love to make FreeSewing available in more langauges.
          <br />
          If you are interested in starting a new translation effort, please reach out.
        </p>
      </Popout>
    </div>
  </PageWrapper>
)

export default TranslationPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      page: {
        locale,
        path: ['translation'],
      },
    },
  }
}
