import { useEffect } from 'react'
import MeasurementInput from 'shared/components/workbench/inputs/measurement'

const FabricSizer = ({gist, updateGist}) => {
	const setSize = (size, field) => {
		updateGist(['_state', 'layout', 'forCutting', 'fabric', field], size);
	}

	useEffect(() => {
		if (!gist._state?.layout?.forCutting?.fabric) {
			// #FIXME set in the current units
			setSize(1000, 'fabricWidth')
			setSize(1000, 'fabricHeight')
		}
	}, [])

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
      	  <MeasurementInput key={'fabric-' + m} m={m} gistMeasurement={gist._state?.layout?.forCutting?.fabric?.[m]} {...measurementProps}/>))
      	    	}
      </div>

	)
}

export default FabricSizer;
