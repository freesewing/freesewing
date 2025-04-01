import React from 'react'

export const H1 = ({ children }) => (
  <h1 className="tw-text-5xl tw-pt-5 tw-pb-4 tw-font-thin tw-tracking-tighter lg:tw-text-6xl">
    {children}
  </h1>
)

export const H2 = ({ children }) => (
  <h2 className="tw-text-3xl tw-pt-4 tw-pb-3 tw-font-black tw-tracking-tighter tw-m-0 lg:tw-text-4xl">
    {children}
  </h2>
)

export const H3 = ({ children }) => (
  <h3 className="tw-text-2xl tw-pt-3 tw-pb-2 tw-font-extrabold tw-m-0 tw-tracking-tighter lg:tw-text-3xl">
    {children}
  </h3>
)

export const H4 = ({ children }) => (
  <h4 className="tw-text-xl tw-pt-2 tw-pb-1 tw-font-bold tw-m-0 tw-tracking-tighter lg:tw-text-2xl">
    {children}
  </h4>
)

export const H5 = ({ children }) => (
  <h5 className="tw-text-lg tw-py-1 tw-font-semibold tw-m-0 tw-tracking-tight lg:tw-text-xl">
    {children}
  </h5>
)

export const H6 = ({ children }) => (
  <h6 className="tw-text-base tw-py-1 tw-font-medium tw-italic tw-m-0 tw-tracking-tight lg:tw-text-lg">
    {children}
  </h6>
)
