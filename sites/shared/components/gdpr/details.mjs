import { useTranslation } from 'next-i18next'

export const ns = ['gdpr']

export const GdprAccountDetails = () => {
  const { t } = useTranslation(ns)

  return (
    <div className="border-l-4 ml-1 pl-4 my-2 opacity-80">
      <h6>{t('accountWhatQuestion')}</h6>
      <p
        dangerouslySetInnerHTML={{
          __html:
            t('accountWhatAnswer') +
            '<br /><em><small>' +
            t('accountWhatAnswerOptional') +
            '</small></em>',
        }}
      />
      <h6>{t('whyQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('accountWhyAnswer') }} />
      <h6>{t('timingQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('accountTimingAnswer') }} />
      <h6>{t('shareQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('accountShareAnswer') }} />
      <p dangerouslySetInnerHTML={{ __html: t('openData') }} />
    </div>
  )
}
