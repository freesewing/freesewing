import { Popout } from 'shared/components/popout/index.mjs'

export const PopoutWrapper = (props) => (
  <div className="w-full lg:max-w-lg xl:mx-8">
    <Popout {...props} />
  </div>
)
