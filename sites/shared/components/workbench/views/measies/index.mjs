import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { SetPicker, ns as setsNs } from 'shared/components/sets/set-picker.mjs'
import { Tabs, Tab } from 'shared/components/mdx/tabs.mjs'
import { MeasiesEditor } from './editor.mjs'
import { useTranslation } from 'next-i18next'
export const ns = ['wbmeasies', ...authNs, setsNs]

const tabNames = ['editCurrent', 'chooseNew']
export const MeasiesView = ({ design, Design, settings, update }) => {
  const { t } = useTranslation(['wbmeasies'])
  const tabs = tabNames.map((n) => t(n)).join(',')
  return (
    <div className="m-6">
      <h1 className="max-w-6xl m-auto text-center"> {t('changeMeasies')}</h1>
      <Tabs tabs={tabs}>
        <Tab key="edit">
          <MeasiesEditor {...{ Design, settings, update }} />
        </Tab>
        <Tab key="choose">
          <SetPicker design={design} />
        </Tab>
      </Tabs>
    </div>
  )
}
