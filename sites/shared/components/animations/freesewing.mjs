import { logoPath } from 'shared/components/logos/freesewing.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['commom']

export const FreeSewingAnimation = ({ className = 'w-full', stroke = 0.3 }) => {
  const { t } = useTranslation(ns)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      strokeWidth={stroke}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className + ' icon'}
      stroke="currentColor"
    >
      <animat
        attributeName="viewBox"
        from="0 0 25 25"
        to="0 10 25 7"
        begin="1.8s"
        dur="0.3s"
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
            <animate attributeName="stroke-dashoffset" from="330" to="0" dur="0.6s" fill="freeze" />
            <animate
              attributeName="stroke-width"
              begin="0.5s"
              from="0.3"
              to="3"
              dur="0.4s"
              fill="freeze"
            />
            <animateTransform
              attributeName="transform"
              attributeType="XLM"
              type="scale"
              begin="0.5s"
              from="1"
              to="0.3"
              dur="0.2s"
              fill="freeze"
            />
          </path>
          <animateTransform
            attributeName="transform"
            attributeType="XLM"
            type="translate"
            begin="0.5s"
            from="0,0"
            to="8.5,2"
            dur="0.2s"
            fill="freeze"
          />
        </g>
        <text
          x="12.5"
          y="14"
          stroke="none"
          fill="currentColor"
          textAnchor="middle"
          opacity="0"
          style={{
            fontSize: 4.2,
            fontWeight: 'bold',
            letterSpacing: '-0.007rem',
          }}
        >
          FreeSewing
          <animate attributeName="opacity" begin="0.7s" from="0" to="1" dur="0.3s" fill="freeze" />
        </text>
        <text
          x="10.5"
          y="15.25"
          stroke="none"
          fill="currentColor"
          textAnchor="middle"
          opacity="0"
          style={{
            fontSize: 1.4,
            fontWeight: 'bold',
            letterSpacing: '-0.005rem',
          }}
        >
          {t('common:slogan1')}
          <animate attributeName="opacity" begin="0.9s" from="0" to="1" dur="0.3s" fill="freeze" />
        </text>
        <text
          x="14.5"
          y="16.5"
          stroke="none"
          fill="currentColor"
          textAnchor="middle"
          opacity="0"
          style={{
            fontSize: 1.4,
            fontWeight: 'bold',
            letterSpacing: '-0.005rem',
          }}
        >
          {t('common:slogan2')}
          <animate attributeName="opacity" begin="1.2s" from="0" to="1" dur="0.2s" fill="freeze" />
        </text>
      </g>
    </svg>
  )
}
