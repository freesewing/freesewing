// Dependencies
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
// Hooks
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import { Icons, welcomeSteps, BackToAccountButton, NumberBullet } from './shared.mjs'
import { ContinueButton } from 'shared/components/buttons/continue-button.mjs'
import { ListInput } from 'shared/components/inputs.mjs'
import { DynamicOrgDocs } from 'shared/components/dynamic-docs/org.mjs'

export const ns = ['account', 'status']

export const ImperialSettings = ({ welcome = false }) => {
  // Hooks
  const { account, setAccount } = useAccount()
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()
  const backend = useBackend()
  const { t, i18n } = useTranslation(ns)

  // State
  const [selection, setSelection] = useState(account?.imperial === true ? 'imperial' : 'metric')

  // Helper method to update account
  const update = async (val) => {
    if (val !== selection) {
      setLoadingStatus([true, 'processingUpdate'])
      const result = await backend.updateAccount({ imperial: val === 'imperial' ? true : false })
      if (result.success) {
        setAccount(result.data.account)
        setSelection(val)
        setLoadingStatus([true, 'settingsSaved', true, true])
      } else setLoadingStatus([true, 'backendError', true, true])
    }
  }

  // Next step in the onboarding
  const nextHref =
    welcomeSteps[account?.control].length > 3
      ? '/welcome/' + welcomeSteps[account?.control][3]
      : '/docs/guide'

  return (
    <div className="max-w-xl">
      <LoadingStatus />
      <ListInput
        id="account-units"
        label={t('unitsTitle')}
        list={['metric', 'imperial'].map((val) => ({
          val,
          label: (
            <div className="flex flex-row items-center w-full justify-between">
              <span>{t(`${val}Units`)}</span>
              <NumberBullet nr={val === 'imperial' ? '″' : 'cm'} color="secondary" />
            </div>
          ),
          desc: t(`${val}Unitsd`),
        }))}
        current={selection}
        update={update}
        docs={<DynamicOrgDocs language={i18n.language} path={`site/account/units`} />}
      />
      {welcome ? (
        <>
          <ContinueButton btnProps={{ href: nextHref }} link />
          {welcomeSteps[account?.control].length > 0 ? (
            <>
              <progress
                className="progress progress-primary w-full mt-12"
                value={300 / welcomeSteps[account?.control].length}
                max="100"
              ></progress>
              <span className="pt-4 text-sm font-bold opacity-50">
                3 / {welcomeSteps[account?.control].length}
              </span>
              <Icons
                done={welcomeSteps[account?.control].slice(0, 2)}
                todo={welcomeSteps[account?.control].slice(3)}
                current="units"
              />
            </>
          ) : null}
        </>
      ) : (
        <BackToAccountButton />
      )}
    </div>
  )
}
