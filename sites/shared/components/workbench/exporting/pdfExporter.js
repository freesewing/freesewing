import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import SVGtoPDF from 'svg-to-pdfkit'
import fileSaver from 'file-saver'

/**
 * About these numbers, as they are the hardest part of all this:
 * PdfKit, the library we're using for pdf generation, uses points as a unit, so when we tell it things like where to put the svg and how big the svg is, we need those numbers to be in points
 * The svg uses mm internally, so when we do spatial reasoning inside the svg, we need to know values in mm
 * */

// multiply a pixel value by this to get a points value
const pxToPoints = (72/96);
// multiply a mm value by this to get a pixel value
const mmToPx = 3.77953
// multiply a mm value by this to get a points value
// const mmToPoints = mmToPx * pxToPoints
const mmToPoints = 2.834645669291339

/**
 * Freesewing's first explicit class?
 * handles pdf exporting
 */
export default class Exporter {
	/** the name of the design, this is used to title the exported pdf */
	designName
	/**	the svg element to embed in the pdf */
	svg
	/** the document configuration */
	settings
	/** the pattern instance that is being exported */
	pattern
	/** the pdfKit instance that is writing the document */
	pdf
	buffers

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

	/** the width of the svg element, in points */
	svgWidth
	/** the height of the svg element, in points */
	svgHeight

	/** a dictionary to track which pages actually have anything on them */
	pagesWithContent = {}


	constructor({svg, settings, pages}) {
		this.settings = settings
		this.pagesWithContent = pages.withContent;
		this.svg = svg
		this.createPdf()

	  this.margin = this.settings.margin * mmToPoints // margin is in mm because it comes from us, so we convert it to points
	  this.pageHeight = this.pdf.page.height - this.margin * 2 // this is in points because it comes from pdfKit
	  this.pageWidth = this.pdf.page.width - this.margin * 2// this is in points because it comes from pdfKit

	  // get the pages data
	  this.columns = pages.cols
  	this.rows = pages.rows

  	// then set the svg's width and height in points to include all pages in full (the original svg will have been set to show only as much page as is occupied)
	  this.svgWidth = this.columns * pages.width * mmToPoints
		this.svgHeight = this.rows * pages.height * mmToPoints
	}

	/** pdf page usable (excluding margin) width, in mm */
	get pageWidthInMm() { return this.pageWidth / mmToPoints }
	/** pdf page usable (excluding margin) height, in mm */
	get pageHeightInMm() { return this.pageHeight / mmToPoints }


	/** create the pdf document */
	createPdf() {
		// instantiate with the correct size and orientation
		this.pdf = new PDFDocument({
			size: this.settings.size.toUpperCase(),
			layout: this.settings.orientation
		})

		// PdfKit wants to flush the buffer on each new page.
		// We don't want to try to save the document until it's complete, so we have to manage the buffers ourselves
		this.buffers = [];
		// add new data to our buffer storage
		this.pdf.on('data', this.buffers.push.bind(this.buffers));
	}

	/** export to pdf */
	async export(onComplete) {
		// when the end event fires, then we save the whole thing
		this.pdf.on('end', () => {
			// convert buffers to a blob
	    const blob = new Blob(this.buffers, {
	    	type: 'application/pdf'
	    })
	    onComplete(blob)
		});

		await this.generateCoverPage()
		await this.generatePages();
		this.save()
	}

	/** generate the cover page for the pdf */
	async generateCoverPage() {
		// don't make one if it's not requested
		if (!this.settings.coverPage) {
			return
		}

		//abitrary margin for visual space
		let coverMargin = 50

		let coverHeight = this.pageHeight - coverMargin * 2
		let coverWidth = this.pageWidth - coverMargin * 2

		// add the entire pdf to the page, so that it fills the available space as best it can
		await SVGtoPDF(this.pdf, this.svg, coverMargin, coverMargin, {
			width: coverWidth,
			height: coverHeight,
			assumePt: true,
			// use aspect ratio to center it
			preserveAspectRatio: 'xMidYMid meet'
		});
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

	  // everything is offset by half a margin so that it's centered on the page
	  const startMargin = this.margin
		for (var h = 0; h < this.rows; h++) {
		  for (var w = 0; w < this.columns; w++) {
		    // skip empty pages
		    if (!this.pagesWithContent[h][w]) continue;

		  	// position it
		    let x = -w * this.pageWidth + startMargin
		    let y = -h * this.pageHeight + startMargin

		  	// if there was no cover page, the first page already exists
		    if (this.settings.coverPage || h+w > 0) {
		    	// otherwise make a new page
		    	this.pdf.addPage()
		    }

		    // add the pdf to the page, offset by the page distances
		    await SVGtoPDF(this.pdf, this.svg, x, y, options)
		  }
		}
	}

	/** download the pdf */
	save() {
		this.pdf.end();
	}
}
