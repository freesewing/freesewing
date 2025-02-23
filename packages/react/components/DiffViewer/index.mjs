import React from 'react'
import { diffWords, diffJson } from 'diff'
import ReactDiffViewer from 'react-diff-viewer-continued'

export const diffJSON = (from, to) => diffJson(from, to)
export const diffCheck = (from, to) => diffWords(from, to)

export const DiffViewer = (props) => <ReactDiffViewer {...props} />
