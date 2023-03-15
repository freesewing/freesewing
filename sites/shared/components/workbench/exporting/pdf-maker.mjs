import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import SVGtoPDF from 'svg-to-pdfkit'
import { logoPath } from 'shared/components/logos/freesewing.mjs'

/** an svg of the logo to put on the cover page */
const logoSvg = `<svg viewBox="0 0 25 25">
	<style> path {fill: none; stroke: #555555; stroke-width: 0.25} </style>
  <path d="${logoPath}" />
</svg>`

/**
 * PdfKit, the library we're using for pdf generation, uses points as a unit, so when we tell it things like where to put the svg and how big the svg is, we need those numbers to be in points
 * The svg uses mm internally, so when we do spatial reasoning inside the svg, we need to know values in mm
 * */
const mmToPoints = 2.834645669291339
const lineStart = 50
/**
 * Freesewing's first explicit class?
 * handles pdf exporting
 */
export class PdfMaker {
  /**	the svg as text to embed in the pdf */
  svg
  /** the document configuration */
  settings
  /** the pdfKit instance that is writing the document */
  pdf
  /** the export buffer to hold pdfKit output */
  buffers
  /** translated strings to add to the cover page */
  strings

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

  constructor({ svg, settings, pages, strings, cutLayouts }) {
    this.settings = settings
    this.pagesWithContent = pages.withContent
    this.svg = svg
    this.strings = strings
    this.cutLayouts = cutLayouts

    this.initPdf()

    this.margin = this.settings.margin * mmToPoints // margin is in mm because it comes from us, so we convert it to points
    this.pageHeight = this.pdf.page.height - this.margin * 2 // this is in points because it comes from pdfKit
    this.pageWidth = this.pdf.page.width - this.margin * 2 // this is in points because it comes from pdfKit

    // get the pages data
    this.columns = pages.cols
    this.rows = pages.rows

    // calculate the width of the svg in points
    this.svgWidth = this.columns * this.pageWidth
    this.svgHeight = this.rows * this.pageHeight
  }

  /** create the pdf document */
  initPdf() {
    // instantiate with the correct size and orientation
    this.pdf = new PDFDocument({
      size: this.settings.size.toUpperCase(),
      layout: this.settings.orientation,
    })

    // PdfKit wants to flush the buffer on each new page.
    // We can't save directly from inside a worker, so we have to manage the buffers ourselves so we can return a blob
    this.buffers = []

    // use a listener to add new data to our buffer storage
    this.pdf.on('data', this.buffers.push.bind(this.buffers))
  }

  /** make the pdf */
  async makePdf() {
    await this.generateCoverPage()
    await this.generateCutLayoutPages()
    await this.generatePages()
  }

  /** convert the pdf to a blob */
  toBlob() {
    return new Promise((resolve) => {
      // have to do it this way so that the document flushes everything to buffers
      this.pdf.on('end', () => {
        // convert buffers to a blob
        resolve(
          new Blob(this.buffers, {
            type: 'application/pdf',
          })
        )
      })

      // end the stream
      this.pdf.end()
    })
  }

  /** generate the cover page for the pdf */
  async generateCoverPage() {
    // don't make one if it's not requested
    if (!this.settings.coverPage) {
      return
    }

    this.nextPage()
    await this.generateCoverPageTitle()
    await this.generateSvgPage(this.svg)
  }

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
    this.pageCount++
  }
  async generateCoverPageTitle() {
    this.addText('FreeSewing', 28)
      .addText(this.strings.tagline, 12, 20)
      .addText(this.strings.design, 48, -8)

    await SVGtoPDF(this.pdf, logoSvg, this.pdf.page.width - lineStart - 100, lineStart, {
      width: 100,
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
    this.addText(this.strings.url, 10)
  }

  async generateCutLayoutTitle(fabricTitle, fabricDimensions) {
    this.addText(this.strings.cuttingLayout, 12, 2).addText(fabricTitle, 28)

    this.pdf.lineWidth(1)
    this.pdf
      .moveTo(lineStart, this.lineLevel)
      .lineTo(this.pdf.page.width - lineStart, this.lineLevel)
      .stroke()

    this.lineLevel += 5
    this.addText(fabricDimensions, 16)
  }

  async generateCutLayoutPages() {
    if (!this.settings.cutlist || !this.cutLayouts) return

    for (const fabric in this.cutLayouts) {
      this.nextPage()
      const { title, dimensions, svg } = this.cutLayouts[fabric]
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

  nextPage() {
    // if no pages have been made, we can use the current
    this.lineLevel = lineStart
    if (this.pageCount === 0) return

    // otherwise make a new page
    this.pdf.addPage()
  }

  addText(text, fontSize, marginBottom = 0) {
    this.pdf.fontSize(fontSize)
    this.pdf.text(text, 50, this.lineLevel)

    this.lineLevel += fontSize + marginBottom
    return this
  }
}
