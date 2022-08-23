import themes from 'shared/themes/index.js'
import ThemeIcon from 'shared/components/icons/theme.js'
import { useTranslation } from 'next-i18next'
import {Picker, PickerButton} from './picker';

const ThemePicker = ({ app, className, iconOnly=false }) => {
  const { t } = useTranslation(['themes'])

  const items = {};
  for (var k in themes){
    items[k] = {...themes[k], key: k}
  }

  const pickerProps = {
    className,
    iconOnly,
    Icon: ThemeIcon,
    title: t(`${app.theme}Theme`),
    ariaLabel: t('themesPicker'),
    end: true
  }
  return (<Picker {...pickerProps}>
    {Object.keys(themes).map(theme => (
      <PickerButton onClick={() =>
      app.setTheme(theme)} key={theme}>
        {t(`${theme}Theme`)}
      </PickerButton>
    ))}
  </Picker>)
}

export default ThemePicker
