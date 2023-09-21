// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { ChoiceLink } from 'shared/components/choice-link.mjs'
import { DocsIcon } from 'shared/components/icons.mjs'

const ns = [...pageNs, 'labdocs']

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const DocsPage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page}>
      <div>
        <div className="max-w-prose">
          <p>
            {t('labdocs:noDocs')}
            <br />
            {t('labdocs:see')}:
          </p>
          <ChoiceLink
            title="FreeSewing.org"
            href="https://freesewing.org/docs"
            icon={<DocsIcon className="w-8 h-8" />}
          >
            <p>{t('labdocs:orgDocs')}</p>
          </ChoiceLink>
          <ChoiceLink
            title="FreeSewing.dev"
            href="https://freesewing.dev/"
            icon={<DocsIcon className="w-8 h-8" />}
          >
            <p>{t('labdocs:devDocs')}</p>
          </ChoiceLink>
          <Popout note compact>
            {t('labdocs:enOnly')}
          </Popout>
        </div>
      </div>
    </PageWrapper>
  )
}

export default DocsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['docs'],
      },
    },
  }
}
