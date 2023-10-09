// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { useDesign } from 'site/hooks/use-design.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Workbench, ns as wbNs } from 'shared/components/workbench/new.mjs'
import { WorkbenchLayout } from 'site/components/layouts/workbench.mjs'
import { DynamicOrgDocs as DynamicDocs } from 'site/components/dynamic-org-docs.mjs'
import { Loading } from 'shared/components/spinner.mjs'

// Translation namespaces used on this page
const ns = nsMerge(wbNs, pageNs)

const EditDesignComponent = ({ design, id, settings }) => {
  const Design = useDesign(design)

  return (
    <Workbench
      preload={{ settings }}
      saveAs={{ pattern: id }}
      {...{ design, Design, DynamicDocs }}
    />
  )
}

const EditDesignPage = ({ page, design, id }) => {
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()
  const { t } = useTranslation(ns)

  const [pattern, setPattern] = useState(false)

  useEffect(() => {
    const getPattern = async () => {
      setLoadingStatus([true, t('backendLoadingStarted')])
      let result
      try {
        result = await backend.getPattern(id)
        if (result.success) {
          setPattern(result.data.pattern)
          setLoadingStatus([true, 'backendLoadingCompleted', true, true])
        } else setLoadingStatus([true, 'backendError', true, false])
      } catch (err) {
        console.log(err)
        setLoadingStatus([true, 'backendError', true, false])
      }
    }
    if (id) getPattern()
  }, [id])

  return (
    <PageWrapper {...page} title={design} layout={pattern ? WorkbenchLayout : false} header={null}>
      {pattern ? (
        <EditDesignComponent design={pattern.design} id={pattern.id} settings={pattern.settings} />
      ) : (
        <div>
          <h1>{t('account:oneMomentPLease')}</h1>
          <Loading />
          <p>Give it a moment</p>
        </div>
      )}
      <pre>{JSON.stringify(pattern, null, 2)}</pre>
    </PageWrapper>
  )
}

export default EditDesignPage

export async function getStaticProps({ locale, params }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ns)),
      id: params.id,
      page: {
        locale,
        path: ['account', 'patterns', params.id, 'edit'],
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
  return {
    paths: [],
    fallback: 'blocking',
  }
}
