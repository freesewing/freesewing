import { Fragment } from 'react'
import LocaleIcon from 'shared/components/icons/i18n.js'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const LocalePicker = ({ app, iconOnly=false }) => {
  const { t } = useTranslation(['locales'])
  const router = useRouter()

  const text = {
    en: 'FreeSewing in English',
    nl: 'FreeSewing in het Nederlands',
    fr: 'FreeSewing en français',
    de: 'FreeSewing auf Deutsch',
    es: 'FreeSewing en español'
  }

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`group inline-flex items-center px-3 py-2 text-base font-medium text-neural-content hover:bg-neutral-focus rounded-lg px-4`}
          >
            <LocaleIcon />
            <span className="ml-4 font-bold text-lg capitalize">{t(`common:language`)}</span>
            <ChevronDownIcon className={`ml-2 h-5 w-5`} aria-hidden="true" />
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
            <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-xl right-0">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative grid gap-8 bg-base-100 p-7 lg:grid-cols-1">
                  {router.locales.map(locale => (
                    <Link href={`${locale}/${router.asPath}`} key={locale}>
                    <a className="-m-3 flex rounded-lg p-2 transition duration-150 ease-in-out-50 hover:translate-x-2 hover:cursor-pointer" >
                      <div className="ml-4">
                        <p className="text-lg font-medium text-base text-left">{t(locale)}</p>
                        <p className="text-base left -mt-4">
                          {text[locale]}
                        </p>
                      </div>
                    </a>
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
