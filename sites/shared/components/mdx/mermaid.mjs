import { useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
})

export const Mermaid = ({ children }) => {
  const chart = children.props.children
  console.log({ chart })
  useEffect(() => {
    mermaid.contentLoaded()
  }, [])
  return <div className="mermaid">{children.props.children}</div>
}
