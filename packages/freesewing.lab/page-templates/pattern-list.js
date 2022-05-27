import React from 'react'
import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { defaultVersion, formatVersionTitle, formatVersionUri } from 'site/components/version-picker.js'
import TutorialIcon from 'shared/components/icons/tutorial.js'
import DesignIcon from 'shared/components/icons/design.js'
import BoxIcon from 'shared/components/icons/box.js'
import CogIcon from 'shared/components/icons/cog.js'
import Layout from 'site/components/layouts/bare'
import { PageTitle, Breadcrumbs } from 'site/components/wrappers/layout'

const links = (section, list, version) => list.map(design => (
  <li key={design} className="">
    <Link href={formatVersionUri(version, design)}>
      <a className="text-secondary text-xl capitalize">{design}</a>
    </Link>
  </li>
))

const icons = {
  accessories: (className='') => <TutorialIcon className={className}/>,
  blocks: (className='') => <BoxIcon className={className}/>,
  garments: (className='') => <DesignIcon className={className}/>,
  utilities: (className='') => <CogIcon className={className}/>,
}

const Section = ({ section, version, patterns }) => {
  const { t } = useTranslation(['patterns'])
  return patterns.map(design => (
    <Link href={formatVersionUri(version, design)}>
      <a className={`
        text-secondary border rounded-lg
        flex flex-col gap-1 px-4 py-2 grow justify-between text-2xl
        md:text-4xl
        lg:text-4xl
        xl:text-6xl
        2xl:text-7xl
        hover:border hover:border-secondary hover:bg-secondary hover:bg-opacity-10
        shadow
      `}>
        <div className="flex flex-row items-center justify-items-start w-full">
          <span className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-bold grow capitalize">
            {t(`patterns:${design}.t`)}
          </span>
          {icons[section]("w-12 h-12 md:h-20 md:w-20 xl:w-32 xl:h-32 shrink-0")}
        </div>
          <span className="text-xl md:text-2xl xl:text-3xl pb-2 xl:pb-4 2xl:text-4xl">{t(`patterns:${design}.d`)}</span>
      </a>
    </Link>
  ))
}

const PatternListPageTemplate = ({ section=false, version=false }) => {
  const app = useApp()
  const { t } = useTranslation(['app'])

  const title = section
    ? app.navigation[section].__title
    : t('designs')

  return (
    <Page app={app} title={`FreeSewing Lab: ${formatVersionTitle(version)}`} layout={Layout}>
      <Head>
        <meta property="og:title" content="lab.FreeSewing.dev" key="title" />
        <meta property="og:type" content="article" key='type' />
        <meta property="og:description" content="The FreeSewing lab is an online test environment for all our patterns" key='description' />
        <meta property="og:article:author" content='Joost De Cock' key='author' />
        <meta property="og:image" content="https://canary.backend.freesewing.org/og-img/en/lab/" key='image' />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://lab.freesewing.dev/" key='url' />
        <meta property="og:locale" content="en_US" key='locale' />
        <meta property="og:site_name" content="lab.freesewing.dev" key='site' />
      </Head>
      <div className="max-w-7xl m-auto py-20 md:py-36 min-h-screen">
        <section className="px-8">
          <PageTitle app={app} slug={'/'+section} title={title} />
            {section
              ? (
                <div className="flex flex-row flex-wrap gap-4 items-center justify-center my-8">
                  <Section section={section} version={version} patterns={app.patterns[section]} />
                </div>
              )
              : Object.keys(app.patterns).map(section => (
                <div key={section} className="mb-12">
                  <h2 className="pb-0">{app.navigation[section].__title}</h2>
                  <div className="flex flex-row flex-wrap gap-4 items-center justify-center my-8">
                    <Section {...{section, version}} patterns={app.patterns[section]} />
                  </div>
                </div>
              ))
            }
        </section>
      </div>
    </Page>
  )
}

export default PatternListPageTemplate


