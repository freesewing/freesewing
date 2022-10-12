import { path } from 'shared/components/icons/freesewing.js'

const Spinner = ({ className = 'h-36 w-36', circle = 1, triangle = 1 }) => {
  const tw = 85
  const th = tw * (1 - Math.cos(30))
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -28 95 95" className={className}>
      <path d={path} fill="currentColor" transform="scale(2) translate(-1 0)" />
      {triangle && (
        <path
          d={`M 27.5 -21 l ${tw / 2} ${th} l ${tw * -1} 0 z`}
          stroke="currentColor"
          stroke-width="1"
          fill="none"
          strokeDasharray={`60 ${tw * 3 - 60}`}
        >
          <animate
            attributeName="stroke-dashoffset"
            attributeType="XML"
            from={tw * -3}
            to="0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
      )}
      {circle && (
        <circle
          cx="24"
          cy="24"
          r="32"
          strokeWidth="1"
          stroke="currentColor"
          strokeDasharray="60 360"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 24 24"
            to="360 24 24"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <rect height="1" width="6" x="15.5" y="17" className="blink" fill="currentColor">
        <animate
          attributeType="XML"
          attributeName="height"
          from="1"
          to="7.5"
          begin="loop.begin+1.5s;"
          dur="0.15s"
        />
      </rect>
      <rect height="1" width="5.8" x="25" y="17" className="blink" fill="currentColor">
        <animate
          attributeType="XML"
          attributeName="height"
          from="1"
          to="7.5"
          begin="loop.begin+1.5s;"
          dur="0.15s"
        />
      </rect>
      <rect height="1" width="1" x="-10" y="-10" fill="none">
        <animate
          attributeType="CSS"
          attributeName="visibility"
          from="hide"
          to="hide"
          begin="0;loop.end"
          dur="3s"
          id="loop"
        />
      </rect>
    </svg>
  )
}

export default Spinner
