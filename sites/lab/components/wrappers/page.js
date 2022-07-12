import { useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
// Layouts components
import LayoutWrapper from 'site/components/wrappers/layout'

/* This component should wrap all page content */
const PageWrapper= ({
  title="FIXME: No title set",
  app=false,
  layout=false,
  children=[]
}) => {

  const swipeHandlers = useSwipeable({
    onSwipedLeft: evt => (app.primaryMenu) ? app.setPrimaryMenu(false) : null,
    onSwipedRight: evt => (app.primaryMenu) ? null : app.setPrimaryMenu(true),
    trackMouse: true
  })

  const router = useRouter()
  const slug = router.asPath.slice(1)

  useEffect(() => app.setSlug(slug), [slug])

  const childProps = {
    app: app,
    title: title,
  }

  const Layout = layout

  return (
    <div
      ref={swipeHandlers.ref}
      onMouseDown={swipeHandlers.onMouseDown}
      data-theme={app.theme}
      key={app.theme} // Thiis forces the data-theme update
    >
      <LayoutWrapper {...childProps}>
        {Layout
          ? <Layout {...childProps}>{children}</Layout>
          : children
        }
      </LayoutWrapper>
    </div>
  )
}

export default PageWrapper

