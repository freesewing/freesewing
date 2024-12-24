import React from 'react'

/*
 * A component to display a row of data
 */
export const DisplayRow = ({ title, children, keyWidth = 'w-24' }) => (
  <div className="flex flex-row flex-wrap items-center lg:gap-4 my-2 w-full">
    <div className={`${keyWidth} text-left md:text-right block md:inline font-bold pr-4 shrink-0`}>
      {title}
    </div>
    <div className="grow">{children}</div>
  </div>
)

export const welcomeSteps = {
  1: [''],
  2: ['', 'newsletter', 'units'],
  3: ['', 'newsletter', 'units', 'compare', 'username'],
  4: ['', 'newsletter', 'units', 'compare', 'username', 'bio', 'img'],
  5: [''],
}
