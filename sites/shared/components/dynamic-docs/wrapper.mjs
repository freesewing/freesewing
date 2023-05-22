import { PageLink } from 'shared/components/page-link.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['modal']

export const MdxWrapper = ({ title = false, path, language, children }) => {
  const { t } = useTranslation(ns)
  const slug = `${language === 'en' ? '' : '/' + language}/docs/${path}`

  return (
    <>
      {title ? <h1>{title}</h1> : null}
      <div className="text-primary mdx text-base-content text-base">{children}</div>
      <div
        className={`flex flex-row gap-1 text-sm opacity-70 justify-end items-center
        border border-solid border-neutral border-b-0 border-r-0 border-l-0 pt-1 mt-2`}
      >
        <span>{t('modal:source')}:</span>
        <PageLink txt={slug} href={slug} />
      </div>
    </>
  )
}
