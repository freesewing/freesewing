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
const namespaces = [...new Set([...wbNs, ...pageNs])]

const loadMeasurements = async ({ type, id, backend }) => {
  if (!type) return false
  const method = {
    set: backend.getSet,
    cset: backend.getCuratedSet,
  }
  const key = {
    set: 'set',
    cset: 'curatedSet',
  }

  //fallback for bad inputs
  if (!Object.prototype.hasOwnProperty.call(method, type)) {
    type = 'cset'
    id = 1
  }

  const result = await method[type](id)
  if (result.success) return result.data[key[type]]
  else return false
}

const NewDesignFromSetPage = ({ page, id, design, type }) => {
  const { token } = useAccount()
  const backend = useBackend(token)
  const [set, setSet] = useState(false)
  const Design = useDesign(design)

  useEffect(() => {
    // Guard against loops as the backend object is recreated on each render
    const getSet = async () => {
      const data = await loadMeasurements({ type, id, backend })
      setSet(data)
    }
    if (set === false) getSet()
    else if (set?.id && set.id !== id) getSet()
  }, [id, type, backend, set])

  const baseSettings = set?.measies ? { measurements: set.measies } : null

  return (
    <PageWrapper {...page} title={design} layout={WorkbenchLayout} header={Null}>
      <Workbench {...{ design, Design, set, DynamicDocs, baseSettings }} />
    </PageWrapper>
  )
}

export default NewDesignFromSetPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [`o_${params.design}`, ...namespaces])),
      id: Number(params.id),
      design: params.design,
      type: params.type,
      page: {
        locale,
        path: ['new', 'pattern', params.design, 'set', params.id],
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
