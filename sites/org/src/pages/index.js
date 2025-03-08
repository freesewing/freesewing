// Dependencies
import { recentBlogPosts } from '@site/recent-blog-posts.mjs'
// Hooks
import { useState, useEffect } from 'react'
// Components
import Link from '@docusaurus/Link'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import Layout from '@theme/Layout'
import {
  ChatIcon,
  DesignIcon,
  DocsIcon,
  FreeSewingIcon,
  HelpIcon,
  NewsletterIcon,
  NoIcon,
  OkIcon,
  ShowcaseIcon,
} from '@freesewing/react/components/Icon'
import { SignUp } from '@freesewing/react/components/SignUp'
import {
  HortensiaFront,
  HiFront,
  TeaganFront,
  AaronFront,
  AlbertFront,
  BruceBack,
  BruceFront,
  SimonBack,
  SimonFront,
  WahidBack,
  WahidFront,
} from '@freesewing/react/components/LineDrawing'
import { BlogPostTeaser } from '@site/src/theme/BlogPostItems/index.js'
import { CardLink } from '@freesewing/react/components/Link'
import { PleaseSubscribe } from '@freesewing/react/components/Patrons'

const Card = ({ title, children, icon }) => (
  <div className={`tw-px-8 tw-bg-primary/5 tw-py-10 tw-rounded-lg tw-block tw-shadow-lg tw-grow`}>
    <h2 className="tw-mb-4 tw-text-inherit tw-flex tw-flex-row tw-gap-4 tw-justify-between tw-items-center tw-font-medium">
      {title}
      {icon}
    </h2>
    {children}
  </div>
)

const meta = {
  title: 'Free Bespoke Sewing Patterns',
  description:
    'FreeSewing is open source software to generate bespoke sewing ' +
    'patterns, loved by home sewers and fashion entrepreneurs alike.',
}

