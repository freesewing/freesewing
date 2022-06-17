import themes from 'shared/themes/runtime.js'

const svg = (color, d, shadowShift) => `url('data:image/svg+xml;base64,` +
  Buffer.from(`<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="none"
    viewBox="0 0 10 8"
    width="20"
    height="16"
  >
    <path d="${d}" fill="rgba(0,0,0,0.5)" transform="translate(0 ${shadowShift})" style="filter: blur(1px)" />
    <path d="${d}" fill="${color}" />
  </svg>`
  ).toString('base64') + `')`

const topSvg = (color) => svg(color, "M0,0 L0,2 L 5,7 L 10,2 L10,0 z", 1)
const bottomSvg = (color) => svg(color, "M0,8 L0,6 L 5,1 L 10,6 L10,8 z", -1)
const style = { backgroundRepeat: 'repeat-x' }

const PinkedRibbon = ({ top='base', bottom='dark', loading=false, theme='light' }) => {

  if (top === 'base') top = themes[theme].base
  else if (top === 'dark') top = themes[theme].dark
  if (bottom === 'base') bottom = themes[theme].base
  else if (bottom === 'dark') bottom = themes[theme].dark

  return (
    <div className={`theme-gradient h-14 ${loading ? 'loading' : ''} flex flex-col justify-between p-0`}>
      {top && <div style={{ ...style, backgroundImage: topSvg(top), backgroundPosition: 'top left' }}>&nbsp;</div>}
      {bottom && <div style={{ ...style, backgroundImage: bottomSvg(bottom), backgroundPosition: 'bottom left' }}>&nbsp;</div>}
    </div>
  )
}

export default PinkedRibbon

