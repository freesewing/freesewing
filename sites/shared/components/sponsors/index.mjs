import { Algolia } from 'shared/components/sponsors/algolia.mjs'
import { Bugsnag } from 'shared/components/sponsors/bugsnag.mjs'
import { Crowdin } from 'shared/components/sponsors/crowdin.mjs'
import { Vercel } from 'shared/components/sponsors/vercel.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['sponsors']

// Sponsors
const sponsors = { Algolia, Bugsnag, Crowdin, Vercel }

export const Sponsors = () => {
  const { t } = useTranslation(ns)

  return Object.keys(sponsors).map((sponsor) => {
    const Component = sponsors[sponsor]
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="opacity-70 text-sm">{t(sponsor.toLowerCase())}</span>
        <a
          key={sponsor}
          title={t(sponsor.toLowerCase())}
          href={`https://www.${sponsor.toLowerCase()}.com/?utm_source=freesewing&utm_campaign=oss`}
        >
          <Component className="w-36" />
        </a>
      </div>
    )
  })
}
