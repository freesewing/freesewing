import React from 'react'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import { PageMetadata, SkipToContentFallbackId, ThemeClassNames } from '@docusaurus/theme-common'
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal'
import SkipToContent from '@theme/SkipToContent'
import AnnouncementBar from '@theme/AnnouncementBar'
import Navbar from '@theme/Navbar'
import Footer from '@theme/Footer'
import LayoutProvider from '@theme/Layout/Provider'
import ErrorPageContent from '@theme/ErrorPageContent'

/*
 * A layout to keep the docusaurus header/footer and other stuff
 * but use the entire page for the content. Like our editor.
 *
 * @params {object} props - All React props
 * @params {object} children - The React children to render
 * @params {bool} footer - Set this to true to render the site footer
 * @params {string} className - CSS classes for the main content wrapper
 * @params {string} title - Page title
 * @params {string} description - Page description
 */
export function BareLayout({
  children = null,
  footer = false,
  noHeader = false,
  className = 'tw-bg-transparent tw-p-0 tw-m-0',
  title = 'FreeSewing.org',
  description = 'Free bespoke sewing patterns',
}) {
  useKeyboardNavigation()
  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />
      <SkipToContent />
      <AnnouncementBar />
      {!noHeader && <Navbar />}
      <div id={SkipToContentFallbackId} className={className}>
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>
      {footer && <Footer />}
    </LayoutProvider>
  )
}
