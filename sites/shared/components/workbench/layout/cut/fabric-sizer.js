import { useEffect } from 'react'
import MeasurementInput from 'shared/components/workbench/inputs/measurement'

const FabricSizer = ({gist, updateGist}) => {
	const fabricType = gist._state?.layout?.forCutting?.fabricType || 'cut'
	const fabricSettings = gist._state?.layout?.forCutting?.fabric?.[fabricType]

	if (!fabricSettings) {return null}
	const setSize = (size, field) => {
		updateGist(['_state', 'layout', 'forCutting', 'fabric', fabricType, field], size);
	}


	const measurementProps = {
		updateMeasurements: setSize,
		showDoc: false,
		size: 'sm',
		validate: false,
		gist: gist
	}
	return (

      <div className="flex gap-4">
      	{['fabricWidth', 'fabricHeight'].map((m) => (
      	  <MeasurementInput key={'fabric-' + m} m={m} gistMeasurement={gist._state?.layout?.forCutting?.fabric?.[fabricType][m]} {...measurementProps}/>))
      	    	}
      </div>

	)
}

export default FabricSizer;
