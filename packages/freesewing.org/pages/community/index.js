import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import contributors from 'site/prebuild/allcontributors.js'
import patrons from 'site/prebuild/patrons.js'
import Worm from 'shared/components/worm.js'

// Keep these translations in the component because they're only used here
const translations = {
  contributors: {
    en: 'FreeSewing is made by these wonderful contributors',
    de: 'FreeSewing wird van diesen wunderbaren Mitwirkende gemacht',
    es: 'FreeSewing es hecho por estas maravillosxs contribuyente',
    fr: 'FreeSewing est fait par ces merveilleux contributeurs',
    nl: 'FreeSewing wordt gemaakt door deze wonderbaarlijke medewerkers',
  },
  patrons: {
    en: 'FreeSewing is supported by these generous patrons',
    de: 'FreeSewing</span> wird von diesen großzügigen Gönnern unterstützt',
    es: 'FreeSewing cuenta con el apoyo de estos generosos patrocinadores',
    fr: 'FreeSewing est soutenu par ces généreux mécènes',
    nl: 'FreeSewing wordt ondersteund door deze gulle patrons',
  },
}

const CommunityPage = (props) => {
  const app = useApp()


  return (
    <Page app={app} title='Community'>
      <div className="max-w-7xl text-base-content text-lg lg:text-xl">

        <h2>{translations.contributors[app.locale]}</h2>
        <div className="p-4 pb-16 flex flex-row -mt-2 z-0 gap-1 lg:gap-2 flex-wrap justify-around lg:px-24">
          <Worm list={contributors.map(item => ({
            img: item.avatar_url,
            title: item.name,
            href: item.profile
          }))} />
        </div>

        <h2>{translations.patrons[app.locale]}</h2>
        <div className="p-4 pb-16 flex flex-row -mt-2 z-0 gap-1 lg:gap-2 flex-wrap justify-around text-neutral-content lg:px-24">
          <Worm list={patrons.map(item => ({
            img: item.img,
            title: item.name,
            slug: `/users/${item.username}`
          }))} />
        </div>
      </div>
    </Page>
  )
}

export default CommunityPage

