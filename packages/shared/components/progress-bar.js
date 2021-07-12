import NextNprogress from 'nextjs-progressbar';
import themes from 'shared/themes'

const ProgressBar= props => {

  let theme

  try {
    theme = localStorage.getItem("theme")
    theme = themes?.[theme]
  }
  catch (err) {}

  return <NextNprogress
    color={theme?.secondary || themes.light.config.secondary}
    startPosition={0.3}
    stopDelayMs={200}
    height={3}
    showOnShallow={true}
  />
}

export default ProgressBar

