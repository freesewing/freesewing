import PDFDocument from 'pdfkit/js/pdfkit.standalone.js'

/**
 * PdfKit, the library we're using for pdf generation, uses points as a unit,
 * so when we tell it things like where to put the svg and how big the svg is,
 * we need those numbers to be in points. The svg uses mm internally, so when
 * we do spatial reasoning inside the svg, we need to know values in mm
 * */
export const mmToPoints = 2.834645669291339

/**
 * A PDFKit PDF instance
 */
export const Pdf = ({ size, layout }) => {
  const pdf = new PDFDocument({
    size,
    layout,
  })

  /*
   * PdfKit wants to flush the buffer on each new page.
   * We can't save directly from inside a worker, so we have to manage the
   * buffers ourselves so we can return a blob
   */
  const buffers = []

  /*
   * Use a listener to add new data to our buffer storage
   */
  pdf.on('data', buffers.push.bind(buffers))

  /*
   * Convert the pdf to a blob
   */
  pdf.toBlob = function () {
    return new Promise((resolve) => {
      /*
       * We have to do it this way so that the document flushes everything to buffers
       */
      pdf.on('end', () => {
        /*
         * Convert buffers to a blob
         */
        resolve(
          new Blob(buffers, {
            type: 'application/pdf',
          })
        )
      })

      /*
       * End the stream
       */
      pdf.end()
    })
  }

  return pdf
}
