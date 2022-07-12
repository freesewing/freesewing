import { useRouter } from 'next/router'
// Site components
import Header from 'site/components/header'
import Footer from 'site/components/footer'

const LayoutWrapper = ({ app, title=false, children=[] }) => {

  const startNavigation = () => {
    app.startLoading()
    // Force close of menu on mobile if it is open
    if (app.primaryMenu) app.setPrimaryMenu(false)
  }

  const router = useRouter()
  router.events?.on('routeChangeStart', startNavigation)
  router.events?.on('routeChangeComplete', app.stopLoading)

  return (
    <div className={`
    flex flex-col justify-between
    min-h-screen
    bg-base-100
    `}>
      <Header app={app}/>
      <main className="grow">{children}</main>
      <Footer app={app} />
    </div>
  )
}

export default LayoutWrapper
