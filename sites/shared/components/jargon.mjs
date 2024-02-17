import { useContext } from 'react'
import { useRouter } from 'next/router'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { DynamicMdx } from 'shared/components/mdx/dynamic.mjs'

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
      className="italic underline decoration-warning decoration-dotted decoration-2 bg-warning bg-opacity-20 px-1 hover:bg-transparent hover:decoration-solid hover:cursor-help"
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
