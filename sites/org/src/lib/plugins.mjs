import pluginInfo from '../../../../config/software/plugins.json' with { type: 'json' }

const pluginList = Object.keys(pluginInfo)

export { pluginInfo, pluginList }
