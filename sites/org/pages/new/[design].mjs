// Hooks
import { useEffect, useState } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useDesign } from 'shared/hooks/use-design.mjs'
// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/index.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'
import { DynamicOrgDocs as DynamicDocs } from 'site/components/dynamic-org-docs.mjs'
import { VagueError, ns as errorNs } from 'shared/components/errors/vague.mjs'

// Translation namespaces used on this page
const namespaces = nsMerge(errorNs, wbNs, pageNs)

const loadMeasurements = async ({ type, id, backend }) => {
  const method = {
    set: backend.getSet,
    cset: backend.getCuratedSet,
  }
  const key = {
    set: 'set',
    cset: 'curatedSet',
  }
  if (!type || !method[type]) return false

  const result = await method[type](id)
  if (result.success) return result.data[key[type]]
  else return false
}

const NewDesignPage = ({ page, id, design, type }) => {
  const { token } = useAccount()
  const backend = useBackend(token)
  const [set, setSet] = useState(false)
  const [error, setError] = useState(false)
  const Design = useDesign(design)

  useEffect(() => {
    // Guard against loops as the backend object is recreated on each render
    const getSet = async () => {
      const data = await loadMeasurements({ type, id, backend })
      if (data) setSet(data)
      else setError(true)
    }
    if (set === false) getSet()
    else if (set?.id && set.id !== id) getSet()
  }, [id, type, backend, set])

  // Short-circuit errors
  if (error)
    return (
      <PageWrapper {...page} title={false}>
        <div className="max-w-lg flex flex-col items-center m-auto justify-center text-center">
          <VagueError />
        </div>
      </PageWrapper>
    )

  const baseSettings = set?.measies ? { measurements: set.measies } : null

  return (
    <PageWrapper {...page} title={design} layout={WorkbenchLayout}>
      <Workbench {...{ design, Design, set, DynamicDocs, baseSettings }} />
    </PageWrapper>
  )
}

export default NewDesignPage

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

/*
 * getStaticPaths() is used to specify for which routes (think URLs)
 * this page should be used to generate the result.
 */
export async function getStaticPaths() {
  const paths = [...collection.map((design) => `/new/${design}`)]
  console.log(paths)
  return {
    paths: [...collection.map((design) => `/new/${design}`)],
    fallback: 'blocking',
  }
}
