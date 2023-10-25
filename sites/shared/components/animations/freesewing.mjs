import { logoPath } from 'shared/components/logos/freesewing.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['commom']

const strokeScale = 0.7

const StrokedText = (props) => (
  <>
    <text
      {...props}
      strokeWidth={Number(props.strokeWidth) / 2}
      stroke="hsl(var(--b1))"
      fill="none"
    />
    <text {...props} />
  </>
)

export const FreeSewingAnimation = ({
  className = 'w-full', // Any classes to set on the SVG tag
  stroke = 1, // The stroke width of the initial colouring in of the logo
  duration = 10, // Duration of the complete animation in seconds
}) => {
  const { t } = useTranslation(ns)

  // Ensure duration is a number
  duration = Number(duration)
  // Ensure stroke is a number
  stroke = Number(stroke) * strokeScale

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-1 0 27 27"
      strokeWidth={stroke}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className + ' icon'}
    >
      <animat
        attributeName="viewBox"
        from="0 0 25 25"
        to="0 10 25 7"
        begin={`${duration * 0.18}s`}
        dur={`${duration * 0.03}s`}
        fill="freeze"
      />
      <clipPath id="logo">
        <path d={logoPath} stroke="none" fill="none" transform="translate(-0.5,0)" />
      </clipPath>
      <g>
        <g>
          <path
            d="M 20 0 l -10,1 l 10 1 l -11 1 l 13 1 l -15 1 l 16 1 l -16 1 l 15 1 l -15 1 l 16 1 l -16 1 l 17 1 l-16 1 l15 1 l -18 1.3 l 19 0.2 l -15 1 l 6 0.5 l -5 0.5 l 5 0 l 9 -0.5 l -3 1.2 l 2 1 l -3 0 l 2 2 l -3 -0.5 l 1 2 l -3 -1 l1 2 l-3 -1 l -1.5 1.5 l-2 -1.5 l-3 1 l-5 -7 l 2 -2 l-3 -1 l 2 -2"
            clipPath="url(#logo)"
            strokeOpacity="1"
            strokeDasharray="330 400"
          >
            <animate
              attributeName="stroke-dashoffset"
              dur={`${duration * 0.333}s`}
              from="330"
              to="0"
              fill="freeze"
            />
            <animate
              attributeName="stroke-width"
              begin={`${duration * 0.333}s`}
              dur={`${duration * 0.05}s`}
              from={stroke}
              to="3"
              fill="freeze"
            />
            <animateTransfor
              attributeName="transform"
              attributeType="XLM"
              type="scale"
              begin={`${duration * 0.433}s`}
              dur={`${duration * 0.1}s`}
              from="1"
              to="0.45"
              fill="freeze"
            />
          </path>
          <animateTransfor
            attributeName="transform"
            attributeType="XLM"
            type="translate"
            begin={`${duration * 0.433}s`}
            dur={`${duration * 0.1}s`}
            from="0,0"
            to="6.5,0"
            fill="freeze"
          />
        </g>
        <StrokedText
          x="12.5"
          y="23"
          strokeWidth={stroke}
          stroke="none"
          fill="hsl(var(--p))"
          textAnchor="middle"
          opacity="0"
          style={{
            fontSize: 4.2,
            fontWeight: 'bold',
            letterSpacing: '-0.007rem',
          }}
        >
          FreeSewing
          <animate
            attributeName="opacity"
            begin={`${duration * 0.45}s`}
            dur={`${duration * 0.1}s`}
            from="0"
            to="1"
            fill="freeze"
          />
        </StrokedText>
        <StrokedText
          x="1.666"
          y="24.5"
          stroke="none"
          strokeWidth={stroke}
          fill="hsl(var(--s))"
          textAnchor="start"
          opacity="0"
          style={{
            fontSize: 1.4,
            fontWeight: 'bold',
            letterSpacing: '-0.005rem',
          }}
        >
          {t('common:slogan1')}
          <animate
            attributeName="opacity"
            begin={`${duration * 0.6}s`}
            dur={`${duration * 0.05}s`}
            from="0"
            to="1"
            fill="freeze"
          />
        </StrokedText>
        <StrokedText
          x="23.333"
          y="26"
          stroke="none"
          strokeWidth={stroke}
          fill="hsl(var(--a))"
          textAnchor="end"
          opacity="0"
          style={{
            fontSize: 1.4,
            fontWeight: 'bold',
            letterSpacing: '-0.005rem',
          }}
        >
          {t('common:slogan2')}
          <animate
            attributeName="opacity"
            begin={`${duration * 0.7}s`}
            dur={`${duration * 0.05}s`}
            from="0"
            to="1"
            fill="freeze"
          />
        </StrokedText>
      </g>
    </svg>
  )
}
