// Dependencies
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
// Components
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

export const ns = ['designs']

const btnClasses = {
  dflt:
    'btn w-full mt-2 btn-secondary ' +
    'flex flex-row flex-nowrap items-center gap-4 py-4 h-auto ' +
    'border border-secondary justify-start text-left bg-opacity-30',
  active:
    'btn-ghost bg-secondary hover:bg-secondary ' + 'hover:bg-opacity-30 hover:border-secondary',
  inactive:
    'hover:bg-opacity-20 hover:bg-secondary btn-ghost ' +
    'border border-secondary hover:border hover:border-secondary',
}
const spanClasses =
  'p-2 w-8 h-8 shrink-0 rounded-full text-center p-0 py-2 bg-secondary text-secondary-content'

export const ModalDesignPicker = ({
  modalWrapperProps = {},
  designs = [],
  setter = false,
  setModal = false,
}) => {
  const { t } = useTranslation(ns)

  const pick = (design) => {
    if (setter) setter(design)
    if (setModal) setModal(false)
  }

  return (
    <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="left">
      <div className="max-w-full">
        <h2>{t('designs:chooseADesign')}</h2>
        <div className="flex flex-row p-4 w-full flex-wrap gap-2">
          {designs.map((d) => (
            <button
              className={`btn w-64 btn-secondary flex flex-col flex-nowrap items-start
              gap-2 py-2 h-auto border border-secondary justify-start text-left bg-opacity-30
              hover:bg-opacity-20 hover:bg-secondary btn-ghost
              border border-secondary hover:border hover:border-secondary
                `}
              onClick={() => pick(d)}
            >
              <div className="capitalize text-lg font-bold">{t(`designs:${d}.t`)}</div>
              <div className={`normal-case text-base-content`}>{t(`designs:${d}.d`)}</div>
            </button>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}
