// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { PageLink, WebLink } from 'shared/components/link.mjs'
import { FreeSewingIcon } from 'shared/components/icons.mjs'
import { collection } from 'site/hooks/use-design.mjs'
import { version } from '@freesewing/core'

const ns = nsMerge('sde', pageNs)
/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => {
  const { t } = useTranslation(ns)

  return (
    <PageWrapper {...page} title={false}>
      <div className="max-w-prose text-center">
        <FreeSewingIcon className="w-36 h-36 m-auto" />
        <h1>FreeSewing</h1>
      </div>
      <div className="max-w-prose">
        <h5>{t('sde:welcomeToSde')}</h5>
        <p>{t('sde:templatesAvailable')}</p>
        <ul className="list list-inside list-disc ml-4">
          {collection.map((d) => (
            <li key={d}>
              <b>
                <PageLink txt={t(`sde:${d}.t`)} href={`/design/${d}`} />
              </b>
              :<span className="pl-2">{t(`sde:${d}.d`)}</span>
            </li>
          ))}
        </ul>
        <p>{t('sde:signIn')}</p>
        <p>{t('sde:signOff')} : )</p>
        <p>joost</p>
        <p>
          <WebLink href="https://freesewing.org/patrons/join" txt={t('sde:ps')} />.
        </p>
      </div>
      <p className="text-center text-sm mt-12 opacity-60">FreeSewing v{version}</p>
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
