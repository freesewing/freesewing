import { Chevron } from 'shared/components/navigation/primary.mjs'
import {
  ListSetting,
  OnlySetting,
  MmSetting,
  NrSetting,
  BoolSetting,
  SaBoolSetting,
  SaMmSetting,
} from './settings.mjs'
import {
  SecText,
  Li,
  Details,
  Summary,
  SumDiv,
  Deg,
} from 'shared/components/workbench/menus/index.mjs'
import { useTranslation } from 'next-i18next'

const settings = {
  paperless: (props) => <SecText>{props.t(props.gist.paperless ? 'yes' : 'no')}</SecText>,
  complete: (props) => <SecText>{props.t(props.gist.complete ? 'yes' : 'no')}</SecText>,
  debug: (props) => <SecText>{props.t(props.gist.debug ? 'yes' : 'no')}</SecText>,
  locale: (props) => <SecText>{props.t(`i18n:${props.gist.locale}`)}</SecText>,
  units: (props) => <SecText>{props.t(`${props.gist.units}Units`)}</SecText>,
  margin: (props) => <SecText raw={formatMm(props.gist.margin, props.gist.units)} />,
  scale: (props) =>
    props.gist.scale === 1 ? (
      <SecText>{props.gist.scale}</SecText>
    ) : (
      <span className="text-accent">{props.gist.scale}</span>
    ),
  saMm: (props) => <SecText raw={formatMm(props.gist.saMm, props.gist.units)} />,
  renderer: (props) => <SecText>{props.config.titles[props.gist.renderer]}</SecText>,
  only: (props) =>
    props.gist?.only && props.gist.only.length > 0 ? (
      <SecText>{props.gist.only.length}</SecText>
    ) : (
      <span className="text-secondary-focus">{props.t('default')}</span>
    ),
}

const inputs = {
  locale: (props) => (
    <ListSetting
      {...props}
      list={props.config.list.map((key) => ({
        key,
        title: props.t(`i18n:${key}`),
      }))}
    />
  ),
  units: (props) => (
    <ListSetting
      {...props}
      list={props.config.list.map((key) => ({
        key,
        title: props.t(`${key}Units`),
      }))}
    />
  ),
  margin: (props) => <MmSetting {...props} {...props.config} />,
  scale: (props) => <NrSetting {...props} {...props.config} />,
  saMm: (props) => <SaMmSetting {...props} {...props.config} />,
  renderer: (props) => (
    <ListSetting
      {...props}
      list={props.config.list.map((key) => ({
        key,
        title: props.config.titles[key],
      }))}
    />
  ),
  only: (props) => <OnlySetting {...props} />,
}

export const Setting = (props) => {
  const { t } = useTranslation(['app', 'i18n', 'settings'])
  if (props.setting === 'saBool') return <SaBoolSetting {...props} {...props.config} />
  if (['paperless', 'complete', 'debug', 'xray'].indexOf(props.setting) !== -1)
    return <BoolSetting {...props} {...props.config} />

  const Input = inputs[props.setting]
  const Value = settings[props.setting]

  return (
    <Li>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            {props.setting === 'saMm' ? (
              <>
                <span>{t(`settings:sa.t`)}</span>
              </>
            ) : (
              <span>{t(`settings:${props.setting}.t`)}</span>
            )}
          </SumDiv>
          <Value setting={props.setting} {...props} t={t} />
          <Chevron />
        </Summary>
        <Input {...props} t={t} />
      </Details>
    </Li>
  )
}
