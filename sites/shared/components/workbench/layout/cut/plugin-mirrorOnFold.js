export default {
	name: 'Mirror on Fold',
	version: '1.0.0',
	hooks: {
		postDraft: function(pattern) {
			Object.values(pattern.parts).forEach(part => part.shorthand().macro('mirrorOnFold'))
		}
	},
	macros: {
		mirrorOnFold: function() {
			if (!this.render) return
			const {paths, macro, snippets, utils, points} = this.shorthand()
			if (!paths.cutonfold) return

			const prefix = 'mirroredOnFold';

			const mirror = [paths.cutonfold.start(), paths.cutonfold.end()];
			const mirrorPaths = []
			for (var p in paths) {
				if (p !== 'cutonfold' && !p.startsWith('__')) {mirrorPaths.push(paths[p])}
			}

			const mirrorPoints = []
			const snippetsByType = {}
			for (var s in snippets) {
				const snip = snippets[s]
				if (['logo'].indexOf(snip.def) > -1) continue

				snippetsByType[snip.def] = snippetsByType[snip.def] || []

				for (var pName in points) {
					if (points[pName] === snip.anchor){
						mirrorPoints.push(snip.anchor);
						snippetsByType[snip.def].push(prefix + utils.capitalize(pName))
						break
					}
				}
			}

			macro('mirror', {
				paths: mirrorPaths,
				points: mirrorPoints,
				mirror,
				prefix
			})

			for (var def in snippetsByType) {
				macro('sprinkle', {
					snippet: def,
					on: snippetsByType[def]
				})
			}
		}
	}
}
