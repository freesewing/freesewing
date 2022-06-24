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

// generate the gist state and its handlers
export function useGist(design, app) {
	// get the localstorage state and setter
	const [gist, _setGist, gistReady] = useLocalStorage(`${design.config.name}_gist`, defaultGist(design, app.locale));


	/** apply new gist values onto existing gist */
	const setGist = (newGist) => {
		// setters that are passed a function always use the latest state value, so these don't need to be memoized
		_setGist((gistState) => ({...gistState, ...newGist}))
	}

	/** update a single gist value */
	const updateGist = (path, value) => {
		_setGist((gistState) => {
			const newGist = {...gistState};
			set(newGist, path, value);
			return newGist;
		})
	}

	/** unset a single gist value */
	const unsetGist = (path) => {
    _setGist((gistState) => {
    	const newGist = {... gistState};
    	unset(newGist, path);
    	return newGist;
    })
  }

  /** replace the entire gist with the given gist */
  const replaceGist = (newGist) => {
  	_setGist(newGist);
  }

  /** reset to the default gist */
  const clearGist = () => {
  	replaceGist(defaultGist(design, gist.locale))
  }

  return {gist, setGist, unsetGist, replaceGist, clearGist, gistReady, updateGist};
}
