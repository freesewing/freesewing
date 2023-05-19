import { useTranslation } from 'next-i18next'

export const ns = ['gdpr']

export const GdprProfileDetails = () => {
  const { t } = useTranslation(ns)

  return (
    <div className="border-l-4 ml-1 pl-4 my-2 opacity-80">
      <h6>{t('profileWhatQuestion')}</h6>
      <p
        dangerouslySetInnerHTML={{
          __html:
            t('profileWhatAnswer') +
            '<br /><em><small>' +
            t('profileWhatAnswerOptional') +
            '</small></em>',
        }}
      />
      <h6>{t('whyQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('profileWhyAnswer') }} />
      <h6>{t('timingQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('profileTimingAnswer') }} />
      <h6>{t('shareQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('profileShareAnswer') }} />
    </div>
  )
}

export const GdprMeasurementsDetails = () => {
  const { t } = useTranslation(ns)

  return (
    <div className="border-l-4 ml-1 pl-4 my-2 opacity-80">
      <h6>{t('setWhatQuestion')}</h6>
      <p
        dangerouslySetInnerHTML={{
          __html:
            t('setWhatAnswer') + '<br /><em><small>' + t('setWhatAnswerOptional') + '</small></em>',
        }}
      />
      <h6>{t('whyQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('setWhyAnswer') }} />
      <h6>{t('timingQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('profileTimingAnswer') }} />
      <h6>{t('shareQuestion')}</h6>
      <p dangerouslySetInnerHTML={{ __html: t('profileShareAnswer') }} />
      <p dangerouslySetInnerHTML={{ __html: t('openData') }} />
    </div>
  )
}
