import { useRouter } from 'next/router'
import Aside from 'shared/components/navigation/aside'
import { BeforeNav } from './lab'


const DefaultLayout = ({ app, title=false, children=[] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)

  return (
    <>
      <Aside app={app} slug={slug} before={<BeforeNav app={app}/>} mobileOnly />
      {children}
    </>
  )
}

export default DefaultLayout
