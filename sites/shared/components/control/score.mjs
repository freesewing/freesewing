import { BulletIcon } from 'shared/components/icons.mjs'

const scores = [1, 2, 3, 4, 5]

export const ControlScore = ({ control, color = 'base-content' }) =>
  control ? (
    <div className={`flex flex-row items-center text-${color}`}>
      {scores.map((score) => (
        <BulletIcon fill={control >= score ? true : false} className="w-6 h-6 -ml-1" key={score} />
      ))}
    </div>
  ) : null
