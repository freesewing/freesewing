import useLocalStorage from './useLocalStorage';
import set from 'lodash.set'
import unset from 'lodash.unset'
import defaultSettings from 'shared/components/workbench/default-settings.js'

// Generates a default design gist to start from
const defaultGist = (design, locale='en') => {
  const gist = {
  design: design.config.name,
  version: design.config.version,
  ...defaultSettings,
  _state: {view: 'draft'}
  }
  if (locale) gist.locale = locale

  return gist
}

export function useGist(design, app) {
	const [gist, _setGist, gistReady] = useLocalStorage(`${design.config.name}_gist`, defaultGist(design, app.locale));


	const setGist = (newGist) => {
		_setGist((gistState) => ({...gistState, ...newGist}))
	}

	const updateGist = (path, value) => {
		_setGist((gistState) => {
			const newGist = {...gistState};
			set(newGist, path, value);
			return newGist;
		})
	}

	const unsetGist = (path) => {
    _setGist((gistState) => {
    	const newGist = {... gistState};
    	unset(newGist, path);
    	return newGist;
    })
  }

  const replaceGist = (newGist) => {
  	_setGist(newGist);
  }

  const clearGist = () => {
  	replaceGist(defaultGist(design, gist.locale))
  }

  return {gist, setGist, unsetGist, replaceGist, clearGist, gistReady, updateGist};
}
