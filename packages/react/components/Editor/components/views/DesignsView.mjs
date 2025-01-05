import React from 'react'
import { Collection } from '@freesewing/react/components/Collection'

/**
 * The designs view is loaded if and only if no design name is passed to the editor
 *
 * @param {Object} props - All the props
 * @param {Object} designs - Object holding all designs
 * @param {Object} update - ViewWrapper state update object
 */
export const DesignsView = ({ designs = {}, update }) => (
  <div className="tw-text-center tw-mt-8 tw-mb-24 tw-p-2 lg: tw-p-8">
    <h1>Choose a design from the FreeSewing collection</h1>
    <Collection
      editor
      onClick={(design) => {
        update.design(design)
        update.view('draft')
      }}
    />
  </div>
)
