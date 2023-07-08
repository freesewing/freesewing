import { useContext } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { MegaphoneIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'
import { ModalProblemReport } from 'shared/components/modal/problem-report.mjs'

export const ns = ['errors']

export const Error404 = ({ err }) => {
  const { setModal } = useContext(ModalContext)
  const { t } = useTranslation(ns)

  return (
    <Popout warning className="max-w-2xl m-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
        <div className="w-48">
          <Robot pose="shrug2" embed className="w-full" />
        </div>
        <div>
          <h2>{t('errors:t404')}</h2>
          <h5>{t('errors:d404')}</h5>
          <p>{t('errors:m404')}</p>
          <button
            className="btn btn-neutral w-full flex flex-row justify-between"
            onClick={() => setModal(<ModalProblemReport {...err} />)}
          >
            <span>{t('errors:reportThis')}</span>
            <MegaphoneIcon />
          </button>
        </div>
      </div>
    </Popout>
  )
}
