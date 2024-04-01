// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Translation & router hook
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
// Layout components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { EditorLayout } from 'site/components/layouts/editor.mjs'
// The FreeSewing pattern editor
import { PatternEditor, ns as editorNs } from '@freesewing/react-components'
// The useDesign hook and FreeSewing collection
import { designs } from 'site/hooks/use-design.mjs'

// Translation namespaces used on this page
const ns = nsMerge(pageNs, editorNs)

const PatternEditorPage = ({ page, docs }) => {
  const { t } = useTranslation(ns)
  const router = useRouter()
  const { locale } = router

  return (
    <PageWrapper {...page} title="Pattern Editor" layout={EditorLayout} footer={false}>
      <PatternEditor
        {...{
          designs,
          locale,
          t,
        }}
      />
    </PageWrapper>
  )
}

export default PatternEditorPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      page: {
        locale,
        path: ['editor'],
        title: 'Pattern Editor',
      },
    },
  }
}

