import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import PageLink from 'shared/components/page-link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import designs from 'shared/config/designs.json'
import Design from 'site/components/design.js'

// Don't bother with utilities
delete designs.utilities

const DesignsPage = (props) => {
  const app = useApp()
  const { t } = useTranslation()

  const allDesigns = [
    ...designs.accessories,
    ...designs.blocks,
    ...designs.garments,
  ].sort()

  return (
    <Page app={app} title={t('designs')}>
      <div className="max-w-4xl m-auto text-center">
        <ul className="flex flex-row flex-wrap gap-4 items-center justify-center leading-tight text-xl">
          {allDesigns.map(design => (
            <li key={design}>
              <PageLink href={`/designs/${design}`} txt={design} className="capitalize" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row flex-wrap justify-around px-8 lg:gap-4">
        {allDesigns.map(design => <Design key={design} design={design} />)}
      </div>
    </Page>
  )
}

export default DesignsPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    }
  }
}

