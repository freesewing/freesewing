import { useContext } from 'react'
import { validateEmail, validateTld } from 'site/utils.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { useTranslation } from 'next-i18next'
import { EmailIcon, RightIcon, WarningIcon } from 'shared/components/icons.mjs'
import { FlexButtonText } from './flex-button-text.mjs'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'

export const EmailValidButton = ({ email, validText, invalidText, btnProps = {} }) => {
  // Context
  const { loading } = useContext(LoadingContext)
  const { t } = useTranslation(['signup'])
  const emailValid = (validateEmail(email) && validateTld(email)) || false

  return (
    <button
      style={{
        backgroundColor: emailValid ? '' : 'hsl(var(--wa) / var(--tw-border-opacity))',
        opacity: emailValid ? 1 : 0.8,
      }}
      className={`btn mt-4 capitalize w-full
      ${emailValid ? (loading ? 'btn-accent' : 'btn-primary') : 'btn-warning'}`}
      tabIndex="-1"
      role="button"
      aria-disabled={!emailValid}
      {...btnProps}
    >
      <FlexButtonText>
        {emailValid ? (
          loading ? (
            <>
              <Spinner />
              <span>{t('processing')}</span>
              <Spinner />
            </>
          ) : (
            <>
              <EmailIcon />
              <span>{validText}</span>
              <RightIcon />
            </>
          )
        ) : (
          <>
            <EmailIcon />
            <span>{invalidText}</span>
            <WarningIcon />
          </>
        )}
      </FlexButtonText>
    </button>
  )
}
