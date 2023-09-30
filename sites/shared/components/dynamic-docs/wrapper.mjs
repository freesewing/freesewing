import { PageLink } from 'shared/components/link.mjs'
import { DocsIcon } from 'shared/components/icons.mjs'

export const MdxWrapper = ({ title = false, path, language, children, noFooter = false }) => {
  const slug = `${language === 'en' ? '' : '/' + language}/docs/${path}`

  return (
    <>
      {title ? <h1>{title}</h1> : null}
      <div className="mdx text-base-content">{children}</div>
      {noFooter ? null : (
        <div
          className={`flex flex-row gap-1 text-sm opacity-70 justify-end items-center
          border border-solid border-neutral border-b-0 border-r-0 border-l-0 pt-1 mt-2`}
        >
          <DocsIcon className="w-5 h-5" />
          <PageLink txt={slug} href={slug} />
        </div>
      )}
    </>
  )
}
