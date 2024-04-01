// React hooks
import { useState, useEffect } from 'react'
// Views
import { MeasiesView } from './measies.mjs'

/*
 * Object holding all views
 */
const views = {
//  draft: DraftView,
//  print: PrintView,
//  cut: CutView,
//  export: ExportView,
//  edit: EditView,
//  test: TestView,
//  logs: LogView,
//  inspect: InspectView,
//  time: TimeView,
  measies: MeasiesView,
//  docs: DocsView,
}


/**
 * The editor view wrapper component
 *
 * Figures out what view to load initially,
 * and handles state for the pattern, inclding the view
 *
 * @param {object} props.designs - Objects holding designs we support
 * @param {string} props.locale - The current language code
 * @param {function} props.t - Translation method
 */
export const EditorView = (props) => {

  // React state
  const [preloaded, setPreloaded] = useState(0)
  const [mounted, setMounted] = useState(false)

  //useEffect(() => {
  //},[])


  return <p>View here</p>
}

/**
 * Helper method to figure out what view to load
 * based on the props passed in, and destructure
 * the props we need for it.
 *
 * @param (object) props - All the props
 */
const viewfinder = (props) => {

  //t = (key) => key, // Translation method
  //locale = 'en', // The language code
  //designs = {}, // Designs we support
}
