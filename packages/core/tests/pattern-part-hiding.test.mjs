import chai from 'chai'
import { Design, hidePresets } from '../src/index.mjs'

const expect = chai.expect
function hidePartMatcher(partName) {
  const isHidden = this._obj.__isPartHidden(partName)
  if (!this._obj.config.parts[partName]) {
    throw new chai.AssertionError(`expected part \`${partName}\` to exist in pattern`)
  }
  this.assert(
    isHidden,
    `expected part ${partName} to be hidden, but it is shown`,
    `expected part ${partName} to NOT be hidden, but it is hidden`
  )
}

function hidePartsMatcher(...partNames) {
  const hiddens = partNames.map((n) => {
    if (!this._obj.config.parts[n]) {
      throw new chai.AssertionError(`expected part \`${n}\` to exist in pattern`)
    }
    return this._obj.__isPartHidden(n)
  })

  this.assert(
    hiddens.every((v) => v === true),
    `expected parts [${partNames}] to be hidden, but hide check returns [${hiddens}]`,
    `expected parts [${partNames}] to NOT be hidden, but hide check returns [${hiddens}]`
  )
}

chai.Assertion.addMethod('hidePart', hidePartMatcher)
chai.Assertion.addMethod('hideParts', hidePartsMatcher)

const blankDraft = ({ part }) => part
const blankPart = (name, config = {}) => ({
  name,
  draft: blankDraft,
  ...config,
})

