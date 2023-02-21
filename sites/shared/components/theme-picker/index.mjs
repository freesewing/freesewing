import { Fragment } from 'react'
import themes from 'shared/themes/index.js'
import { ThemeIcon, DownIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'
import { Popover, Transition } from '@headlessui/react'

export const ns = ['themes']

export const ThemePicker = ({ app, iconOnly = false, bottom = false }) => {
  const { t } = useTranslation(ns)

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`h-12 group border-0 inline-flex items-center px-3 text-base text-neural-content hover:bg-neutral-focus`}
          >
            <ThemeIcon />
            {!iconOnly && (
              <span className="ml-4 font-medium capitalize">{t(`${app.theme}Theme`)}</span>
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
                  {Object.keys(themes).map((theme) => (
                    <button
                      data-theme={theme}
                      key={theme}
                      onClick={() => app.setTheme(theme)}
                      className="btn btn-primary"
                    >
                      {t(`${theme}Theme`)}
                    </button>
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
