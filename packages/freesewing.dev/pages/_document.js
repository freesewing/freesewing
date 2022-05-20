/* This is the recommended way to load a font */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class FsDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default FsDocument