describe('Hiding parts', () => {
  const afterPart = blankPart('afterPart')
  const fromPart = blankPart('fromPart')

  describe('With {hide: {self: true}}', () => {
    const mainPart = {
      name: 'mainPart',
      after: afterPart,
      from: fromPart,
      hide: { self: true },
      draft: blankDraft,
    }

    const Test = new Design({
      name: 'test',
      parts: [mainPart],
    })

    const pattern = new Test()
    pattern.__init()

    it('Should hide the part', () => {
      expect(pattern).to.hidePart('mainPart')
    })

    it("Should NOT hide the part's dependencies", () => {
      expect(pattern).not.to.hidePart('fromPart', 'afterPart')
    })

    describe('Inherited Parts', () => {
      const mainPart = {
        name: 'mainPart',
        after: afterPart,
        from: fromPart,
        draft: blankDraft,
      }
      const grandChild = {
        name: 'grandChild',
        from: mainPart,
        hide: { self: true },
        draft: blankDraft,
      }
      const Test = new Design({
        name: 'test',
        parts: [grandChild],
      })

      const pattern = new Test()
      pattern.__init()

      it('Should NOT hide inherited `from` dependencies', () => {
        expect(pattern).not.to.hideParts('fromPart', 'mainPart')
      })

      it('Should NOT hide inherited `after` dependencies', () => {
        expect(pattern).not.to.hidePart('afterPart')
      })
    })
  })

  describe('With {hide: {from: true}}', () => {
    const mainPart = {
      name: 'mainPart',
      hide: { from: true },
      after: afterPart,
      from: fromPart,
      draft: blankDraft,
    }

    const Test = new Design({
      name: 'test',
      parts: [mainPart],
    })

    const pattern = new Test()
    pattern.__init()

    it('Should NOT hide the part', () => {
      expect(pattern).not.to.hidePart('mainPart')
    })
    it("Should hide the part's `from` dependencies", () => {
      expect(pattern).to.hidePart('fromPart')
    })
    it("Should NOT hide the part's `after` dependencies", () => {
      expect(pattern).not.to.hidePart('afterPart')
    })

    describe('Inherited Parts', () => {
      const mainPart = {
        name: 'mainPart',
        after: afterPart,
        from: fromPart,
        draft: blankDraft,
      }
      const grandChild = {
        name: 'grandChild',
        from: mainPart,
        hide: { from: true },
        draft: blankDraft,
      }
      const Test = new Design({
        name: 'test',
        parts: [grandChild],
      })

      const pattern = new Test()
      pattern.__init()

      it("Should hide the part's `from` dependencies", () => {
        expect(pattern).to.hidePart('mainPart')
      })

      it('Should NOT hide inherited `from` dependencies', () => {
        expect(pattern).not.to.hidePart('fromPart')
      })

      it('Should NOT hide inherited `after` dependencies', () => {
        expect(pattern).not.to.hidePart('afterPart')
      })
    })
  })

  describe('With {hide: {after: true}}', () => {
    const mainPart = {
      name: 'mainPart',
      hide: { after: true },
      after: afterPart,
      from: fromPart,
      draft: blankDraft,
    }
    const Test = new Design({
      name: 'test',
      parts: [mainPart],
    })

    const pattern = new Test()
    pattern.__init()

    it('Should NOT hide the part', () => {
      expect(pattern).not.to.hidePart('mainPart')
    })
    it("Should NOT hide the part's `from` dependencies", () => {
      expect(pattern).not.to.hidePart('fromPart')
    })
    it("Should hide the part's `after` dependencies", () => {
      expect(pattern).to.hidePart('afterPart')
    })

    describe('Inherited Parts', () => {
      const mainPart = {
        name: 'mainPart',
        after: afterPart,
        from: fromPart,
        draft: blankDraft,
      }
      const grandChild = {
        name: 'grandChild',
        from: mainPart,
        hide: { after: true },
        draft: blankDraft,
      }
      const Test = new Design({
        name: 'test',
        parts: [grandChild],
      })

      const pattern = new Test()
      pattern.__init()

      it('Should NOT hide inherited `from` dependencies', () => {
        expect(pattern).not.to.hidePart('fromPart')
      })

      it('Should NOT hide inherited `after` dependencies', () => {
        expect(pattern).not.to.hidePart('afterPart')
      })
    })
  })

  describe('With {hide: {inherited: true}}', () => {
    const grandParent = blankPart('grandParent', { from: fromPart, after: afterPart })
    const parentAfter = blankPart('parentAfter')
    const parent = blankPart('parent', { from: grandParent, after: parentAfter })
    const mainAfterFrom = blankPart('mainAfterFrom')
    const mainAfterAfter = blankPart('mainAfterAfter')
    const mainAfter = blankPart('mainAfter', { after: mainAfterAfter, from: mainAfterFrom })
    const mainPart = {
      name: 'mainPart',
      from: parent,
      after: mainAfter,
      hide: { inherited: true },
      draft: blankDraft,
    }
    const Test = new Design({
      name: 'test',
      parts: [mainPart],
    })

    const pattern = new Test()
    pattern.__init()

    it('Should NOT hide the part', () => {
      expect(pattern).not.to.hidePart('mainPart')
    })

    it('Should NOT hide the `from` dependency', () => {
      expect(pattern).not.to.hidePart('parent')
    })

    it('Should NOT hide the `after` dependency', () => {
      expect(pattern).not.to.hidePart('mainAfter')
    })

    it('Should NOT hide the `after` dependencies of `after` dependencies', () => {
      expect(pattern).not.to.hidePart('mainAfterAfter')
    })

    it('Should hide the `from` dependencies of `after` dependencies', () => {
      expect(pattern).to.hidePart('mainAfterFrom')
    })

    it('Should hide the `after` dependencies of `from` dependencies', () => {
      expect(pattern).to.hideParts('afterPart', 'parentAfter')
    })

    it('Should hide the `from` dependencies of `from` dependencies', () => {
      expect(pattern).to.hideParts('fromPart', 'grandParent')
    })
  })

  describe("With {hide: {always: ['partname']} }", () => {
    it('Should hide the given part', () => {
      const mainPart = blankPart('mainPart', {
        after: afterPart,
        hide: {
          always: ['afterPart'],
        },
      })

      const Test = new Design({
        name: 'test',
        parts: [mainPart],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).to.hidePart('afterPart')
    })

    it("Should NOT hide the given part if a higher-level part includes it in {hide: {never: ['partName']} }", () => {
      const grandParent = blankPart('grandParent')
      const parent = blankPart('parent', {
        from: grandParent,
        hide: { always: ['grandParent'] },
      })
      const main1 = blankPart('main1', {
        from: parent,
        hide: { from: true, never: ['grandParent'] },
      })

      const Test = new Design({
        name: 'test',
        parts: [main1],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).not.to.hidePart('grandParent')
    })
  })

  describe("With {hide: {never: ['partName']} }", () => {
    it('Should NOT hide the given part even if another setting would hide it', () => {
      const parent = blankPart('parent')
      const main1 = blankPart('main1', {
        from: parent,
        hide: { from: true, never: ['parent'] },
      })

      const Test = new Design({
        name: 'test',
        parts: [main1],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).not.to.hidePart('parent')
    })

    it("Should hide the given part if a higher-level part includes it in {hide: {always: ['partName']} }", () => {
      const grandParent = blankPart('grandParent')
      const parent = blankPart('parent', {
        from: grandParent,
        hide: { never: ['grandParent'] },
      })
      const main1 = blankPart('main1', {
        from: parent,
        hide: { from: true, always: ['grandParent'] },
      })

      const Test = new Design({
        name: 'test',
        parts: [main1],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).to.hidePart('grandParent')
    })
  })

  describe('HIDE_ALL', () => {
    const grandParent = blankPart('grandParent')
    const parent = blankPart('parent', {
      from: grandParent,
    })

    it('Should behave like `{self: true, after: true, from: true, inherited: true}`', () => {
      const main1 = blankPart('main1', {
        from: parent,
        after: afterPart,
        hide: hidePresets.HIDE_ALL,
      })

      const Test = new Design({
        name: 'test',
        parts: [main1],
      })
      const pattern = new Test()
      pattern.__init()

      expect(pattern).to.hideParts('grandParent', 'parent', 'main1', 'afterPart')
    })
    it('Should work when passed as a string', () => {
      const main1 = blankPart('main1', {
        from: parent,
        after: afterPart,
        hide: 'HIDE_ALL',
      })

      const Test = new Design({
        name: 'test',
        parts: [main1],
      })
      const pattern = new Test()
      pattern.__init()

      expect(pattern).to.hideParts('grandParent', 'parent', 'main1', 'afterPart')
    })
  })

  describe('HIDE_TREE', () => {
    const grandParent = blankPart('grandParent', { from: fromPart, after: afterPart })
    const parentAfter = blankPart('parentAfter')
    const parent = blankPart('parent', { from: grandParent, after: parentAfter })
    const mainAfterFrom = blankPart('mainAfterFrom')
    const mainAfterAfter = blankPart('mainAfterAfter')
    const mainAfter = blankPart('mainAfter', { after: mainAfterAfter, from: mainAfterFrom })

    it('Should behave like `{from: true, inherited: true}`', () => {
      const mainPart = {
        name: 'mainPart',
        from: parent,
        after: mainAfter,
        hide: hidePresets.HIDE_TREE,
        draft: blankDraft,
      }
      const Test = new Design({
        name: 'test',
        parts: [mainPart],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).to.hideParts(
        'grandParent',
        'fromPart',
        'afterPart',
        'parentAfter',
        `mainAfterFrom`,
        `parent`
      )
      expect(pattern).to.not.hideParts('mainPart', 'mainAfter', 'mainAfterAfter')
    })
    it('Should work when passed as a string', () => {
      const mainPart = {
        name: 'mainPart',
        from: parent,
        after: mainAfter,
        hide: 'HIDE_TREE',
        draft: blankDraft,
      }
      const Test = new Design({
        name: 'test',
        parts: [mainPart],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).to.hideParts(
        'grandParent',
        'fromPart',
        'afterPart',
        'parentAfter',
        `mainAfterFrom`,
        `parent`
      )
      expect(pattern).to.not.hideParts('mainPart', 'mainAfter', 'mainAfterAfter')
    })
  })
  describe('With complex inheritance', () => {
    it('Should use the strictest hiding configuration given by toplevel parts', () => {
      const greatGrandParent = blankPart('greatGrandParent')
      const grandParent = blankPart('grandParent', { from: greatGrandParent })
      const parent = blankPart('parent', { from: grandParent })
      const main1 = blankPart('main1', {
        from: parent,
      })
      const main2 = blankPart('main2', {
        from: parent,
        hide: { from: true, inherited: true },
      })

      const Test = new Design({
        name: 'test',
        parts: [main1, main2],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).to.hideParts('parent', 'grandParent', 'greatGrandParent')
    })
    it('Should use inherited configurations that are not overridden', () => {
      const greatGrandParent = blankPart('greatGrandParent')
      const grandParent = blankPart('grandParent', { from: greatGrandParent })
      const parent = blankPart('parent', {
        from: grandParent,
        hide: { inherited: true },
      })
      const main1 = blankPart('main1', {
        from: parent,
        hide: { from: true },
      })

      const Test = new Design({
        name: 'test',
        parts: [main1],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).to.hidePart('greatGrandParent')
    })
    it('Should override inherited hiding configurations', () => {
      const greatGrandParent = blankPart('greatGrandParent')
      const grandParent = blankPart('grandParent', { from: greatGrandParent })
      const parent = blankPart('parent', {
        from: grandParent,
        hide: { inherited: true },
      })
      const main1 = blankPart('main1', {
        from: parent,
        hide: { from: true, inherited: false },
      })

      const Test = new Design({
        name: 'test',
        parts: [main1],
      })

      const pattern = new Test()
      pattern.__init()

      expect(pattern).not.to.hidePart('greatGrandParent')
    })
  })
})
