import { useRouter } from 'next/router'

export const defaultVersion = 'next'

const useVersion = () => {
  const { pathname } = useRouter()
  const chunks = pathname.split('/')
  const version = (chunks[1] === 'v')
    ? chunks[2]
    : defaultVersion

  return version
}

export default useVersion

