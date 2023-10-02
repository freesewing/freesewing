//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import React, { useState, useContext } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { KioskIcon } from 'shared/components/icons.mjs'

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
    React.cloneElement(child, { activeTab, tabId })
  )

  return (
    <div className="my-4">
      <div className="tabs">
        {tablist.map((title, tabId) => {
          const btnClasses = `text-lg font-bold capitalize tab h-auto tab-bordered grow py-2 ${
            activeTab === tabId ? 'tab-active' : ''
          }`

          return withModal && activeTab === tabId ? (
            <div className={`flex flex-row justify-between w-1/${tablist.length}`}>
              <button key={tabId} className={btnClasses} onClick={() => setActiveTab(tabId)}>
                {title}
              </button>
              <button
                className={`${btnClasses} px-0`}
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
                <KioskIcon className="w-6 h-6 hover:text-secondary" />
              </button>
            </div>
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

export const Tab = ({ children, tabId, activeTab }) => (activeTab === tabId ? children : null)
