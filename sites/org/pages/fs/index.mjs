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
        {...{ designs, locale, }}
        components={{ DesignsView }}
        methods={{ t }}
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



export const DesignsView = ({ designs={}, setDesign, t }) => (
  <div className="text-center mt-8">
    <h2>{t('pickADesign')} you bitch</h2>
    <ul className="flex flex-row flex-wrap gap-2 items-center justify-center max-w-2xl px-8 mx-auto">
      {Object.entries(designs).map(([name, design]) => (
        <li key={design}>
          <button
            onClick={() => setDesign(name)}
            className={`btn btn-primary btn-outline btn-sm capitalize font-bold `}
          >{name}</button>
        </li>
      ))}
    </ul>
  </div>
)

