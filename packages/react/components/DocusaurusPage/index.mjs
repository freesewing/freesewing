import React, { useContext } from 'react'
import {
  LoadingStatusContext,
  LoadingStatusContextProvider,
} from '@freesewing/react/context/LoadingStatus'
import { ModalContext, ModalContextProvider } from '@freesewing/react/context/Modal'
import { Layout as DefaultLayout } from '@freesewing/react/components/Layout'

/*
 * This component should be the top level of a Docusaurus page
 *
 * This sets up the various context providers before
 * passing all props down to the InnerPageWrapper.
 * This is required because the context providers need to
 * be setup for the modal and loading state work we do in the InnerPageWrapper
 *
 * We also re-use the Docusaurus Layout component here, which needs to be at
 * the top level of the page
 */
export const DocusaurusPage = (props) => {
  const DocusaurusLayout = props.DocusaurusLayout
  return DocusaurusLayout ? (
    <DocusaurusLayout title={props.title} description={props.description}>
      <ModalContextProvider>
        <LoadingStatusContextProvider>
          <InnerDocusaurusPage {...props} />
        </LoadingStatusContextProvider>
      </ModalContextProvider>
    </DocusaurusLayout>
  ) : (
    <p>You need to pass in the DocusaurusLayout component</p>
  )
}

/*
 * This component needs to be a child of the ContextWrapper
 *
 * @param {object} props - All React props
 * @param {function} Layout - A specific React component to use for a non-default Layout
 * @param {array} children - Child components / content
 * @param {array} crumbs - An array to construct breadcrumbs from
 * @param {string} description - Description for the page metadata
 * @param {string} title - Description for the page title
 */
const InnerDocusaurusPage = ({
  Layout = DefaultLayout,
  children = [],
  crumbs = [],
  description = 'Free Bespoke Sewing Patterns',
  title = 'FreeSewing',
}) => {
  /*
   * Set up contexts
   */
  const { modalContent } = useContext(ModalContext)
  const { LoadingStatus } = useContext(LoadingStatusContext)

  /*
   * Return inner page wrapper
   */
  return (
    <div className="tailwind-container">
      <LoadingStatus />
      {Layout ? <Layout {...{ title, description, crumbs }}>{children}</Layout> : children}
      {typeof modalContent === 'function' ? modalContent() : modalContent}
    </div>
  )
}
