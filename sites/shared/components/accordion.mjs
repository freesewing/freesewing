import { useState } from 'react'

/*
 * DaisyUI's accordion seems rather unreliable.
 * So instead, we handle this in React state
 */
const getProps = (active, i) => ({
  className: `p-2 px-4 rounded-lg bg-transparent shadow
    w-full mt-2 py-4 h-auto content-start text-left bg-opacity-20
    ${active === i ? 'hover:bg-transparent' : 'hover:bg-secondary hover:bg-opacity-10'}`,
})

const getSubProps = (active, i) => ({
  className: ` p-2 px-4 rounded bg-transparent w-full mt-2 py-4 h-auto
  content-start bg-secondary text-left bg-opacity-20
  ${
    active === i
      ? 'bg-opacity-100 hover:bg-transparent shadow'
      : 'hover:bg-opacity-10 hover:bg-secondary '
  }`,
})

const BaseAccordion = ({
  items, // Items in the accordion
  propsGetter = getProps, // Method to get the relevant props
}) => {
  const [active, setActive] = useState()

  return (
    <nav>
      {items
        .filter((item) => item[0])
        .map((item, i) =>
          active === i ? (
            <div key={i} {...propsGetter(active, i)}>
              <button onClick={setActive} className="w-full">
                {item[0]}
              </button>
              {item[1]}
            </div>
          ) : (
            <button key={i} {...getProps(active, i)} onClick={() => setActive(i)}>
              {item[0]}
            </button>
          )
        )}
    </nav>
  )
}

export const SubAccordion = (props) => <BaseAccordion {...props} propsGetter={getProps} />
export const Accordion = (props) => <BaseAccordion {...props} propsGetter={getSubProps} />
