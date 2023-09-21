// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { Plea } from 'shared/components/patrons/plea.mjs'
import { Subscribe } from 'shared/components/patrons/subscribe.mjs'

export const ns = ['patrons']

export const PleaseSubscribe = (props = {}) => {
  const { t } = useTranslation(ns)

  return (
    <div className={`max-w-7xl m-auto px-0 -mt-12 mb-24 ${props.dense ? '' : 'md:my-24'}`}>
      <div className="p-1 bg-gradient-to-tr from-neutral to-primary mt-12 rounded-none md:rounded-lg lg:rounded-xl md:shadow text-neutral-content p-8 lg:px-12 md:py-0">
        <div className="flex flex-col md:gap-2 lg:gap-12 md:grid md:grid-cols-2">
          <Plea />
          <div className="-mt-8 md:mt-0 pt-0 md:pt-8 pb-8 lg:py-12 max-w-prose m-auto w-full m-auto">
            <h2 className="text-inherit">{t('patrons:supportFreeSewing')}</h2>
            <Subscribe {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}
