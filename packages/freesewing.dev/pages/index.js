import Page from 'shared/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Logo from 'shared/components/logos/freesewing.js'
import Popout from 'shared/components/popout.js'

export default (props) => {
  const app = useApp()
  return (
    <Page app={app} >

      <Popout fixme>
        Create a homepage
      </Popout>


      <div className="bg-cover bg-neutral w-full bg-center rounded-lg shadow p-4 "
        style={{backgroundImage: "url(/support.jpg)"}}
      >
        <h2 className="text-neutral-content p-4 text-4xl font-bold sm:font-light sm:text-6xl drop-shadow">Support FreeSewing</h2>
        <p className="text-neutral-content p-4 font-bold max-w-md text-lg">
          FreeSewing is fuelled by a voluntary subscription model
        </p>
        <p className="text-neutral-content p-4 font-bold max-w-md text-lg">
          If you think what we do is worthwhile,
          and if you can spare a few coins each month without hardship,
          please support our work
        </p>
        <a role="button" className="btn btn-accent btn-wide ml-4 mb-8" href="https://freesewing.org/patrons/join">Become a Patron</a>
      </div>
      <p className="w-full"></p>
    </Page>
  )
}

