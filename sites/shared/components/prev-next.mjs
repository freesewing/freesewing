// Dependencies
import get from 'lodash.get'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
// Hooks
import { useContext } from 'react'
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

/**
 * get slug at the given index, or null if it should not be displayed
 * @param  {Number} index      the index of the page to get
 * @param  {String[]} slugLut    the lut for navigation slugs
 * @param  {Object} siteNav    nav data
 * @param  {Boolen | Function} shouldHide should this element be hidden?
 * Function arguments should accept the slug that this element would display and return a boolean
 * @return {String | null}            the slug for the page, or null if it shouldn't display
 */
const getItemWithCaveat = (index, slugLut, siteNav, shouldHide) => {
  // boolean shouldHide, return null
  if (shouldHide === true) return null

  // function shouldHide, return null if it returns true
  if (typeof shouldHide === 'function' && shouldHide(slugLut[index])) return null

  // get the slug at the index
  return get(siteNav, slugLut[index].split('/'))
}

/**
 * Previous and Next buttons
 * @param  {Boolean | Function} options.noPrev should the previous button be hidden? You can pass a function that accepts the slug for the previous button and returns a boolean, or just pass a boolean
 * @param  {Boolean | Function} options.noNext should the next button be hidden? You can pass a function that accepts the slug for the next button and returns a boolean, or just pass a boolean
 */
export const PrevNext = ({ noPrev = false, noNext = false }) => {
  // Grab siteNav and slugLut from the navigation context
  const { siteNav, slugLut, slug } = useContext(NavigationContext)

  // Lookup the current slug in the LUT
  const index = slugLut.indexOf(slug)

  if (index < 0) return null

  // Add 1 for the next page, unless it's the last page
  const iNext = index === slugLut.length - 1 ? 0 : index + 1

  // Subtract 1 for the previous page, unless it's the first page
  let iPrev = index === 0 ? slugLut.length - 1 : index - 1

  // Get the next page from the siteNav object
  const next = getItemWithCaveat(iNext, slugLut, siteNav, noNext)

  // Get the previous page from the siteNav object
  const prev = getItemWithCaveat(iPrev, slugLut, siteNav, noPrev)

  // Return content
  return (
    <div
      className={
        'flex flex-col-reverse gap-2 lg:grid lg:grid-cols-2 lg:gap-8 w-full' +
        'items-start pt-6 mt-6 border-t-2 border-solid border-r-0 border-l-0 border-b-0'
      }
    >
      {prev ? <PrevPage t={prev.t} s={prev.s} /> : <span />}
      {next ? <NextPage t={next.t} s={next.s} /> : <span />}
    </div>
  )
}
