// Hooks
import { useEffect, useState } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useDesign } from 'shared/hooks/use-design.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/index.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'
import { Null } from 'shared/components/null.mjs'
import { DynamicOrgDocs as DynamicDocs } from 'site/components/dynamic-org-docs.mjs'

// Translation namespaces used on this page
const namespaces = [...new Set(['aaron', ...wbNs, ...pageNs])]

const EditPatternPage = ({ page, id }) => {
  // State
  const [pattern, setPattern] = useState(false)

  // Hooks
  const { token } = useAccount()
  const backend = useBackend(token)
  const Design = useDesign(pattern?.design)

  // Effect
  useEffect(() => {
    const getPattern = async () => {
      const result = await backend.getPattern(id)
      if (result.success) setPattern(result.data.pattern)
    }
    // Guard against loops as the backend object is recreated on each render
    if (pattern === false) getPattern()
    else if (pattern.id && pattern.id !== id) getPattern()
  }, [id, pattern, backend])

  const baseSettings = pattern
    ? {
        ...pattern.settings,
        measurements: pattern.set ? pattern.set.measies : pattern.cset.measies,
      }
    : null

  return (
    <PageWrapper {...page} layout={WorkbenchLayout} header={Null}>
      <Workbench
        design={pattern?.design}
        from={{ type: 'pattern', data: pattern }}
        {...{ Design, DynamicDocs, baseSettings }}
      />
    </PageWrapper>
  )
}

export default EditPatternPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
      id: Number(params.id),
      page: {
        locale,
        path: ['new', 'pattern', 'aaron', 'set', params.id],
        title: '',
      },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
