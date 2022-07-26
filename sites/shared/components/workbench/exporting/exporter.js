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

	constructor(designName, pattern, svg, settings) {
		console.log(svg)
		this.designName = designName || 'freesewing'
		this.settings = settings

		let pageWidthInMm = sizes[settings.size][settings.orientation === 'portrait' ? 0 : 1]
		this.pageWidth = pageWidthInMm*pointsPerMm

		let pageHeightInMm = sizes[settings.size][settings.orientation === 'portrait' ? 1 : 0]
	  this.pageHeight = pageHeightInMm*pointsPerMm

	  this.wPages = Math.ceil(pattern.width/pageWidthInMm)
  	this.hPages = Math.ceil(pattern.height/pageHeightInMm)

		const divElem = document.createElement('div');
	  divElem.innerHTML = svg;
	  this.svg = divElem.firstElementChild;
	  this.svg.setAttribute('height', this.hPages * this.pageHeight)
	  this.svg.setAttribute('width', this.wPages * this.pageWidth)
	  this.svg.setAttribute('viewBox', `0 0 ${this.wPages * pageWidthInMm} ${this.hPages * pageHeightInMm}`)

		this.pdf = new jsPDF({orientation: this.settings.orientation === 'portrait' ? 'p' : 'l', unit: 'pt', format: [this.pageWidth, this.pageHeight]})
	}

	async export() {
		await this.generateCoverPage()
		await this.generatePages();
		this.save()
	}

	async generateCoverPage() {
		if (!this.settings.coverPage) {
			this.pdf.deletePage(1)
			return
		}

		let coverMargin = 100
		let coverWidth = this.pageWidth - coverMargin * 2
		let coverHeight = this.pageHeight - coverMargin * 2

		await this.pdf.svg(this.svg, {width: coverWidth, height: coverHeight, x: coverMargin, y: coverMargin})
	}

	async generatePages() {
		const width = this.svg.width.baseVal.value
	  const height = this.svg.height.baseVal.value
	  const margin = this.settings.margin * pointsPerMm
		for (var h = 0; h < this.hPages; h++) {
		  for (var w = 0; w < this.wPages; w++) {
		    this.pdf.addPage()

		    await this.pdf.svg(this.svg, {x: -w * this.pageWidth + (0.5 + w) * margin, y: -h * this.pageHeight + (0.5 + h) * margin, width: width, height: height})
		  }
		}
	}

	save() {
		this.pdf.save(`freesewing-${this.designName}.pdf`)
	}
}