export default function Home() {
  return (
    <DocusaurusPage DocusaurusLayout={Layout} {...meta} Layout={false}>
      <div className="tw-max-w-7xl tw-mx-auto tw-my-12 tw-px-4">
        <div className="tw-text-center">
          <FreeSewingIcon className="tw-w-48 tw-h-48 tw-mx-auto tw-pr-3" />
          <h1 className="tw-font-black tw-text-5xl lg:tw-text-7xl tw-tracking-tighter tw-mb-0 tw-pb-0">
            FreeSewing
          </h1>
          <h2 className="tw-text-xl lg:tw-text-3xl tw-font-medium tw-tracking-tighter tw-mt-0 tw-pt-0">
            Free Bespoke Sewing Patterns
          </h2>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-8 md:tw-grid md:tw-grid-cols-2 md:tw-gap-4 tw-mt-12 md:tw-mt-20 md:tw-px-4">
          <Card
            title="What is FreeSewing?"
            icon={<OkIcon className="tw-w-12 tw-h-12 tw-text-success" stroke={4} />}
          >
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              FreeSewing is open source software to generate bespoke sewing patterns, loved by home
              sewers and fashion entrepreneurs alike.
            </p>
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              Industry sizing is a bunch of lies. Join the slow fashion revolution and enjoy clothes
              that fit you.
            </p>
            <p className="tw-font-medium tw-text-lg">
              Speaking of revolution, we do not tolerate nazis here.
            </p>
          </Card>
          <Card
            title="What is FreeSewing not?"
            icon={<NoIcon className="tw-w-12 tw-h-12 tw-text-error" stroke={3} />}
          >
            <p className="tw-font-medium tw-text-lg tw-mb-4">
              FreeSewing is not a company. We do not sell anything. We do not have staff or
              employees. We do not have an office. We do not get paid.
            </p>
            <p className="tw-font-medium tw-text-lg">
              Our website does not contain any advertising. We do not track you. We do not sell your
              personal data, or use it to train AI algorithms. We do not violate your privacy.
            </p>
          </Card>
        </div>

        <div className="tw-text-center tw-mt-20 md:tw-mt-20">
          <HowDoesItWorkAnimation />
        </div>

        <div className="tw-p-1 tw--mx-4 tw-bg-primary tw-bg-opacity-10 tw-mt-12 tw-rounded-none md:tw-rounded-lg lg:tw-rounded-xl md:tw-shadow-lg md:tw-mx-4 tw-p-8 lg:tw-px-12 md:tw-py-0">
          <div className="tw-flex tw-flex-col md:tw-gap-8 lg:tw-gap-12 md:tw-flex md:tw-flex-row tw-m-auto">
            <div className="tw--mx-4 md:tw-mx-0 md:tw-pt-8 tw-pb-8 lg:tw-py-12 tw-grow tw-m-auto tw-max-w-prose">
              <SignUp embed />
            </div>
            <div className="tw--mx-4 md:tw-mx-0 md:tw-mt-0 tw-pt-0 md:tw-pt-8 tw-pb-8 lg:tw-py-12 tw-max-w-prose tw-m-auto tw-m-auto">
              <h2 className="tw-text-inherit tw-mb-4 tw-hidden md:tw-block">Reasons to join</h2>
              <ul>
                {[0, 1, 2, 3].map((i) => (
                  <li className="tw-flex tw-flex-row tw-gap-2 tw-my-2" key={i}>
                    <OkIcon stroke={4} /> {reasonsToJoin[i]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="tw-grid tw-grid-cols-1 tw-gap-2 lg:tw-grid-cols-2 tw-max-w-7xl tw-my-16">
          {recentBlogPosts.map((post) => (
            <BlogPostTeaser
              key={post.slug}
              post={{
                content: {
                  metadata: {
                    permalink: `/blog/${post.slug}`,
                    title: post.title,
                  },
                },
              }}
            />
          ))}
        </div>

        <div className="tw-flex tw-flex-col md:tw-grid md:tw-grid-cols-2 tw-gap-4 tw-max-w-7xl tw-m-auto tw-mb-24">
          <CardLink
            Link={Link}
            href="/designs"
            title="Designs"
            icon={<DesignIcon className="tw-w-12 tw-h-12 tw-shrink-0" />}
          >
            <p className="tw-font-medium tw-text-inherit tw-italic tw-text-lg">
              Browse our collection of designs, and turn them into sewing patterns that are
              made-to-measure just for you.
            </p>
          </CardLink>
          <CardLink
            Link={Link}
            href="/showcase"
            title="Showcase"
            icon={<ShowcaseIcon className="tw-w-12 tw-h-12 tw-shrink-0" />}
          >
            <p className="tw-font-medium tw-text-inherit tw-italic tw-text-lg">
              Get inspiration from the FreeSewing community, and see how others have applied their
              creativity to our designs.
            </p>
          </CardLink>
          <CardLink
            Link={Link}
            href="/docs/about/guide"
            title="Getting Started"
            icon={<DocsIcon className="tw-w-12 tw-h-12 tw-shrink-0" />}
          >
            <p className="tw-font-medium tw-text-inherit tw-italic tw-text-lg">
              FreeSewing.org is unlike any sewing pattern website you know. Read this short guide to
              get the most our of our platform.
            </p>
          </CardLink>
          <CardLink
            Link={Link}
            href="/docs/about/faq"
            title="Frequently Asked Questions"
            icon={<HelpIcon className="tw-w-12 tw-h-12 tw-shrink-0" />}
          >
            <p className="tw-font-medium tw-text-inherit tw-italic tw-text-lg">
              Some of the questions that come up often when people discover our platform are
              answered here.
            </p>
          </CardLink>
        </div>

        <div className="lg:px-4 max-w-7xl mx-auto">
          <PleaseSubscribe />
        </div>

        <div className="tw-flex tw-flex-col md:tw-grid md:tw-grid-cols-2 tw-gap-4 tw-max-w-7xl tw-m-auto tw-mb-24">
          <CardLink
            href="/newsletter"
            title="FreeSewing Newsletter"
            icon={<NewsletterIcon className="tw-w-12 tw-h-12 tw-shrink-0" />}
          >
            <p className="tw-font-medium tw-text-inherit tw-italic tw-text-lg">
              Subscribe to our newsletter and once every 3 months you'll receive an email from us
              with honest wholesome content. No tracking, no ads, no nonsense.
            </p>
          </CardLink>
          <CardLink
            href="/support"
            title="Need Help?"
            icon={<ChatIcon className="tw-w-12 tw-h-12 tw-shrink-0" />}
          >
            <p className="tw-font-medium tw-text-inherit tw-italic tw-text-lg">
              While we are all volunteers, we have a good track record of helping people. So don't
              be shy to reach out.
            </p>
          </CardLink>
        </div>
      </div>
    </DocusaurusPage>
  )
}

const HowDoesItWorkAnimation = () => {
  const [step, setStep] = useState(0)
  const [halfStep, setHalfStep] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (step > 6) setStep(0)
      else setStep(step + 1)
      if (halfStep > 7) setHalfStep(0)
      else setHalfStep(halfStep + 0.5)
    }, 800)
  }, [step])

  return (
    <div className="tw-flex tw-flex-col md:tw-grid md:tw-grid-cols-3 tw-my-12">
      <div className="tw-relative tw-w-full">
        <div className="tw-relative tw-h-72 md:tw-h-96 tw-overflow-hidden">
          {slides.map((i) => (
            <div
              key={i}
              className={`tw-duration-700 tw-ease-in-out tw-transition-all ${
                step === i ? 'tw-opacity-1' : 'tw-opacity-0'
              } tw-absolute tw-top-0 tw-text-center tw-w-full`}
            >
              <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-h-72 md:tw-h-96 tw-w-full tw-justify-center">
                {lineDrawings[i]}
              </div>
            </div>
          ))}
        </div>
        <Nr nr={1} />
        <Title txt="Pick Any Design" />
      </div>
      <div className="tw-relative tw-w-full">
        <div className="tw-relative tw-h-72 md:tw-h-96 tw-overflow-hidden">
          {slides.map((i) => (
            <div
              key={i}
              className={`tw-duration-700 tw-ease-in-out tw-transition-all ${
                Math.floor(halfStep) === i ? 'tw-opacity-1' : 'tw-opacity-0'
              } tw-absolute tw-top-0 tw-text-center tw-w-full`}
            >
              <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-h-72 md:tw-h-96 tw-w-full tw-justify-center">
                <img
                  src={`/img/models/model-${i}.png`}
                  className="tw-h-72 md:tw-h-96 tw-shrink-0 tw-px-8"
                />
              </div>
            </div>
          ))}
          <Nr nr={2} />
          <Title txt="Add a set of measurements" />
        </div>
      </div>
      <div className="tw-relative tw-w-full">
        <div className="tw-relative tw-h-96 tw-overflow-hidden">
          <div className="tw-w-full tw-flex tw-flex-row tw-items-center tw-h-72 md:tw-h-96 tw-w-full tw-justify-center">
            <Pattern key={step} i={step} />
          </div>
          <Nr nr={3} />
          <Title txt="Customize your pattern" />
        </div>
      </div>
    </div>
  )
}

