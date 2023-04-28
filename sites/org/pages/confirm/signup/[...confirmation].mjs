// Hooks
import { useEffect, useState } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { BareLayout, ns as layoutNs } from 'site/components/layouts/bare.mjs'
import { WelcomeWrapper } from 'site/components/wrappers/welcome.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { Popout } from 'shared/components/popout.mjs'
import { Robot } from 'shared/components/robot/index.mjs'
import {
  GdprProfileDetails,
  GdprMeasurementsDetails,
  ns as gdprNs,
} from 'site/components/gdpr/details.mjs'

// Translation namespaces used on this page
const ns = Array.from(new Set([...pageNs, ...layoutNs, ...gdprNs, 'confirm', 'locales', 'themes']))

const ConfirmSignUpPage = (props) => {
  return <PageWrapper></PageWrapper>
}

export default ConfirmSignUpPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
