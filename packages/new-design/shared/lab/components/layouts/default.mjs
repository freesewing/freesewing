import { useRouter } from 'next/router'
import { AsideNavigation } from 'shared/components/navigation/aside.mjs'
import { BeforeNav } from './lab'

export const DefaultLayout = ({ app, children = [] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)

  return (
    <>
      <AsideNavigation app={app} slug={slug} before={<BeforeNav app={app} />} mobileOnly />
      {children}
    </>
  )
}
