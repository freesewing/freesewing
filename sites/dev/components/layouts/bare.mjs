import { useRouter } from 'next/router'
import { AsideNavigation } from 'shared/components/navigation/aside.mjs'

export const BareLayout = ({ app, children = [] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)

  return (
    <>
      <AsideNavigation app={app} slug={slug} mobileOnly />
      {children}
    </>
  )
}
