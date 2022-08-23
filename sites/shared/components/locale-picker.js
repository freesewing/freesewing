import LocaleIcon from 'shared/components/icons/i18n.js'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {Picker, PickerLink} from './picker';

const LocalePicker = ({ app, iconOnly=false }) => {
  const { t } = useTranslation(['locales'])
  const router = useRouter()

  const pickerProps = {
    iconOnly,
    Icon: LocaleIcon,
    title: t(router.locale),
    end: true
  }

  return (
    <Picker {...pickerProps} >
        {router.locales.map(locale => (
          <PickerLink
            locale={locale}
            href={router.asPath}
            key={locale}>
            {t(locale)}
          </PickerLink>
        ))}
    </Picker>
  )
}

export default LocalePicker
