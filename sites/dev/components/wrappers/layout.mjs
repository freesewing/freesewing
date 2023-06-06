import Head from 'next/head'
import { Header, ns as headerNs } from 'site/components/header/index.mjs'
import { Footer, ns as footerNs } from 'shared/components/footer/index.mjs'

export const ns = [...new Set([...headerNs, ...footerNs])]

export const LayoutWrapper = ({ children = [], header = false }) => {
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
      <ChosenHeader />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  )
}
