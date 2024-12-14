import React from 'react'
import { useLocation } from '@docusaurus/router'
import clsx from 'clsx'
//import styles from './CustomSidebar.module.css'; // Optional for styling

const links = [
  { label: 'Home', to: '/custom-section' },
  { label: 'Page 1', to: '/custom-section/page1' },
  { label: 'Page 2', to: '/custom-section/page2' },
]

export function CustomSidebar() {
  const location = useLocation()

  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <a href={link.to}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
