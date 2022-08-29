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
const mmToPoints = mmToPx * pxToPoints

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


	constructor(designName, pattern, svg, settings) {
		// default just in case
		this.designName = designName || 'freesewing'
		this.settings = settings
		this.pattern = pattern

		this.createPdf()

	  this.margin = this.settings.margin * mmToPoints // margin is in mm because it comes from us, so we convert it to points
	  this.pageHeight = this.pdf.page.height - this.margin // this is in points because it comes from pdfKit
	  this.pageWidth = this.pdf.page.width - this.margin// this is in points because it comes from pdfKit

	  // we pass the svg as a string, so we need to make it a DOM element so we can manipulate it
		const divElem = document.createElement('div');
	  divElem.innerHTML = svg;
	  this.svg = divElem.firstElementChild;

	  // get the pages data
	  const pages = this.pattern.parts.pages.pages
	  this.columns = pages.cols
  	this.rows = pages.rows

  	// then set the svg's width and height in points to include all pages in full (the original svg will have been set to show only as much page as is occupied)
	  this.svgWidth = this.columns * this.pageWidth
		this.svgHeight = this.rows * this.pageHeight
	  this.svg.setAttribute('height', this.svgWidth + 'pt')
	  this.svg.setAttribute('width', this.svgHeight + 'pt')

	  // set the viewbox to include all pages in full as well, this time in mm
	  this.svg.setAttribute('viewBox', `0 0 ${this.columns * this.pageWidthInMm} ${this.rows * this.pageHeightInMm}`)
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
		const buffers = [];
		// add new data to our buffer storage
		this.pdf.on('data', buffers.push.bind(buffers));
		// when the end event fires, then we save the whole thing
		this.pdf.on('end', () => {
			// convert buffers to a blob
	    const blob = new Blob(buffers, {
	    	type: 'application/pdf'
	    })
	    // save the blob
			fileSaver.saveAs(blob, `freesewing-${this.designName}.pdf`)
		});
	}

	/**
	 * Scan all the pages and remove ones that have no content.
	 * Because we are rendering a grid of pages that fits the layout, some might not actually have anything on them.
	 * We do not want to user to have to figure out which pages to print and which to skip, so we have to identify these pages
	 * */
	scanPages() {
		// get the layout from the pattern
		const layout = typeof this.pattern.settings.layout === 'object' ? this.pattern.settings.layout : this.pattern.autoLayout;

		// go through all the rows
		for (var h = 0; h < this.rows; h++) {
			// make a storage for this row's pages
			this.pagesWithContent[h] = {}
		  for (var w = 0; w < this.columns; w++) {
		  	// topLeft corner to the current page
		    let x = w * this.pageWidthInMm
		    let y = h * this.pageHeightInMm

		    // assume no content
		    let hasContent = false
		    // look through all the parts
		    for (var p in layout.parts) {
		    	let part = this.pattern.parts[p]
		    	// skip the pages part and any that aren't rendered
		    	if (p === 'pages' || part.render === false || part.isEmpty()) continue

		    	// get the position of the part
		    	let partLayout = layout.parts[p]
		   		let partMinX = (partLayout.tl?.x || (partLayout.move.x + part.topLeft.x))
		   		let partMinY = (partLayout.tl?.y || (partLayout.move.y + part.topLeft.y))
		   		let partMaxX = (partLayout.br?.x || (partMinX + part.width))
		   		let partMaxY = (partLayout.br?.y || (partMinY + part.height))

		   		// check if the part overlaps the page extents
		    	if (
		    		// if the left of the part is further left than the right end of the page
		    		partMinX < x + this.pageWidthInMm &&
		    		// and the top of the part is above the bottom of the page
		    		partMinY < y + this.pageHeightInMm &&
		    		// and the right of the part is further right than the left of the page
		    		partMaxX > x &&
		    		// and the bottom of the part is below the top to the page
		    		partMaxY > y
		    		) {
		    		// the part has content inside the page
		    		hasContent = true;
		    		// so we stop looking
		    		break;
		    	}
		    }

		    // save the outcome because we will need it later
		    this.pagesWithContent[h][w] = hasContent

		    // if the page has no content, hide its various markers
		    if (!hasContent) {
		    	let pageName = `_pages__row${h}-col${w}`
		    	this.hideElem(pageName, 'circle', 'text')
		    	this.hideElem(pageName + '-row-marker', 'text')
		    	this.hideElem(pageName + '-col-marker', 'text')
		    	this.hideElem(pageName + '-x-ruler', 'text')
		    	this.hideElem(pageName + '-y-ruler', 'text')
		    }
		  }
		}
	}

	/**
	 * hide an element with the given id
	 * id: the string ID of the element to hide
	 * suffixes: additional strings to add to the end of the id like `${id}-${suffix}`, to hide related elements
	 * */
	hideElem(id, ...suffixes) {
		// keep a clean reference
		const that = this;
		// find the element
		const elem = that.svg.getElementById(id)
		// if it exists, change the class to hidden
		if (elem) elem.setAttribute('class', 'hidden')
		// do the same with the suffixes
		suffixes.forEach((s) => that.hideElem(`${id}-${s}`))
	}

	/** export to pdf */
	async export() {
		this.scanPages()
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
		await SVGtoPDF(this.pdf, this.svg.outerHTML, coverMargin, coverMargin, {
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
	  	preserveAspectRatio: 'xMinYMin slice'
	  }

	  // everything is offset by half a margin so that it's centered on the page
	  const startMargin = 0.5 * this.margin
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
		    await SVGtoPDF(this.pdf, this.svg.outerHTML, x, y, options)
		  }
		}
	}

	/** download the pdf */
	save() {
		this.pdf.end();
	}
}
