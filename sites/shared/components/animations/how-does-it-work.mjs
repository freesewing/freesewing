import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { AaronFront, AaronBack } from 'shared/components/designs/linedrawings/aaron.mjs'
import { BruceFront, BruceBack } from 'shared/components/designs/linedrawings/bruce.mjs'
import { SimonFront, SimonBack } from 'shared/components/designs/linedrawings/simon.mjs'
import { WahidFront, WahidBack } from 'shared/components/designs/linedrawings/wahid.mjs'

export const ns = ['homepage']

const lineDrawings = [
  AaronFront,
  AaronBack,
  BruceFront,
  BruceBack,
  SimonFront,
  SimonBack,
  WahidFront,
  WahidBack,
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
    className="fill-primary h-72 md:h-96"
    strokeWidth="4"
    fillOpacity="0.25"
  >
    {patternTweaks[i]}
  </svg>
)

const Nr = ({ nr }) => (
  <div className="absolute top-8 w-full -ml-20">
    <span className="bg-primary text-primary-content font-bold rounded-full w-12 h-12 flex items-center justify-center align-center m-auto text-3xl">
      {nr}
    </span>
  </div>
)

const Title = ({ txt }) => (
  <div className="absolute top-28 left-0 w-full">
    <h3
      className="text-3xl -rotate-12 w-48 text-center m-auto"
      style={{
        textShadow:
          '1px 1px 1px hsl(var(--b1)), -1px -1px 1px hsl(var(--b1)), -1px 1px 1px hsl(var(--b1)), 1px -1px 1px hsl(var(--b1))',
      }}
    >
      {txt}
    </h3>
  </div>
)

const slides = [0, 1, 2, 3, 4, 5, 6, 7]

const useCarousel = (i, items) => {
  const [Item, setItem] = useState(() => items[i])
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setOpacity(0)
    setTimeout(() => {
      setItem(() => items[i])
      setOpacity(100)
    }, 700)
  }, [i, items])

  return { opacity, Item }
}

const transitionClasses = 'duration-700 ease-in-out transition-opacity'
const LineDrawing = ({ i }) => {
  const { Item, opacity } = useCarousel(Math.floor(i / 2), lineDrawings)
  return (
    <div
      className={`${transitionClasses} opacity-${opacity}
     w-full flex flex-row items-center h-full overflow-hidden`}
    >
      <Item className="h-full" />
    </div>
  )
}

const measieImages = slides.map((i) => `/img/models/model-${i}.png`)
const MeasiesImage = ({ i }) => {
  const { Item, opacity } = useCarousel(Math.floor(i), measieImages)
  return <img src={Item} className={`h-72 md:h-96 ${transitionClasses} opacity-${opacity}`} />
}

export const HowDoesItWorkAnimation = () => {
  const { t } = useTranslation(ns)
  const [step, setStep] = useState(0)
  const [halfStep, setHalfStep] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStep((curStep) => {
        if (curStep === patternTweaks.length - 1) return 0
        return curStep + 1
      })

      setHalfStep((curHalf) => {
        if (curHalf > 7) return 0
        return curHalf + 0.5
      })
    }, 4000)

    return () => clearInterval(intervalId)
  })

  return (
    <div className="flex flex-col md:grid md:grid-cols-3">
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <LineDrawing i={step} />
        <Nr nr={1} />
        <Title txt={t('pickAnyDesign')} />
      </div>
      <div className="relative w-full">
        <div className="relative h-72 md:h-96 overflow-hidden">
          <MeasiesImage i={halfStep} />
          <Nr nr={2} />
          <Title txt={t('addASet')} />
        </div>
      </div>
      <div className="relative w-full">
        <div className="relative h-96 overflow-hidden">
          <div className="w-full flex flex-row items-center h-72 md:h-96 w-full justify-center">
            <Pattern i={step} />
          </div>
          <Nr nr={3} />
          <Title txt={t('customizeYourPattern')} />
        </div>
      </div>
    </div>
  )
}
