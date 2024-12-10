import React, { useState, useContext } from 'react'
import { ModalContext } from '@freesewing/react/context/Modal'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { KioskIcon } from '@freesewing/react/components/Icon'

/**
 * FreeSewing Tabs component, typically used for dev examples
 *
 * @param {string} tabs - The list of tabs
 * @param {number} active - The nr of the active tab
 * @param {array} children - Content to render within the tabs
 * @param {bool} withModal - Set to true to load tab content in a modal window when kiosk icon is clicked
 */
export const Tabs = ({ tabs = '', active = 0, children, withModal = false }) => {
  const { setModal } = useContext(ModalContext)

  // Keep active tab in state
  const [activeTab, setActiveTab] = useState(active)

  /*
   * Parse tab list
   * Comma-seperated tabs passed as a string are how it works in MDX
   */
  const tablist = Array.isArray(tabs) ? tabs : tabs.split(',').map((tab) => tab.trim())

  if (!tablist) return null

  // Pass down activeTab and tabId for conditional rendering
  const childrenWithTabSetter = children.map((child, tabId) =>
    React.cloneElement(child, { activeTab, tabId, key: tabId })
  )

  return (
    <div className="my-4">
      <div className="tabs">
        {tablist.map((title, tabId) => {
          const btnClasses = `text-lg font-bold capitalize tab h-auto tab-bordered grow py-2 ${
            activeTab === tabId ? 'tab-active' : ''
          }`

          return withModal && activeTab === tabId ? (
            <button
              key={tabId}
              className={btnClasses}
              onClick={() =>
                setModal(
                  <ModalWrapper
                    flex="col"
                    justify="top lg:justify-center"
                    slideFrom="right"
                    fullWidth
                  >
                    {childrenWithTabSetter}
                  </ModalWrapper>
                )
              }
            >
              <span className="pr-2">{title}</span>
              <KioskIcon className="w-6 h-6 hover:text-secondary" />
            </button>
          ) : (
            <button key={tabId} className={btnClasses} onClick={() => setActiveTab(tabId)}>
              {title}
            </button>
          )
        })}
      </div>
      <div>{childrenWithTabSetter}</div>
    </div>
  )
}

/**
 * FreeSewing Tab component, use it together with Tabs
 *
 * @param {number} tabId - The ID of this tab
 * @param {number} activeTab - The ID of the active tab
 * @param {array} children - Content to render within the tab
 */
export const Tab = ({ children, tabId, activeTab }) => (activeTab === tabId ? children : null)
