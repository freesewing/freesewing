import React, { useState } from 'react'

export const Tabs = ({ tabs = '', active = 0, children, withModal = false, Swizzled }) => {
  // Keep active tab in state
  const [activeTab, setActiveTab] = useState(active)

  /*
   * In MDX, tabs are passed as a comma-seperated list.
   * In React, they come as an array.
   * So we need to handle both cases.
   */
  const tablist = Array.isArray(tabs) ? tabs : tabs.split(',').map((tab) => tab.trim())

  /*
   * Don't bother unless there's actual tabs to show
   */
  if (!tablist) return null

  /*
   * Pass down activeTab and tabId for conditional rendering
   */
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
                  <Swizzled.components.ModalWrapper
                    flex="col"
                    justify="top lg:justify-center"
                    slideFrom="right"
                    fullWidth
                  >
                    {childrenWithTabSetter}
                  </Swizzled.components.ModalWrapper>
                )
              }
            >
              <span className="pr-2">{title}</span>
              <Swizzled.components.KioskIcon className="w-6 h-6 hover:text-secondary" />
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

export const Tab = ({ children, tabId, activeTab }) => (activeTab === tabId ? children : null)
