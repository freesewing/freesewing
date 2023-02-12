import { useRouter } from 'next/router'
import { AsideNavigation } from 'shared/components/navigation/aside.mjs'
import { ThemePicker } from 'shared/components/theme-picker/index.mjs'

export const BareLayout = ({ app, children = [] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)

  return (
    <>
      <AsideNavigation app={app} slug={slug} before={<ThemePicker app={app} />} mobileOnly />
      {children}
    </>
  )
}
