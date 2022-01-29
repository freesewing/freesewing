import ModesMenu from './modes.js'
import DesignOptions from './design-options'
import CoreSettings from './core-settings'
import Xray from './xray'

const WorkbenchMenu = props => {
  return (
    <nav className="smmax-w-96 grow mb-12">
      <ModesMenu {...props} />
      {props.mode === 'draft' && (
        <>
          <DesignOptions {...props} />
          <CoreSettings {...props} />
          {props.gist.renderer === 'react' && <Xray {...props} />}
        </>
      )}
    </nav>
  )
}

export default WorkbenchMenu
