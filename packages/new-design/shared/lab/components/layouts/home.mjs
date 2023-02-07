import React from 'react'
import { AsideNavigation } from 'shared/components/navigation/aside.mjs'

export const HomeLayout = ({ app, title = false, children = [] }) => (
  <div className="max-w-7xl m-auto mt-32">
    {title && <h1 className="capitalize">{title}</h1>}
    <AsideNavigation app={app} mobileOnly />
    {children}
  </div>
)
