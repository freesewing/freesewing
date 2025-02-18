import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'
import { PageLink } from 'shared/components/link.mjs'

export const ns = ['docs']

/*
 * Lowercase and strip dots, then check if we have a definition for the term
 * If not, return false
 */
const asTerm = (term, jargon, lang) => {
  if (typeof term !== 'string') return false
  term = term.toLowerCase().split('.').join('')

  return jargon[lang]?.[term] ? term : false
}

/*
 * This is used for <em> tags.
 * If it's a term, if it wraps a term in our terminology, it will make it clickable.
 * If not, it will merely return the em tag.
 *
 * Since terms are different between sites, this takes a jargon object as prop
 */
export const Term = ({ children, site, jargon = {} }) => {
  const { setModal } = useContext(ModalContext)
  const router = useRouter()
  const lang = router.locale

  const term = asTerm(children, jargon, lang)

  return term ? (
    <button
      className="italic underline text-left decoration-warning decoration-dotted decoration-2 bg-warning bg-opacity-10 px-1 hover:bg-transparent hover:decoration-solid hover:cursor-help"
      onClick={() =>
        setModal(
          <ModalWrapper>
            <DynamicMdx site={site} language={lang} slug={jargon[lang][term]} />
          </ModalWrapper>
        )
      }
    >
      {children}
    </button>
  ) : (
    <em>{children}</em>
  )
}

// This takes a jargon object as input and returns a React component
export const termList =
  (jargon, site) =>
  ({ jaron, site }) => {
    const router = useRouter()
    const lang = router.locale
    const { t } = useTranslation(ns)

    return (
      <table className="table border-collapse table-auto table-striped min-w-full">
        <thead>
          <tr>
            <th className="text-right font-base-content">{t('docs:term')}</th>
            <th>MDX</th>
            <th>{t('docs:docs')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(jargon[lang])
            .sort()
            .map((key, i) => (
              <tr
                key={key}
                className={`${i % 2 === 0 ? 'bgsecondary bg-opacity-10' : 'bg-transparent'} border border-base-300 border-r-0 border-l-0 border-b-0`}
              >
                <td className="py-1 text-right font-bold">{key}</td>
                <td className="py-1 ">
                  <Term site={site} jargon={jargon}>
                    {key}
                  </Term>
                </td>
                <td className="py-1 ">
                  <PageLink href={`/${jargon[lang][key]}`} txt={`/${jargon[lang][key]}`} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }
