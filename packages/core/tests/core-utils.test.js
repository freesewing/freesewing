const expect = require("chai").expect;
let freesewing = require("../dist/index.js");

describe('Core Utils', () => {
	describe('generatePartTransform', () => {

		const part = {
			topLeft: {x: 2, y: 2},
			bottomRight: {x: 120, y: 35},
			width: 118,
			height: 33
		}

		it ('Should be exported by freesewing', () => {
			expect(freesewing.generatePartTransform).to.be.a('function')
		})

		it ('Should return an empty string if no transforms apply', () => {
			expect(freesewing.generatePartTransform(undefined, undefined, 0, false, false, part).transform).to.equalIgnoreSpaces('')
		})

		it('Should translate the given x and y amount', () => {
			expect(freesewing.generatePartTransform(10, 20, 0, false, false, part).transform).to.equalIgnoreSpaces('translate(10 20)')
		})

		it('Should rotate around the center', () => {
			const partCenterX = part.topLeft.x + part.width/2
			const partCenterY = part.topLeft.y + part.height/2

			expect(freesewing.generatePartTransform(undefined, undefined, 35, false, false, part).transform).to.equalIgnoreSpaces(`rotate(35 ${partCenterX} ${partCenterY})`)
		})

		it('Should only create one scale item regardless of number of flips', () => {
			let transform = freesewing.generatePartTransform(undefined, undefined, 0, true, true, part).transform
			let matches = (transform.match(/scale/g) || []).length
			expect(matches).to.equal(1)

			transform = freesewing.generatePartTransform(undefined, undefined, 0, false, true, part).transform
			matches = (transform.match(/scale/g) || []).length
			expect(matches).to.equal(1)

			transform = freesewing.generatePartTransform(undefined, undefined, 0, true, false, part).transform
			matches = (transform.match(/scale/g) || []).length
			expect(matches).to.equal(1)
		})

		it('Should transform to compensate for flipping in the x direction', () => {
			let transform = freesewing.generatePartTransform(undefined, undefined, 0, true, false, part).transform
			expect(transform).to.equalIgnoreSpaces(`translate(${part.topLeft.x * 2 + part.width} 0) scale(-1 1)`)
		})

		it('Should transform to compensate for flipping in the y direction', () => {
			let transform = freesewing.generatePartTransform(undefined, undefined, 0, false, true, part).transform
			expect(transform).to.equalIgnoreSpaces(`translate(0 ${part.topLeft.y * 2 + part.height}) scale(1 -1)`)
		})

		it('Should combine all translation into a single operation that comes before other transforms', () => {
			let transform = freesewing.generatePartTransform(20, 50, 0, true, true, part).transform
			expect(transform).to.equalIgnoreSpaces(`translate(${part.topLeft.x * 2 + part.width + 20} ${part.topLeft.y * 2 + part.height + 50}) scale(-1 -1)`)
		})
	})
})
