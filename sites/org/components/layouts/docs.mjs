// Hooks
import { useRouter } from 'next/router'
// Components
import Link from 'next/link'
import { AsideNavigation } from 'shared/components/navigation/aside.mjs'
import { ThemePicker } from 'shared/components/theme-picker/index.mjs'
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'
import { HomeIcon } from 'shared/components/icons.mjs'
import { useState, useEffect } from 'react'

export const ns = []

export const DocsLayout = ({ app, children = [], title }) => (
  <div className="grid grid-cols-4 m-auto justify-center place-items-stretch">
    <AsideNavigation app={app} />
    <section className="col-span-4 lg:col-span-3 py-24 px-4 lg:pl-8 bg-base-50">
      {title && (
        <div className="xl:pl-4">
          <Breadcrumbs crumbs={app.state.crumbs} title={title} />
          <h1 className="break-words">{title}</h1>
        </div>
      )}
      {children}
    </section>
  </div>
)
