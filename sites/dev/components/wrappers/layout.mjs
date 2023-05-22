import Head from 'next/head'
import { Header, ns as headerNs } from 'site/components/header/index.mjs'
import { Footer, ns as footerNs } from 'shared/components/footer/index.mjs'
import { Search, ns as searchNs } from 'site/components/search.mjs'

export const ns = [...new Set([...headerNs, ...footerNs, ...searchNs])]

export const LayoutWrapper = ({
  children = [],
  search,
  setSearch,
  noSearch = false,
  header = false,
}) => {
  const ChosenHeader = header ? header : Header

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
      <ChosenHeader setSearch={setSearch} />
      <main className="grow">{children}</main>
      {!noSearch && search && (
        <>
          <div
            className={`
          fixed w-full max-h-screen bg-base-100 top-0 z-30 pt-0 pb-16 px-8
          md:rounded-lg md:top-24
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
      <Footer />
    </div>
  )
}
