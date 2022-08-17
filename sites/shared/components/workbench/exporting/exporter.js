import {sizes} from '../layout/print/plugin'
import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import SVGtoPDF from 'svg-to-pdfkit'
import fileSaver from 'file-saver'

const pointsPerPx = (72/96);
const pxPerMm = 3.77953
const pointsPerMm = pxPerMm * pointsPerPx

export default class Exporter {
	designName
	svg
	settings
	pattern

	pdf
	pageWidth
	pageHeight
	margin
	wPages
	hPages
	svgWidth
	svgHeight
	pagesWithContent = {}


	constructor(designName, pattern, svg, settings) {
		this.designName = designName || 'freesewing'
		this.settings = settings
		this.pattern = pattern
		this.createPdf()

	  this.pageHeight = this.pdf.page.height
	  this.pageWidth = this.pdf.page.width
	  this.margin = this.settings.margin * pointsPerMm

		let marginInMm = this.settings.margin
		// let pageWidthInPx = this.pageWidth / pointsPerMm - marginInMm
		// let pageHeightInPx = this.pageHeight / pointsPerMm - marginInMm

		const divElem = document.createElement('div');
	  divElem.innerHTML = svg;
	  this.svg = divElem.firstElementChild;

	  const viewBox = this.svg.viewBox.baseVal
		this.svgWidth = viewBox.width + viewBox.x
		this.svgHeight = viewBox.height + viewBox.y

	  this.wPages = Math.ceil(this.svgWidth/this.pageWidthInPx)
  	this.hPages = Math.ceil(this.svgHeight/this.pageHeightInPx)

	  this.svgWidth = this.wPages * (this.pageWidth - this.margin)
		this.svgHeight = this.hPages * (this.pageHeight - this.margin)

	  this.svg.setAttribute('height', this.svgWidth + 'pt')
	  this.svg.setAttribute('width', this.svgHeight + 'pt')
	  this.svg.setAttribute('viewBox', `0 0 ${this.wPages * this.pageWidthInPx} ${this.hPages * this.pageHeightInPx}`)
	}

	get pageWidthInPx() { return this.pageWidth / pointsPerMm - this.settings.margin}
	get pageHeightInPx() { return this.pageHeight / pointsPerMm - this.settings.margin}


	createPdf() {
		this.pdf = new PDFDocument({
			size: this.settings.size.toUpperCase(),
			layout: this.settings.orientation
		})

		const buffers = [];
		this.pdf.on('data', buffers.push.bind(buffers));
		this.pdf.on('end', () => {
		    const blob = new Blob(buffers, {
		    	type: 'application/pdf'
		    })
			fileSaver.saveAs(blob, `freesewing-${this.designName}.pdf`)
		});
	}

	scanPages() {
		const layout = typeof this.pattern.settings.layout === 'object' ? this.pattern.settings.layout : this.pattern.autoLayout;
		// const usableWidth = this.pageWidth - this.margin
		// const usableHeight = this.pageHeight - this.margin

		for (var h = 0; h < this.hPages; h++) {
			this.pagesWithContent[h] = {}
		  for (var w = 0; w < this.wPages; w++) {
		    let x = w * this.pageWidthInPx
		    let y = h * this.pageHeightInPx

		    let hasContent = false
		    for (var p in layout.parts) {
		    	let part = this.pattern.parts[p]
		    	if (p === 'pages' || part.render === false) continue

		    	let partLayout = layout.parts[p]
		   		let partX = partLayout.move.x + part.topLeft.x
		   		let partY = partLayout.move.y + part.topLeft.y

		    	if (
		    		partX < x + this.pageWidthInPx &&
		    		partX + part.width > x &&
		    		partY < y + this.pageHeightInPx &&
		    		partY + part.height > y
		    		) {
		    		hasContent = true;
		    		break;
		    	}
		    }

		    this.pagesWithContent[h][w] = hasContent
		    if (!hasContent) {
		    	let pageName = `_pages__row${h}-col${w}`
		    	this.removeElem(pageName, 'circle', 'text')
		    	this.removeElem(pageName + '-row-marker', 'text')
		    	this.removeElem(pageName + '-col-marker', 'text')
		    	this.removeElem(pageName + '-x-ruler', 'text')
		    	this.removeElem(pageName + '-y-ruler', 'text')
		    }
		  }
		}
	}

	removeElem(pathId, ...suffixes) {
		const that = this;
		const elem = that.svg.getElementById(pathId)
		if (elem) elem.setAttribute('class', 'hidden')
		suffixes.forEach((s) => that.removeElem(`${pathId}-${s}`))
	}

	async export() {
		this.scanPages()
		await this.generateCoverPage()
		await this.generatePages();
		this.save()
	}

	async generateCoverPage() {
		if (!this.settings.coverPage) {
			return
		}

		let coverMargin = 100

		let coverHeight = this.pageHeight - coverMargin * 2
		let coverWidth = this.pageWidth - coverMargin * 2

		await SVGtoPDF(this.pdf, this.svg.outerHTML, coverMargin, coverMargin, {
			width: coverWidth,
			height: coverHeight,
			assumePt: true,
			preserveAspectRatio: 'xMidYMid meet'
		});
	}

	async generatePages() {
	  const options = {
	  	assumePt: true,
	  	width: this.svgWidth,
	  	height: this.svgHeight,
	  	preserveAspectRatio: 'xMinYMin slice'
	  }

		for (var h = 0; h < this.hPages; h++) {
		  for (var w = 0; w < this.wPages; w++) {
		    let x = -w * this.pageWidth + (0.5 + w) * this.margin
		    let y = -h * this.pageHeight + (0.5 + h) * this.margin

		    if (!this.pagesWithContent[h][w]) continue;
		  	// if there was no cover page, the first page already exists
		    if (this.settings.coverPage || h+w > 0) {
		    	this.pdf.addPage()
		    }


		    await SVGtoPDF(this.pdf, this.svg.outerHTML, x, y, options)
		  }
		}
	}

	save() {
		this.pdf.end();
	}
}
