import React, { Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { DesignIcon, DownIcon } from 'shared/components/icons.mjs'

export const DesignPicker = ({ app }) => {
  const { t } = useTranslation(['common'])

  const sectionPatterns = (section) =>
    Object.keys(app.navigation[section]).filter((p) => !p.startsWith('__'))

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`group inline-flex items-center px-3 py-2 text-base font-medium text-neural-content hover:bg-neutral-focus rounded-lg px-4`}
          >
            <DesignIcon />
            <span className="ml-4 font-bold text-lg">{t('Designs')}</span>
            <DownIcon className={`ml-2 h-5 w-5`} aria-hidden="true" />
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
            <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative grid gap-8 bg-base-100 p-7 lg:grid-cols-2">
                  {Object.keys(app.navigation).map((section) => {
                    const sectionTitle = t(app.navigation[section].__title)

                    return (
                      <div
                        key={sectionTitle}
                        className="-m-3 flex rounded-lg p-2 transition duration-150 ease-in-out-50"
                      >
                        <div className="ml-4">
                          <p className="text-lg font-medium text-base">{sectionTitle}</p>
                          <ul className="flex flex-row flex-wrap">
                            {sectionPatterns(section).map((pattern) => (
                              <li key={pattern}>
                                <Link href={app.navigation[section][pattern].__slug}>
                                  <span className="capitalize pr-4 text-secondary hover:text-secondary-focus hover:underline">
                                    {pattern}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
