import themes from 'shared/themes/index.js'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'shared/hooks/use-theme.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

export const ns = ['themes']

export const ModalThemePicker = ({ app, iconOnly = false, bottom = false }) => {
  const [theme, setTheme] = useTheme()
  const { t } = useTranslation(ns)

  return (
    <ModalWrapper app={app}>
      <div className="grid gap-2 p-4 grid-cols-1 max-w-lg w-full">
        <h2>{t('themes:chooseYourTheme')}</h2>
        {Object.keys(themes).map((theme) => (
          <div className="flex flex-row gap-2" key={theme}>
            <button
              data-theme={theme}
              key={theme}
              onClick={() => setTheme(theme)}
              className="btn btn-lg grow bg-base-100 border border-base-200 border-solid text-base-content hover:bg-primary hover:text-primary-content hover:border-primary shadow hover:shadow-lg"
            >
              {t(`${theme}Theme`)}
              <span className="grow"></span>
              <div className="flex flex-shrink-0 flex-wrap gap-1 items-center">
                {['primary', 'secondary', 'accent', 'neutral'].map((color) => (
                  <div
                    key={color}
                    className={`bg-${color} w-8 h-8 rounded-full border-2 `}
                    key={theme}
                  ></div>
                ))}
              </div>
            </button>
          </div>
        ))}
      </div>
    </ModalWrapper>
  )
}
