import NextNprogress from 'nextjs-progressbar';
import themes from 'shared/themes'

const ProgressBar= props => {

  let theme

  try {
    theme = localStorage.getItem("theme")
    theme = themes?.[theme]
  }
  catch (err) {
    console.log('No theme set in localstorage')
    console.log('Using default color for progress bar')
  }

  return <NextNprogress
    color={theme?.secondary || themes.light.config.secondary}
    startPosition={0.3}
    stopDelayMs={200}
    height={3}
    showOnShallow={true}
  />
}

export default ProgressBar

