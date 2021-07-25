import { appWithTranslation } from 'next-i18next'
import 'tailwindcss/tailwind.css'
import '@/shared/css/style.css'
import '@/shared/css/prism.css'
import '@/shared/css/draft.scss'

function FreeSewingOrg({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(FreeSewingOrg)
