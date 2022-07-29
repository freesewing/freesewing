import React from 'react'
import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Link from 'next/link'
import { formatVersionTitle } from 'site/components/version-picker.js'
import Layout from 'site/components/layouts/bare'
import { PageTitle } from 'shared/components/layouts/default'
import availableVersions from 'site/available-versions.json'

const DesignLinks = ({ list, prefix='', version=false }) => (
  <ul className="flex flex-row flex-wrap ml-8">
    {list.map( d => (
      <li key={d} className="p-2">
        <Link href={`${prefix}/${d}`}>
          <a className="capitalize text-secondary hover:text-secondary-focus hover:underline">
            {d}
          </a>
        </Link>
      </li>
    ))}
  </ul>
)

const VersionLinks = ({ list, prefix='', version=false, currentDesigns=[] }) => (
  <ul className="flex flex-col flex-wrap gap-2">
    <li className="p-2">
      <Link href={`v/next`}>
        <a className="capitalize text-xl p-4 font-bold text-secondary hover:text-secondary-focus hover:underline">
          Next <span className="font-normal">(Current develop branch)</span>
        </a>
      </Link>
      <DesignLinks list={currentDesigns} />
    </li>
    {list.map( v => (
      <li key={v} className="p-2">
        <Link href={`v/${v}`}>
          <a className="capitalize text-xl p-4 font-bold text-secondary hover:text-secondary-focus hover:underline">
            v{v}
          </a>
        </Link>
        <DesignLinks list={availableVersions[v]} />
      </li>
    ))}
  </ul>
)

const VersionListPage = ({ section=false, version=false }) => {
  const app = useApp()

  const currentDesigns = []
  for (const section in app.designs) currentDesigns.push(...app.designs[section])

  return (
    <Page app={app} title={`FreeSewing Lab: ${formatVersionTitle(version)}`} layout={Layout}>
      <div className="max-w-7xl m-auto py-20 md:py-36 min-h-screen">
        <section className="px-8">
          <PageTitle app={app} title="Versions" />
          <VersionLinks list={Object.keys(availableVersions)} currentDesigns={currentDesigns} />
        </section>
      </div>
    </Page>
  )
}

export default VersionListPage


