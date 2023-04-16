// Dependencies
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
// Components
import { I18nIcon, DownIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
// Languages
import en from 'site/public/locales/en/locales.json'
import es from 'site/public/locales/es/locales.json'
import de from 'site/public/locales/de/locales.json'
import fr from 'site/public/locales/fr/locales.json'
import nl from 'site/public/locales/nl/locales.json'

export const ns = ['locales']

const translations = {
  en: en.en,
  es: es.es,
  nl: nl.nl,
  de: de.de,
  fr: fr.fr,
}

export const ModalLocalePicker = ({ app, iconOnly = false, bottom = false }) => {
  const { t } = useTranslation(ns)
  const router = useRouter()

  return (
    <ModalWrapper app={app}>
      <div className="grid gap-2 p-4 grid-cols-1 max-w-lg w-full">
        <h2>{t('locales:chooseYourLanguage')}</h2>
        {router.locales.map((locale) => (
          <Link
            href={
              locale === router.defaultLocale ? `/${router.asPath}` : `/${locale}/${router.asPath}`
            }
            key={locale}
            locale={locale}
            className="btn btn-lg btn-primary grow"
          >
            <span>{t(locale)}</span>
            <span className="grow"></span>
            <span>{translations[locale]}</span>
          </Link>
        ))}
      </div>
    </ModalWrapper>
  )
}
