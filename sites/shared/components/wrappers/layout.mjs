//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { nsMerge } from 'shared/utils.mjs'
import Head from 'next/head'
import { Header, ns as headerNs } from 'site/components/header/index.mjs'
import { Footer, ns as footerNs } from 'shared/components/footer/index.mjs'
import { Search, ns as searchNs } from 'site/components/search.mjs'

export const ns = nsMerge(headerNs, footerNs, searchNs)

export const LayoutWrapper = ({
  children = [],
  search,
  setSearch,
  noSearch = false,
  header = false,
  footer = true,
  slug,
}) => {
  return (
    <div
      className={`
    flex flex-col justify-between
    min-h-screen
    bg-base-100
    `}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {header && <Header slug={slug} />}

      <main
        className={`grow transition-margin duration-300 ease-in-out
        }`}
      >
        {children}
      </main>

      {!noSearch && search && (
        <>
          <div
            className={`
          w-full max-h-screen bg-base-100 top-0 z-30 pt-0 pb-16 px-8
          md:rounded-lg
          md:max-w-xl md:m-auto md:inset-x-12
          md:max-w-2xl
          lg:max-w-4xl
        `}
          >
            <Search search={search} setSearch={setSearch} />
          </div>
          <div className="fixed top-0 left-0 w-full min-h-screen bg-neutral z-20 bg-opacity-70"></div>
        </>
      )}
      {footer && <Footer />}
    </div>
  )
}
