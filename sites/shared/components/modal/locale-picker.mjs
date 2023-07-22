// Dependencies
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { siteConfig } from 'site/site.config.mjs'
import orderBy from 'lodash.orderby'
import Link from 'next/link'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

export const ns = ['locales']

export const ModalLocalePicker = () => {
  const { t } = useTranslation(ns)
  const router = useRouter()
  const languages = siteConfig.availableLanguages.map((lang) => ({ name: t(lang), code: lang }))

  return (
    <ModalWrapper>
      <div className="grid gap-2 p-4 grid-cols-1 max-w-lg w-full">
        <h2>
          {t('locales:chooseYourLanguage')} {router.defaultLocale}
        </h2>
        {orderBy(languages, 'name', 'asc').map((locale) =>
          locale.code === router.defaultLocale ? (
            <Link
              href={`/${router.asPath}`}
              key={locale.code}
              locale={locale.code}
              className="btn btn-lg btn-neutral grow"
            >
              <span>{t(locale.name)}</span>
              <span className="grow"></span>
              <span className="uppercase">{locale.code}</span>
            </Link>
          ) : (
            <a
              href={`https://${locale.code}${siteConfig.domain.slice(2)}${router.asPath}`}
              key={locale.code}
              locale={locale.code}
              className="btn btn-lg btn-primary grow"
            >
              <span>{t(locale.name)}</span>
              <span className="grow"></span>
              <span className="uppercase">{locale.code}</span>
            </a>
          )
        )}
      </div>
    </ModalWrapper>
  )
}
