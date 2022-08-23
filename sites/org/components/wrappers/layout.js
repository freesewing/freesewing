import { useState } from 'react'
import { useRouter } from 'next/router'
import Header from 'site/components/header'
import Footer from 'site/components/footer'
import Search from 'site/components/search'

const LayoutWrapper = ({
  app,
  title=false,
  children=[],
  search,
  setSearch,
  noSearch=false,
  workbench=false,
  AltMenu=null,
}) => {
  const startNavigation = () => {
    app.startLoading()
    // Force close of menu on mobile if it is open
    if (app.primaryNavigation) app.setPrimaryNavigation(false)
    // Force close of search modal if it is open
    if (search) setSearch(false)
  }

  const router = useRouter()
  router.events?.on('routeChangeStart', startNavigation)
  router.events?.on('routeChangeComplete', () => app.stopLoading())
  const [collapsePrimaryNav, setCollapsePrimaryNav] = useState(workbench || false)
  const [collapseAltMenu, setCollapseAltMenu] = useState(false)

  return (
    <div className={`
    flex flex-col justify-between
    min-h-screen
    bg-base-100
    `}>
      <Header app={app} setSearch={setSearch} />
      <main className="grow">{children}</main>
      {!noSearch && search && (
        <>
        <div className={`
          fixed w-full max-h-screen bg-base-100 top-0 z-30 pt-0 pb-16 px-8
          md:rounded-lg md:top-24
          md:max-w-xl md:m-auto md:inset-x-12
          md:max-w-2xl
          lg:max-w-4xl
        `}>
          <Search app={app} search={search} setSearch={setSearch}/>
        </div>
        <div className="fixed top-0 left-0 w-full min-h-screen bg-neutral z-20 bg-opacity-70"></div>
        </>
      )}
      <Footer app={app} />
    </div>
  )
}

export default LayoutWrapper
