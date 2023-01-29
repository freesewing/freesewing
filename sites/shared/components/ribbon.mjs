import { themes } from 'shared/themes/runtime.mjs'

export const Ribbon = ({ loading = false, theme = 'light' }) => (
  <div
    className={`flex flex-col justify-between p-0 transition-transform
    ${loading ? 'theme-gradient loading h-1' : 'h-0 -translate-y-1'}
  `}
  ></div>
)
