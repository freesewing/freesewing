//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { Pdf, mmToPoints } from './pdf.mjs'
import SVGtoPDF from 'svg-to-pdfkit'
import { logoPath } from '@freesewing/config'

/** an svg of the logo to put on the cover page */
const logoSvg = `<svg viewBox="0 0 25 25">
	<style> path {fill: none; stroke: #555555; stroke-width: 0.25} </style>
  <path d="${logoPath}" />
</svg>`

const lineStart = 50
/**
 * Freesewing's first explicit class?
 * handles pdf exporting
 */
export class PdfMaker {
  /**	the svg as text to embed in the pdf */
  svg
  /** the document configuration */
  pageSettings
  /** the pdfKit instance that is writing the document */
  pdf
  /** the export buffer to hold pdfKit output */
  buffers
  /** translated strings to add to the cover page */
  strings
  /** cutting layout svgs and strings */
  cutLayouts

  /** the usable width (excluding margin) of the pdf page, in points */
  pageWidth
  /** the usable height (excluding margin) of the pdf page, in points */
  pageHeight
  /** the page margin, in points */
  margin
  /** the number of columns of pages in the svg */
  columns
  /** the number of rows of pages in the svg */
  rows

  /** the width of the entire svg, in points */
  svgWidth
  /** the height of the entire svg, in points */
  svgHeight

  pageCount = 0
  lineLevel = 50

  constructor({ svg, pageSettings, pages, strings, cutLayouts }) {
    this.pageSettings = pageSettings
    this.pagesWithContent = pages.withContent
    this.svg = svg
    this.strings = strings
    this.cutLayouts = cutLayouts

    this.pdf = Pdf({
      size: this.pageSettings.size.toUpperCase(),
      layout: this.pageSettings.orientation,
    })

    this.margin = this.pageSettings.margin * mmToPoints // margin is in mm because it comes from us, so we convert it to points
    this.pageHeight = this.pdf.page.height - this.margin * 2 // this is in points because it comes from pdfKit
    this.pageWidth = this.pdf.page.width - this.margin * 2 // this is in points because it comes from pdfKit

    // get the pages data
    this.columns = pages.cols
    this.rows = pages.rows

    // calculate the width of the svg in points
    this.svgWidth = this.columns * this.pageWidth
    this.svgHeight = this.rows * this.pageHeight
  }

  /** make the pdf */
  async makePdf() {
    await this.generateCoverPage()
    await this.generateCutLayoutPages()
    await this.generatePages()
  }

  /** convert the pdf to a blob */
  async toBlob() {
    return this.pdf.toBlob()
  }

  /** generate the cover page for the pdf */
  async generateCoverPage() {
    // don't make one if it's not requested
    if (!this.pageSettings.coverPage) {
      return
    }

    this.nextPage()
    await this.generateCoverPageTitle()
    await this.generateSvgPage(this.svg)
  }

  /** generate a page that has an svg centered in it below any text */
  async generateSvgPage(svg) {
    //abitrary margin for visual space
    let coverMargin = 85
    let coverHeight = this.pdf.page.height - coverMargin * 2 - this.lineLevel
    let coverWidth = this.pdf.page.width - coverMargin * 2

    // add the entire pdf to the page, so that it fills the available space as best it can
    await SVGtoPDF(this.pdf, svg, coverMargin, this.lineLevel + coverMargin, {
      width: coverWidth,
      height: coverHeight,
      assumePt: false,
      // use aspect ratio to center it
      preserveAspectRatio: 'xMidYMid meet',
    })

    // increment page count
    this.pageCount++
  }

  /** generate the title for the cover page */
  async generateCoverPageTitle() {
    // FreeSewing tag
    this.addText('FreeSewing', 20).addText(this.strings.tagline, 10, 4)

    // Design name, version, and Measurement Set
    this.addText(this.strings.design, 32)
    let savedLineLevel = this.lineLevel - 27
    let savedWidth = this.pdf.widthOfString(this.strings.design) + 50
    const versionSetString = ' v' + this.strings.version + ' ( ' + this.strings.setName + ' )'
    this.pdf.fontSize(18)
    this.pdf.text(versionSetString, savedWidth, savedLineLevel)

    // Date and timestamp
    const currentDateTime = new Date().toLocaleString('en', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    })
    this.addText(currentDateTime, 10)

