// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge, capitalize } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { collection } from 'site/hooks/use-design.mjs'
// Components
import Head from 'next/head'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout, ns as popoutNs } from 'shared/components/popout/index.mjs'
import { WebLink, PageLink } from 'shared/components/link.mjs'

const ns = nsMerge('lab', 'designs', pageNs, popoutNs)
/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper footer={false}>
      <Head>
        <title>{t('lab:welcome')}</title>
      </Head>
      <div>
        <div className="max-w-4xl m-auto">
          <h1>{t('lab:welcome')}</h1>
          <h2>{t('lab:designs')}</h2>
          <div className="flex flex-row flex-wrap gap-1 justify-start font-medium leading-5">
            {collection.sort().map((d) => (
              <PageLink key={d} href={`/new/${d}`} txt={capitalize(d)} />
            ))}
          </div>
          <h2>{t('lab:docs')}</h2>
          <ul className="list list-inside list-disc">
            <li>
              <WebLink href="https://freesewing.org/" txt="FreeSewing.org" />
              <br />
              <small className="pl-4">{t('lab:orgDocs')}</small>
            </li>
            <li>
              <WebLink href="https://freesewing.dev/" txt="FreeSewing.dev" />
              <br />
              <small className="pl-4">{t('lab:devDocs')}</small>
              <br />
              <small className="pl-4 opacity-70">
                <em>({t('lab:enOnly')})</em>
              </small>
            </li>
          </ul>
          <h2>{t('lab:support')}</h2>
          <p>
            <WebLink href="https://freesewing.org/support" txt={t('lab:supportMsg')} />
          </p>
          <h2>{t('lab:about')}</h2>
          <p>{t('lab:what')}</p>
        </div>
      </div>
    </PageWrapper>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: [],
      },
    },
  }
}
