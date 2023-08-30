import { Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { SubAccordion } from 'shared/components/accordion.mjs'
import {
  WarningIcon,
  ResetIcon,
  LeftRightIcon,
  BoolYesIcon,
  BoolNoIcon,
} from 'shared/components/icons.mjs'
import { ListInput } from 'shared/components/inputs.mjs'
import { horFlexClasses } from 'shared/utils.mjs'

export const ns = ['workbench', 'print']

export const PrintActions = ({ update, ui }) => {
  // get translation for the menu
  const { t } = useTranslation(ns)

  const resetLayout = () => update.ui(['layouts', 'print'])

  return (
    <>
      <SubAccordion
        items={[
          [
            <div className="w-full flex flex-row gap2 justify-between" key={1}>
              <div className="flex flex-row items-center gap-2">
                <LeftRightIcon />
                <span>{t('workbench:partTransfo')}</span>
              </div>
              {ui.hideMovableButtons ? <BoolNoIcon /> : <BoolYesIcon />}
            </div>,
            <ListInput
              key={2}
              update={() => update.ui('hideMovableButtons', ui.hideMovableButtons ? false : true)}
              label={
                <span className="text-base font-normal">{t('workbench:partTransfoDesc')}</span>
              }
              list={[
                {
                  val: true,
                  label: t('workbench:partTransfoNo'),
                  desc: t('workbench:partTransfoNoDesc'),
                },
                {
                  val: false,
                  label: t('workbench:partTransfoYes'),
                  desc: t('workbench:partTransfoYesDesc'),
                },
              ]}
              current={ui.hideMovableButtons ? true : false}
            />,
          ],
          [
            <div className="w-full flex flex-row gap2 justify-between" key={1}>
              <div className="flex flex-row items-center gap-2">
                <ResetIcon />
                <span>{t('workbench:resetPrintLayout')}</span>
              </div>
              <WarningIcon />
            </div>,

            <Fragment key={2}>
              <p>{t('workbench:resetPrintLayoutDesc')}</p>
              <button
                className={`${horFlexClasses} btn btn-warning btn-outline w-full`}
                onClick={resetLayout}
              >
                <ResetIcon />
                <span>{t('workbench:resetPrintLayout')}</span>
              </button>
            </Fragment>,
          ],
        ]}
      />
    </>
  )
}
