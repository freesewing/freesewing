import Chooser from './index'
import themes from '@/shared/themes'

const ThemeChooser = props => <Chooser {...props} themes={themes} mode='theme' />

export default ThemeChooser
