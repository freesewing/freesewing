import { useTranslation } from 'next-i18next'
import { configs } from 'shared/designs/index.js'

const Design = ({ design }) => {
  const { t } = useTranslation(['patterns'])
  const {
    code="Anonymous",
    difficulty=3,
  } = configs[design]
  const designer = configs[design].design || "Anonymous"

  return (
    <div className={`
      my-8
      w-96 h-96
      shadow
      p-8
      rounded-lg
      `} style={{
      backgroundImage: `url(/img/designs/${design}.png`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    }}>
      <div className="flex flex-row w-full h-full">
        <div className="h-40 w-20" style={{
          backgroundImage: `url(/img/designs/${design}.jpg`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          backgroundColor: 'red'
        }}>
        </div>
        <h4>{t(`${design}.t`)}</h4>
      <p>{t(`${design}.d`)}</p>
      <p>{designer}</p>
      <p>{code}</p>
      <p>{difficulty}</p>
      </div>
    </div>
  )
}

export default Design
