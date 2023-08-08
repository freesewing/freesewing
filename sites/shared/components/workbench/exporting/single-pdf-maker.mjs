import { Pdf, mmToPoints } from './pdf.mjs'
import SVGtoPDF from 'svg-to-pdfkit'

/**
 * Basic exporter for a single-page pdf containing the rendered pattern.
 * This generates a PDF that is the size of the pattern and has no additional frills*/
export class SinglePdfMaker {
  pdf
  svg

  constructor({ svg, pageSettings }) {
    this.pdf = Pdf({ size: pageSettings.size.map((s) => s * mmToPoints) })
    this.svg = svg
  }

  async makePdf() {
    await SVGtoPDF(this.pdf, this.svg)
  }

  async toBlob() {
    return this.pdf.toBlob()
  }
}
