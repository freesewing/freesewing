import { useState } from 'react'
/*
 * DaisyUI's accordion seems rather unreliable.
 * So instead, we handle this in React state
 */
export const Accordion = ({
  items, // Items in the accordion
}) => {
  const [active, setActive] = useState()

  return (
    <nav>
      {items.map((item, i) => (
        <button
          className={`
            p-2 px-4 rounded-lg bg-transparent shadow
            w-full mt-2 py-4 h-auto content-start text-left bg-opacity-20
            ${active === i ? 'hover:bg-transparent' : 'hover:bg-secondary hover:bg-opacity-10'}
          `}
          onClick={() => setActive(i)}
        >
          {item[0]}
          {active === i ? item[1] : null}
        </button>
      ))}
    </nav>
  )
}

export const SubAccordion = ({
  items, // Items in the accordion
}) => {
  const [active, setActive] = useState()

  return (
    <nav>
      {items.map((item, i) => (
        <button
          className={`
            p-2 px-4 rounded
            bg-transparent
            w-full mt-2 py-4 h-auto content-start bg-secondary
            text-left bg-opacity-20
            ${
              active === i
                ? 'bg-opacity-100 hover:bg-transparent shadow'
                : 'hover:bg-opacity-10 hover:bg-secondary '
            }
          `}
          onClick={() => setActive(i)}
        >
          {item[0]}
          {active === i ? item[1] : null}
        </button>
      ))}
    </nav>
  )
}
