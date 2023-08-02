import { useRouter } from 'next/router'

export const ns = ['']

export const BareLayout = ({ children = [] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)

  return <>{children}</>
}
