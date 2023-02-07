import React, { useState } from 'react'

export const Tabs = ({ tabs = '', active = 0, children }) => {
  // Keep active tab in state
  const [activeTab, setActiveTab] = useState(active)

  // Parse tab list
  const tablist = tabs.split(',').map((tab) => tab.trim())
  if (!tablist) return null

  // Pass down activeTab and tabId for conditional rendering
  const childrenWithTabSetter = children.map((child, tabId) =>
    React.cloneElement(child, { activeTab, tabId })
  )

  return (
    <div className="my-4">
      <div className="tabs">
        {tablist.map((title, tabId) => (
          <button
            key={tabId}
            className={`text-xl font-bold capitalize tab tab-bordered grow ${
              activeTab === tabId ? 'tab-active' : ''
            }`}
            onClick={() => setActiveTab(tabId)}
          >
            {title}
          </button>
        ))}
      </div>
      <div>{childrenWithTabSetter}</div>
    </div>
  )
}

export const Tab = ({ children, tabId, activeTab }) => (activeTab === tabId ? children : null)