    // Settings YAML
    this.addText('Settings: ', 10)
    savedLineLevel = this.lineLevel - 9
    savedWidth = this.pdf.widthOfString('Settings: ') + 50
    this.pdf.fontSize(6)
    this.pdf.text('(Measurement values are in mm.)', savedWidth, savedLineLevel)
    this.addText(this.strings.yaml, 8)

    // Notes and Warnings
    if (this.strings.notes) {
      this.addText('Notes:', 10).addText(this.strings.notes, 8)
    }
    if (this.strings.warns) {
      this.addText('Warnings:', 10).addText(this.strings.warns, 8)
    }

    await SVGtoPDF(this.pdf, logoSvg, this.pdf.page.width - lineStart - 50, lineStart, {
      width: 50,
      height: this.lineLevel - lineStart,
      preserveAspectRatio: 'xMaxYMin meet',
    })

    this.pdf.lineWidth(1)
    this.pdf
      .moveTo(lineStart, this.lineLevel)
      .lineTo(this.pdf.page.width - lineStart, this.lineLevel)
      .stroke()

    this.lineLevel += 8
    this.pdf.fillColor('#888888')
    /*
     * Don't print URL on pattern. See #5526
     */
    //this.addText(this.strings.url, 10)
  }

  /** generate the title for a cutting layout page */
  async generateCutLayoutTitle(materialTitle, materialDimensions) {
    this.addText(this.strings.cuttingLayout, 12, 2).addText(materialTitle, 28)

    this.pdf.lineWidth(1)
    this.pdf
      .moveTo(lineStart, this.lineLevel)
      .lineTo(this.pdf.page.width - lineStart, this.lineLevel)
      .stroke()

    this.lineLevel += 5
    this.addText(materialDimensions, 16)
  }

  /** generate all cutting layout pages */
  async generateCutLayoutPages() {
    if (!this.pageSettings.cutlist || !this.cutLayouts) return

    for (const material in this.cutLayouts) {
      this.nextPage()
      const { title, dimensions, svg } = this.cutLayouts[material]
      await this.generateCutLayoutTitle(title, dimensions)
      await this.generateSvgPage(svg)
    }
  }

  /** generate the pages of the pdf */
  async generatePages() {
    // pass the same options to the svg converter for each page
    const options = {
      assumePt: true,
      width: this.svgWidth,
      height: this.svgHeight,
      preserveAspectRatio: 'xMinYMin slice',
    }

    // everything is offset by a margin so that it's centered on the page
    const startMargin = this.margin
    for (var h = 0; h < this.rows; h++) {
      for (var w = 0; w < this.columns; w++) {
        // skip empty pages
        if (!this.pagesWithContent[h][w]) continue

        // position it
        let x = -w * this.pageWidth + startMargin
        let y = -h * this.pageHeight + startMargin

        this.nextPage()

        // add the pdf to the page, offset by the page distances
        await SVGtoPDF(this.pdf, this.svg, x, y, options)
        this.pageCount++
      }
    }
  }

  /** Reset to a clean page */
  nextPage() {
    // set the line level back to the top
    this.lineLevel = lineStart

    // if no pages have been made, we can use the current
    if (this.pageCount === 0) return

    // otherwise make a new page
    this.pdf.addPage()
  }

  /**
   * Add Text to the page at the current line level
   * @param {String} text         the text to add
   * @param {Number} fontSize     the size for the text
   * @param {Number} marginBottom additional margin to add below the text
   */
  addText(text, fontSize, marginBottom = 0) {
    this.pdf.fontSize(fontSize)
    this.pdf.text(text, 50, this.lineLevel)

    this.lineLevel += this.pdf.heightOfString(text) + marginBottom

    return this
  }
}
