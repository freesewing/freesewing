// Dependencies
import { useTranslation } from 'next-i18next'
import { collection } from 'site/hooks/use-design.mjs'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { Link } from 'shared/components/link.mjs'

export const ns = ['sde']

export const ModalDesignPicker = () => {
  const { t } = useTranslation(ns)

  return (
    <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="left">
      <div className="max-w-xl">
        <h2>{t('sde:chooseATemplate')}</h2>
        <div className="flex flex-row p-4 w-full flex-wrap gap-2">
          {collection.map((d) => (
            <Link
              href={`/design/${d}`}
              key={d}
              className={`btn w-64 btn-secondary flex flex-col flex-nowrap items-start
              gap-2 py-2 h-auto border border-secondary justify-start text-left bg-opacity-30
              hover:bg-opacity-20 hover:bg-secondary btn-ghost
              border border-secondary hover:border hover:border-secondary
                `}
            >
              <div className="text-lg font-bold">{t(`sde:${d}.t`)}</div>
              <div className={`normal-case text-base-content`}>{t(`sde:${d}.d`)}</div>
            </Link>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}
