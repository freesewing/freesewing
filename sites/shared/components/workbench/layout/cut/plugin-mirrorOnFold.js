const mirrorOnFold = function(part) {
	const {paths, macro, snippets, utils, points} = part.shorthand()
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

		mirrorPoints.push(snip.anchor);
		for (var pName in points) {
			if (points[pName] === snip.anchor){
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

export default {
	name: 'Mirror on Fold',
	version: '1.0.0',
	hooks: {
		postDraft: function(pattern) {
			Object.values(pattern.parts).forEach(part => mirrorOnFold(part))
		},
		postLayout: function(pattern) {
			const cutList = pattern.cutList();
			if (cutList) {
				for (var partName in cutList) {
					const partCuts = cutList[partName]

					if (partCuts.cut > 1 && partCuts.isPair) {
						for (var i = 1; i < partCuts.cut; i+=2) {
							pattern.autoLayout.parts[partName + i].flipX = true
						}
					}
				}
			}
		}
	},
}
