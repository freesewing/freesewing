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

	pdf
	pageWidth
	pageHeight
	margin
	wPages
	hPages
	svgWidth
	svgHeight


	constructor(designName, pattern, svg, settings) {
		this.designName = designName || 'freesewing'
		this.settings = settings
		this.createPdf()

	  this.pageHeight = this.pdf.page.height
	  this.pageWidth = this.pdf.page.width
	  this.margin = this.settings.margin * pointsPerMm

		let marginInMm = this.settings.margin
		let pageWidthInPx = this.pageWidth / pointsPerMm - marginInMm
		let pageHeightInPx = this.pageHeight / pointsPerMm - marginInMm

		const divElem = document.createElement('div');
	  divElem.innerHTML = svg;
	  this.svg = divElem.firstElementChild;

		this.svgWidth = this.svg.width.baseVal.valueInSpecifiedUnits
		this.svgHeight = this.svg.height.baseVal.valueInSpecifiedUnits

	  this.wPages = Math.ceil(this.svgWidth/pageWidthInPx)
  	this.hPages = Math.ceil(this.svgHeight/pageHeightInPx)

	  this.svgWidth = this.wPages * (this.pageWidth - this.margin)
		this.svgHeight = this.hPages * (this.pageHeight - this.margin)

	  this.svg.setAttribute('height', this.svgWidth + 'pt')
	  this.svg.setAttribute('width', this.svgHeight + 'pt')
	  this.svg.setAttribute('viewBox', `0 0 ${this.wPages * pageWidthInPx} ${this.hPages * pageHeightInPx}`)
	}

	createPdf() {
		this.pdf = new PDFDocument({
			size: this.settings.format,
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

	async export() {
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
		  	// if there was no cover page, the first page already exists
		    if (this.settings.coverPage || h+w > 0) {
		    	this.pdf.addPage()
		    }

		    let x = -w * this.pageWidth + (0.5 + w) * this.margin
		    let y = -h * this.pageHeight + (0.5 + h) * this.margin

		    await SVGtoPDF(this.pdf, this.svg.outerHTML, x, y, options)
		  }
		}
	}

	save() {
		this.pdf.end();
	}
}
