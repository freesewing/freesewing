import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import MeasurementInput from 'shared/components/workbench/inputs/measurement'

const FabricSizer = ({gist, updateGist}) => {
	const { t } = useTranslation(['workbench'])

	const setSize = (size, field) => {
		updateGist(['_state', 'layout', 'forCutting', 'fabric', field], size);
	}

	useEffect(() => {
		if (!gist._state?.layout?.forCutting?.fabric) {
			setSize(1000, 'width')
			setSize(1000, 'height')
		}
	}, [])

	return (
		<div className="my-2 flex flex-row gap-4 justify-center items-center">
      <h3 className="inline pl-2">{t('fabricSize')}</h3>
      {['width', 'height'].map((m) => (
        <MeasurementInput key={'fabric-' + m} m={m} updateMeasurements={setSize} gist={gist} gistMeasurement={gist._state?.layout?.forCutting?.fabric?.[m]} showDoc={false}/>))
    	}
    </div>
	)
}

export default FabricSizer;
