// Dependencies
import get from 'lodash.get'
// Hooks
import { useContext } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Components
import Link from 'next/link'
import { LeftIcon, RightIcon } from 'shared/components/icons.mjs'

const linkClasses =
  'flex flex-row gap-2 items-center w-full bg-secondary py-4 px-2 ' +
  'rounded-lg border-secondary bg-opacity-10 border border-solid ' +
  'hover:bg-opacity-100 hover:text-secondary-content'

const PrevPage = ({ t, s }) =>
  s ? (
    <Link className={`${linkClasses} justify-start`} href={'/' + s}>
      <LeftIcon className="w-6 h-6 shrink-0" />
      <span className="text-left break-words font-bold">{t}</span>
    </Link>
  ) : (
    <span></span>
  )

const NextPage = ({ t, s }) =>
  s ? (
    <Link className={`${linkClasses} justify-end`} href={'/' + s}>
      <span className="text-right break-words font-bold">{t}</span>
      <RightIcon className="w-6 h-6 shrink-0" />
    </Link>
  ) : (
    <span></span>
  )

export const PrevNext = ({ slug }) => {
  // Grab site navigation and slug lookup table from the useNavigatin hook
  const { siteNav, slugLut } = useContext(NavigationContext)

  // Lookup the current slug in the LUT
  const index = slugLut.indexOf(slug)

  // Add 1 for the next page, unless it's the last page
  const iNext = index === slugLut.length - 1 ? 0 : index + 1

  // Subtract 1 for the previous page, unless it's the first page
  const iPrev = index === 0 ? slugLut.length - 1 : index - 1

  // Get the next page from the siteNav object
  const next = get(siteNav, slugLut[iNext].split('/'))

  // Get the previous page from the siteNav object
  const prev = get(siteNav, slugLut[iPrev].split('/'))

  // Return content
  return (
    <div
      className={
        'flex flex-col-reverse gap-2 lg:grid lg:grid-cols-2 lg:gap-8 w-full' +
        'items-start pt-6 mt-6 border-t-2 border-solid border-r-0 border-l-0 border-b-0'
      }
    >
      <PrevPage t={prev.t} s={prev.s} />
      <NextPage t={next.t} s={next.s} />
    </div>
  )
}
