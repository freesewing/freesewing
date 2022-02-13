import svgattrPlugin from '@freesewing/plugin-svgattr'
import { useTranslation } from 'next-i18next'

const LabSample = ({ gist, draft }) => {
  const { t } = useTranslation(['workbench'])
  let svg
  let title = ''
  if (gist.sample) {
    try {
      draft.use(svgattrPlugin, {
        class: 'freesewing'
      })
      draft.sample()
      svg = draft.render()
    }
    catch(err) {
      console.log(err)
    }
    if (gist.sample.type === 'option') {
      title = t('testThing', {
        thing: ' : ' + t('option') + ' : ' + gist.sample.option
      })
    }
  }

  return (
    <>
      <h2>{title}</h2>
      <div
        className="freesewing pattern"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </>
  )
}

export default LabSample
