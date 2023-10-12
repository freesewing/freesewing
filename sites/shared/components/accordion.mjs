//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { useState } from 'react'

/*
 * DaisyUI's accordion seems rather unreliable.
 * So instead, we handle this in React state
 */
const getProps = (isActive) => ({
  className: `p-2 px-4 rounded-lg bg-transparent shadow
    w-full mt-2 py-4 h-auto content-start text-left bg-opacity-20
    ${isActive ? 'hover:bg-transparent' : 'hover:bg-secondary hover:bg-opacity-10'}`,
})

const getSubProps = (isActive) => ({
  className: ` p-2 px-4 rounded bg-transparent w-full mt-2 py-4 h-auto
  content-start bg-secondary text-left bg-opacity-20
  ${
    isActive
      ? 'bg-opacity-100 hover:bg-transparent shadow'
      : 'hover:bg-opacity-10 hover:bg-secondary '
  }`,
})

const components = {
  button: (props) => <button {...props}>{props.children}</button>,
  div: (props) => <div {...props}>{props.children}</div>,
}

export const BaseAccordion = ({
  items, // Items in the accordion
  act, // Allows one to preset the active (opened) entry
  propsGetter = getProps, // Method to get the relevant props
  component = 'button',
}) => {
  const [active, setActive] = useState(act)
  const Component = components[component]

  return (
    <nav>
      {items
        .filter((item) => item[0])
        .map((item) =>
          active === item[2] ? (
            <div key={item[2]} {...propsGetter(active === item[2])}>
              <Component onClick={setActive} className="w-full hover:cursor-pointer">
                {item[0]}
              </Component>
              {item[1]}
            </div>
          ) : (
            <Component
              key={item[2]}
              {...propsGetter(active === item[2])}
              onClick={() => setActive(item[2])}
            >
              {item[0]}
            </Component>
          )
        )}
    </nav>
  )
}

export const SubAccordion = (props) => <BaseAccordion {...props} propsGetter={getSubProps} />
export const Accordion = (props) => <BaseAccordion {...props} propsGetter={getProps} />