const reasonsToJoin = [
  'Generate bespoke sewing patterns.',
  'Store your patterns & measurements sets.',
  'Share your creations with the community.',
  'Open source. No ads. No nonsense.',
]

const lineDrawings = [
  <AaronFront key={1} className="tw-h-72 md:tw-h-96" />,
  <HiFront key={2} className="tw-h-72 md:tw-h-96" />,
  <TeaganFront key={3} className="tw-h-72 md:tw-h-96" />,
  <WahidFront key={4} className="tw-h-72 md:tw-h-96" />,
  <AlbertFront key={5} className="tw-h-72 md:tw-h-96" />,
  <BruceFront key={6} className="tw-h-72 md:tw-h-96" />,
  <SimonFront key={7} className="tw-h-72 md:tw-h-96" />,
  <HortensiaFront key={8} className="tw-h-72 md:tw-h-96" />,
]

const patternTweaks = [
  <path
    key={1}
    d="M 0,121.4 L 0,705.1 L 253.46,705.1 C 253.46,474.02 281.12,307.05 281.12,307.05 C 187.15,307.05 128.12,163.24 163.07,19.43 L 119.46,8.83 C 92.11,121.4 92.11,121.4 0,121.4 z"
  />,
  <path
    key={2}
    d="M 0,121.4 L 0,705.1 L 253.46,705.1 C 253.46,481 279.96,321 279.96,321 C 184.87,321 126.42,170.22 163.07,19.43 L 119.46,8.83 C 92.11,121.4 92.11,121.4 0,121.4 z"
  />,
  <path
    key={3}
    d="M 0,121.4 L 0,705.1 L 253.46,705.1 C 253.46,481 273.47,321 273.47,321 C 181.62,321 126.42,170.22 163.07,19.43 L 119.46,8.83 C 92.11,121.4 92.11,121.4 0,121.4 z"
  />,
  <path
    key={4}
    d="M 0,121.4 L 0,742.92 L 253.46,742.92 C 253.46,481 273.47,321 273.47,321 C 181.62,321 126.42,170.22 163.07,19.43 L 119.46,8.83 C 92.11,121.4 92.11,121.4 0,121.4 z"
  />,
  <path
    key={5}
    d="M 0,121.4 L 0,742.92 L 253.46,742.92 C 253.46,481 273.47,321 273.47,321 C 181.62,321 126.42,170.22 163.07,19.43 L 119.46,8.83 C 95.69,106.65 80.04,121.4 0,121.4 z"
  />,
  <path
    key={6}
    d="M 0,152.02 L 0,742.92 L 253.46,742.92 C 253.46,481 273.47,321 273.47,321 C 181.62,321 126.42,170.22 163.07,19.43 L 119.46,8.83 C 89.22,133.26 73.57,152.02 0,152.02 z"
  />,
  <path
    key={7}
    d="M 0,152.02 L 0,742.92 L 253.46,742.92 C 253.46,481 273.47,321 273.47,321 C 183.55,321 130.16,170.66 166.7,20.31 L 123.1,9.71 C 93.04,133.38 76.92,152.02 0,152.02 z"
  />,
  <path
    key={8}
    d="M 0,152.02 L 0,742.92 L 253.46,742.92 C 253.46,481 273.47,321 273.47,321 C 181.55,321 126.27,170.2 162.92,19.39 L 126.88,10.63 C 97.02,133.5 80.4,152.02 0,152.02 z"
  />,
]

