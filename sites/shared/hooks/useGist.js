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
  _state: {view: 'measurements'}
  }
  if (locale) gist.locale = locale

  return gist
}

function reducer(gistState, {path, value, type='set'}) {
	const newGist = {... gistState};

	switch(type) {
		case 'replace' :
			return value;
		case 'unset' :
			unset(newGist, path);
			break;
		default:
			set(newGist, path, value);
	}
	return newGist;
}

export function useGist(design, app) {
	return useLocalStorage(`${design.config.name}_gist`, defaultGist(design, app.locale), reducer);
}
