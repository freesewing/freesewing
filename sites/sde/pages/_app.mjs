import 'shared/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import { ContextWrapper } from 'shared/components/wrappers/context.mjs'

const FreeSewingSde = ({ Component, pageProps }) => (
  <ContextWrapper>
    <Component {...pageProps} />
  </ContextWrapper>
)

export default appWithTranslation(FreeSewingSde)
