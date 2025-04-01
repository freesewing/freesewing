import React from 'react'
import { controlDesc } from '@freesewing/config'
import { BulletIcon } from '@freesewing/react/components/Icon'

export const ControlScore = ({ control, color = 'base-content' }) =>
  control ? (
    <div className={`tw-flex tw-flex-row tw-items-center tw-text-${color}`}>
      {Object.keys(controlDesc).map((score) => (
        <BulletIcon
          fill={control >= score ? true : false}
          className="tw-w-6 tw-h-6 tw--ml-1"
          key={score}
        />
      ))}
    </div>
  ) : null
