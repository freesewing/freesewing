/*
 * This `/account/privacy` page is merely an alias for the `/account/consent` page
 */
import Page, { getStaticProps as gsp } from './consent.mjs'

export const getStaticProps = gsp
export default Page
