import { languages } from '@freesewing/i18n'
import Chooser from './index'

const LanguageChooser = props => <Chooser {...props} languages={languages} mode='language' />

export default LanguageChooser
