import Icon from '@/shared/components/icon'
import Link from 'next/link'

const SidebarWrap = props => (
  <>
    <div className="flex flex-row mb-4 justify-between pr-4">
      <Link href="/">
        <a href="/" onClick={() => props.setMenu(false)}>
        <h3 className="text-2xl font-bold hover:pointer">FreeSewing.dev</h3>
        </a>
      </Link>
      <Icon icon="freesewing" size={36} />
    </div>
    {props.children}
  </>
)

export default SidebarWrap
