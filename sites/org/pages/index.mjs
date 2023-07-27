// Dependencies
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { nsMerge } from 'shared/utils.mjs'
// Hooks
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
// Components
import Head from 'next/head'
import { PageWrapper, ns as pageNs } from 'shared/components/wrappers/page.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { BareLayout } from 'site/components/layouts/bare.mjs'
import { ForceAccountCheck } from 'shared/components/account/force-account-check.mjs'
import { DownIcon } from 'shared/components/icons.mjs'
import { logoPath } from 'shared/components/logos/freesewing.mjs'

const ns = nsMerge(pageNs, 'common')

const Animation = ({
  className = 'w-6 h-6',
  stroke = 2,
  slogan1, slogan2
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill='none'
    viewBox="0 0 25 25"
    strokeWidth={stroke}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className + ' icon'}
    stroke="currentColor"
  >
    <animate
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
        <path d='M 20 0 l -10,1 l 10 1 l -11 1 l 13 1 l -15 1 l 16 1 l -16 1 l 15 1 l -15 1 l 16 1 l -16 1 l 17 1 l-16 1 l15 1 l -18 1.3 l 19 0.2 l -15 1 l 6 0.5 l -5 0.5 l 5 0 l 9 -0.5 l -3 1.2 l 2 1 l -3 0 l 2 2 l -3 -0.5 l 1 2 l -3 -1 l1 2 l-3 -1 l -1.5 1.5 l-2 -1.5 l-3 1 l-5 -7 l 2 -2 l-3 -1 l 2 -2'
          clipPath="url(#logo)" strokeOpacity="1" strokeDasharray="330 400">
          <animate
            attributeName="stroke-dashoffset"
            from="330"
            to="0"
            dur="0.8s"
            fill="freeze"
          />
          <animate
            attributeName="stroke-width"
            begin="0.8s"
            from="0.3"
            to="3"
            dur="0.6s"
            fill="freeze"
          />
          <animateTransform
            attributeName="transform"
            attributeType="XLM"
            type="scale"
            begin="1.3s"
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
          begin="1.3s"
          from="0,0"
          to="8,2"
          dur="0.2s"
          fill="freeze"
        />
      </g>
      <text x="12.5" y="14" stroke="none" fill="currentColor" textAnchor='middle' opacity="0" style={{
        fontSize: 4.2,
        fontWeight: 'bold',
        letterSpacing: '-0.007rem',
      }}>FreeSewing
        <animate
          attributeName="opacity"
          begin="1.4s"
          from="0"
          to="1"
          dur="0.3s"
          fill="freeze"
        />
      </text>
      <text x="12.5" y="15.25" stroke="none" fill="currentColor" textAnchor='middle' opacity="0" style={{
        fontSize: 1.4,
        fontWeight: 'bold',
        letterSpacing: '-0.005rem',
      }}>{slogan1}
        <animate
          attributeName="opacity"
          begin="2.4s"
          from="0"
          to="1"
          dur="0.2s"
          fill="freeze"
        />
      </text>
      <text x="12.5" y="16.5" stroke="none" fill="currentColor" textAnchor='middle' opacity="0" style={{
        fontSize: 1.4,
        fontWeight: 'bold',
        letterSpacing: '-0.005rem',
      }}>{slogan2}
        <animate
          attributeName="opacity"
          begin="3s"
          from="0"
          to="1"
          dur="0.2s"
          fill="freeze"
        />
      </text>
    </g>
  </svg>
)

const BoldLink = ({ href, children }) => (
  <a href={href} className="font-bold underline hover:decoration-4">
    {children}
  </a>
)

/*
 * Each page MUST be wrapped in the PageWrapper component.
 * You also MUST spread props.page into this wrapper component
 * when path and locale come from static props (as here)
 * or set them manually.
 */
const HomePage = ({ page }) => {
  const [ready, setReady] = useState(false)
  const { t } = useTranslation(ns)

  useEffect(() => {
    setTimeout(() => setReady(true), 4000)
  },[])

  return (
    <PageWrapper {...page} layout={BareLayout}>
      <ForceAccountCheck />
      <Head>
        <title>Welcome to FreeSewing.org</title>
      </Head>
      <div className={`m-0 p-0 w-full transition-all duration-300 ${ready ? '-translate-y-full h-1 opacity-0' : 'h-screen'}`}>
        <div className="flex flex-col items-center justify-between h-screen mt-4 lg:mt-12 max-w-md m-auto pb-32">
          <span/>
          <Animation className='w-full' stroke={0.3} slogan1={t('common:slogan1')} slogan2={t('common:slogan2')}/>
          <DownIcon className="w-12 h-12 animate-bounce"/>
        </div>
      </div>

      <div className="max-w-7xl m-auto px-0 my-24">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-4 mt-12 md:px-4">
          <div className="p-1 bg-gradient-to-tr from-accent to-primary rounded-none md:rounded-xl md:shadow -mx-2 px-2 md:mx-auto md:px-1 flex flex-col">
            <div className="bg-base-100 px-4 md:px-8 py-10 rounded-none md:rounded-lg grow">
              <h2 className="mb-4">What is FreeSewing?</h2>
              <p className="font-medium">
                FreeSewing is open source software to generate made-to-measure sewing patterns, loved by home sewers and fashion entrepreneurs alike.
              </p>
              <p className="font-medium">
                FreeSewing.org makes this software available to you as an online tool with unmatched custimization and flexibility.
                We have over 50 designs, and regularly add new ones.
                You can pick any design and generate a pattern to your exact measurements.
              </p>
              <p className="font-medium">
                Because made-to-measure lies at the heart of what we do, we strongly suggest you take accurate measurements.
                Industry sizing is a bunch of lies. Join the slow fashion revolution and enjoy clothes that fit you.
              </p>
            </div>
          </div>

          <div className="p-1 bg-gradient-to-tr from-info to-neutral rounded-none md:rounded-xl md:shadow -mx-2 px-2 md:mx-auto md:px-1 flex flex-col">
            <div className="bg-base-100 px-4 md:px-8 py-10 rounded-none md:rounded-lg grow">
              <h2 className="mb-4">What is FreeSewing not?</h2>
              <p className="font-medium">
                FreeSewing is not a company. We do not sell anything. We do not have staff or employees. We do not have an office. We do not get paid.
              </p>
              <p className="font-medium">
                Our websites do not contain any advertising.
                We do not track you or sell your personal data. We do not violate your privacy.
              </p>
              <p className="font-medium">
                FreeSewing is not gendered. We do not exclude or discriminate. Nor do we tolerate discrimination in our community.
              </p>
              <p className="font-medium">
                FreeSewing is not perfect. But we try our best.
                When we come up short, we will not be upset when you point it out.
                <br />
                In fact, that is how we got to where we are today.

              </p>
            </div>
          </div>

        </div>
      </div>


    </PageWrapper>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      page: {
        locale,
        path: [],
      },
    },
  }
}
