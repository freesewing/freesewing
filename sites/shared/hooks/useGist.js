import useLocalStorage from './useLocalStorage';
import set from 'lodash.set'
import unset from 'lodash.unset'
import defaultSettings from 'shared/components/workbench/default-settings.js'

// Generates a default design gist to start from
export const defaultGist = (design, locale='en') => {
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
	const [gist, setGist, gistReady] = useLocalStorage(`${design.config.name}_gist`, defaultGist(design, app.locale));

	/** update a single gist value */
	const updateGist = (path, value) => {
		setGist((gistState) => {
			const newGist = {...gistState};
			set(newGist, path, value);
			return newGist;
		})
	}

	/** unset a single gist value */
	const unsetGist = (path) => {
    setGist((gistState) => {
    	const newGist = {... gistState};
    	unset(newGist, path);
    	return newGist;
    })
  }

  return {gist, setGist, unsetGist, gistReady, updateGist};
}
