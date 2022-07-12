import React from 'react'
import Aside from 'shared/components/navigation/aside'

const DocsLayout = ({ app, title=false, children=[] }) => (
  <div className="max-w-7xl m-auto mt-32">
    {title && <h1 className="capitalize">{title}</h1>}
    <Aside app={app} mobileOnly />
    {children}
  </div>
)

export default DocsLayout
