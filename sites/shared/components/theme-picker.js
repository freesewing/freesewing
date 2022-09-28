import { Fragment } from 'react'
import themes from 'shared/themes/index.js'
import ThemeIcon from 'shared/components/icons/theme.js'
import { useTranslation } from 'next-i18next'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const ThemePicker = ({ app, className, iconOnly=false }) => {
  const { t } = useTranslation(['themes', 'common'])

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`group inline-flex items-center px-3 py-2 text-base font-medium text-neural-content hover:bg-neutral-focus rounded-lg px-4`}
          >
            <ThemeIcon />
            <span className="ml-4 font-bold text-lg capitalize">{t(`common:theme`)}</span>
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
                  {Object.keys(themes).map(theme => (
                    <button
                      key={theme}
                      onClick={() => app.setTheme(theme)}
                      data-theme={theme}
                      className="-m-3 flex rounded-lg p-2 transition duration-150 ease-in-out-50 hover:translate-x-2 hover:cursor-pointer"
                    >
                      <div className="ml-4">
                        <p className="text-lg font-medium text-base text-left">{t(`${theme}Theme`)}</p>
                        <p className="text-base left -mt-4">
                          {t('common:sloganCome')}
                          <span className="px-2">|</span>
                          {t('common:sloganStay')}
                        </p>
                      </div>
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

export default ThemePicker
