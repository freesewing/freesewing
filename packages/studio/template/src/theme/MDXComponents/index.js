// Ejected Docusaurus components
import React from 'react'
import Head from '@docusaurus/Head'
import MDXCode from '@theme/MDXComponents/Code'
import MDXA from '@theme/MDXComponents/A'
import MDXPre from '@theme/MDXComponents/Pre'
import MDXDetails from '@theme/MDXComponents/Details'
import MDXHeading from '@theme/MDXComponents/Heading'
import MDXUl from '@theme/MDXComponents/Ul'
import MDXLi from '@theme/MDXComponents/Li'
import MDXImg from '@theme/MDXComponents/Img'
import Admonition from '@theme/Admonition'
import Mermaid from '@theme/Mermaid'
// Other Docusaurus components
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

const MDXComponents = {
  // Ejected Docusaurus components
  Head,
  details: MDXDetails,
  Details: MDXDetails,
  code: MDXCode,
  a: MDXA,
  pre: MDXPre,
  ul: MDXUl,
  li: MDXLi,
  img: MDXImg,
  h1: (props) => <MDXHeading as="h1" {...props} />,
  h2: (props) => <MDXHeading as="h2" {...props} />,
  h3: (props) => <MDXHeading as="h3" {...props} />,
  h4: (props) => <MDXHeading as="h4" {...props} />,
  h5: (props) => <MDXHeading as="h5" {...props} />,
  h6: (props) => <MDXHeading as="h6" {...props} />,
  admonition: Admonition,
  mermaid: Mermaid,
  Tabs,
  TabItem,
}

export default MDXComponents
