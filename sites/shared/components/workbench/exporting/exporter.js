import {jsPDF} from 'jspdf'
import 'svg2pdf.js'
import {sizes} from '../layout/print/plugin'

const pointsPerMm = 2.83465;
export default class Exporter {
	designName
	svg
	settings

	pdf
	pageWidth
	pageHeight
	wPages
	hPages

	constructor(designName, designSize, svg, settings) {
		this.designName = designName || 'freesewing'
		// this.svg = svg
		this.settings = settings

		let width = sizes[settings.size][settings.orientation === 'portrait' ? 0 : 1]
		this.pageWidth = width*pointsPerMm
		let height = sizes[settings.size][settings.orientation === 'portrait' ? 1 : 0]
	  this.pageHeight = height*pointsPerMm

		const divElem = document.createElement('div');
	  divElem.innerHTML = svg;

	  this.svg = divElem.firstElementChild;
	  this.wPages = Math.ceil(designSize.width/width)
  	this.hPages = Math.ceil(designSize.height/height)

		// this.pdf = new jsPDF({format: [this.pageWidth, this.pageHeight], orientation: this.settings.orientation === 'portrait' ? 'p' : 'l'})
	  this.svg.setAttribute('height', this.hPages * this.pageHeight)
	  this.svg.setAttribute('width', this.wPages * this.pageWidth)
	  this.svg.setAttribute('viewBox', `0 0 ${this.wPages * width} ${this.hPages * height}`)
		this.svg.getBoundingClientRect() // force layout calculation

		this.pdf = new jsPDF({orientation: this.settings.orientation === 'portrait' ? 'p' : 'l', unit: 'pt', format: [this.pageWidth, this.pageHeight]})

	}

	async export() {
		await this.generateCoverPage()
		await this.generatePages();
	  // const width = this.svg.width.baseVal.value/5
	  // const height = this.svg.height.baseVal.value/5
	  // this.pdf = new jsPDF(width > height ? 'l' : 'p', 'pt', [this.pageWidth, this.pageHeight])

	  // await this.pdf.svg(this.svg, { width, height })
		this.save()
	}

	async generateCoverPage() {
		if (!this.settings.coverPage) {
			this.pdf.deletePage(1)
			return
		}

		let coverMargin = 5
		let coverWidth = this.pageWidth - coverMargin * 2
		let coverHeight = this.pageHeight - coverMargin * 2
		// this.svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
		// this.svg.setAttribute('width', this.pageWidth)
		// this.svg.setAttribute('height', this.pageHeight)
		// this.svg.setAttribute('viewBox', `0 0 ${this.wPages * this.pageWidth} ${this.hPages * this.pageHeight}`)
		// this.svg.getBoundingClientRect() // force layout calculation
		const width = this.svg.width.baseVal.value
	  const height = this.svg.height.baseVal.value
		await this.pdf.svg(this.svg, {width: coverWidth, height: coverHeight, x: coverMargin, y: coverMargin})
	}


	async generatePages() {
		// this.svg.setAttribute('width', this.pageWidth)
		// this.svg.setAttribute('height', this.pageHeight)
		const width = this.svg.width.baseVal.value
	  const height = this.svg.height.baseVal.value
		const pageCount = 0
		const margin = this.settings.margin * pointsPerMm
		for (var h = 0; h < this.hPages; h++) {
		  for (var w = 0; w < this.wPages; w++) {
		  	pageCount++
		    this.pdf.addPage()
		    // this.addPageElements(pageCount, w, h)
		    // this.svg.setAttribute('viewBox', `${w * (this.pageWidth) - this.settings.margin * (0.5 + w)} ${h * (this.pageHeight) - this.settings.margin * (0.5 + h)} ${this.pageWidth} ${this.pageHeight}`)
		    await this.pdf.svg(this.svg, {x: -w * this.pageWidth + (0.5 + w) * margin, y: -h * this.pageHeight + (0.5 + h) * margin, width: width, height: height})
		  }
		}

		console.log(pageCount)
	}


	safeAdd(callback) {
		const currentDrawColor = this.pdf.getDrawColor();
		const currentFontSize = this.pdf.getFontSize()
		const currentTextColor = this.pdf.getTextColor();

		callback();

		this.pdf.setDrawColor(currentDrawColor);
   	this.pdf.setFontSize(currentFontSize);
   	this.pdf.setTextColor(currentTextColor);
	}
	save() {
		this.pdf.save(`freesewing-${this.designName}.pdf`)
	}
}
