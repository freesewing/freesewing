import themes from 'shared/themes/runtime.js'

const Ribbon = ({ loading=false, theme='light' }) => (
  <div className={`flex flex-col justify-between p-0 transition-transform
    ${loading ? 'theme-gradient loading h-2' : 'h-0 -translate-y-2'}
  `}></div>
)

export default Ribbon

