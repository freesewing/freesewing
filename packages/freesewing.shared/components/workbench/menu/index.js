import ModesMenu from './modes.js'
import DesignOptions from './design-options'
import CoreSettings from './core-settings'

const WorkbenchMenu = props => {
  return (
    <nav className="smmax-w-96 grow mb-12">
      <ModesMenu {...props} />
      {props.mode === 'draft' && (
        <>
          <DesignOptions {...props} />
          <CoreSettings {...props} />
        </>
      )}
    </nav>
  )
}

export default WorkbenchMenu
