import { Fragment } from 'react'
import LocaleIcon from 'shared/components/icons/i18n.js'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Popover, Transition } from '@headlessui/react'
import DownIcon from 'shared/components/icons/down'
import Link from 'next/link'

const LocalePicker = ({ app, iconOnly = false, bottom = false }) => {
  const { t } = useTranslation(['locales'])
  const router = useRouter()

  const text = {
    en: 'FreeSewing in English',
    nl: 'FreeSewing in het Nederlands',
    fr: 'FreeSewing en français',
    de: 'FreeSewing auf Deutsch',
    es: 'FreeSewing en español',
  }

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`group border-0 inline-flex items-center px-3 py-2 text-base font-medium text-neural-content rounded-lg px-4 hover:text-secondary-focus`}
          >
            <LocaleIcon />
            {!iconOnly && (
              <span className="ml-4 font-medium capitalize">{t(`common:language`)}</span>
            )}
            <DownIcon className={`ml-2 h-5 w-5 ${bottom ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`absolute z-10 mb-3 w-64 transform px-4 sm:px-0 lg:max-w-xl right-0 ${
                iconOnly ? 'translate-x-4' : ''
              } ${bottom ? 'bottom-10' : 'top-12'}`}
            >
              <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative grid gap-2 bg-base-100 p-4 grid-cols-1">
                  {router.locales.map((locale) => (
                    <Link
                      href={`${locale}/${router.asPath}`}
                      key={locale}
                      className="btn btn-primary"
                    >
                      {t(locale)}
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default LocalePicker