const Pattern = ({ i }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="-300 -20 850 850"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="tw-fill-primary tw-h-72 md:tw-h-96"
    strokeWidth="4"
    fillOpacity="0.25"
  >
    {patternTweaks[i]}
  </svg>
)

const Nr = ({ nr }) => (
  <div className="tw-absolute tw-top-8 tw-w-full tw--ml-20">
    <span className="tw-bg-primary tw-text-primary-content tw-font-bold tw-rounded-full tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-align-center tw-m-auto tw-text-3xl">
      {nr}
    </span>
  </div>
)

const Title = ({ txt }) => {
  const shadow = `var(--ifm-background-color)`

  return (
    <div className="tw-absolute tw-top-28 tw-left-0 tw-w-full">
      <h3
        className="tw-text-2xl tw--rotate-12 tw-w-48 tw-text-center tw-m-auto"
        style={{
          textShadow: `1px 1px 1px   ${shadow}, -1px -1px 1px ${shadow}, -1px 1px 1px  ${shadow}, 1px -1px 1px  ${shadow}`,
        }}
      >
        {txt}
      </h3>
    </div>
  )
}

const slides = [0, 1, 2, 3, 4, 5, 6, 7]

const RecentBlogPosts = () => (
  <div>
    {recentBlogPosts.map((post) => (
      <p key={post.slug}>{post.title}</p>
    ))}
  </div>
)
