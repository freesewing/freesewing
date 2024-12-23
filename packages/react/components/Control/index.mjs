import React from 'react'
import { controlDesc } from '@freesewing/config'
import { BulletIcon } from '@freesewing/react/components/Icon'

export const ControlScore = ({ control, color = 'base-content' }) =>
  control ? (
    <div className={`flex flex-row items-center text-${color}`}>
      {Object.keys(controlDesc).map((score) => (
        <BulletIcon fill={control >= score ? true : false} className="w-6 h-6 -ml-1" key={score} />
      ))}
    </div>
  ) : null
