import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import fileSaver from 'file-saver'
import YAML from 'yaml'
import Button from '@material-ui/core/Button'
import theme from '@freesewing/plugin-theme'
import { plugin as strings } from '@freesewing/i18n'
import i18n from '@freesewing/plugin-i18n'
import Blockquote from '../../Blockquote'
import Spinner from '../../Spinner'
import Tiler from '@freesewing/utils/tiler'

const Xport = (props) => {
  // State
  const [link, setLink] = useState(false)
  const [loading, setLoading] = useState(false)

  let data = props.gist

  // Remove embed setting
  delete data.settings.embed

  // Methods
  const handleExport = (type, format) => {
    if (type === 'data') {
      if (format === 'json') exportJsonData(data)
      else if (format === 'yaml') exportYamlData(data)
      else if (format === 'github gist') exportGithubGist(data)
    } else {
      if (format !== 'svg') setLoading(true)
      const svg = new props.Pattern(data.settings)
        .use(theme)
        .use(i18n, { strings })
        .draft()
        .render()
      if (type === 'raw') {
        if (format === 'svg') svgToFile(svg)
        else if (format === 'postscript') convert(svg, 'ps', 'full').then((url) => ready(url))
        else if (format === 'pdf') convert(svg, 'pdf', 'full').then((url) => ready(url))
      } else if (type === 'tile') convert(svg, 'pdf', format).then((url) => ready(url))
    }
  }
  const ready = (url) => {
    console.log('Inside ready', url)
    setLink(url)
    setLoading(false)
  }
  const exportJsonData = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json;charset=utf-8'
    })
    fileSaver.saveAs(blob, 'data.json')
  }
  const exportYamlData = (data) => {
    const blob = new Blob([YAML.stringify(data)], {
      type: 'application/x-yaml;charset=utf-8'
    })
    fileSaver.saveAs(blob, 'data.yaml')
  }
  const exportGithubGist = (data) => {
    setLoading(true)
    app.backend
      .createGist({
        data: YAML.stringify(data),
        design: data.design
      })
      .then((res) => ready('https://gist.github.com/' + res.data.id))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const svgToFile = (svg) => {
    const blob = new Blob([svg], {
      type: 'image/svg+xml;charset=utf-8'
    })
    fileSaver.saveAs(blob, 'pattern.svg')
  }
  const tile = (svg, format, size) =>
    new Tiler()
      .tile(svg, format, size)
      .then((res) => {
        if (res.status === 200) return res.data.link
        return false
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  const convert = (svg, format, size = 'full') => tile(svg, format, size)

  // Style
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    column: {
      width: '100%',
      maxWidth: '350px'
    },
    button: {
      margin: '0.5rem',
      width: 'calc(100% - 1rem)'
    },
    blockquote: {
      background: 'red'
    },
    loader: {
      textAlign: 'center',
      margin: 'auto'
    },
    download: {
      textAlign: 'left'
    },
    link: {
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 'bold',
      marginLeft: '2rem'
    }
  }

  const btnProps = {
    size: 'large',
    variant: 'contained',
    color: 'primary',
    style: styles.button
  }

  if (loading) return <Spinner size={200} />

  return (
    <>
      <div style={styles.wrapper}>
        {link ? (
          <div style={styles.download}>
            <Blockquote type="note">
              <h5>Your export is ready</h5>
              <p>You can download your exported pattern from the following link:</p>
              <p style={styles.link}>
                <a href={link} target="_BLANK">
                  {link}
                </a>
              </p>
              <p style={{ textAlign: 'right' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setLink(false)}
                  className="info"
                >
                  <FormattedMessage id="app.back" />
                </Button>
              </p>
            </Blockquote>
          </div>
        ) : (
          <>
            <div style={styles.column} data-test="printing">
              <h5>
                <FormattedMessage id="app.exportForPrinting" />
              </h5>
              {['a4', 'a3', 'a2', 'a1', 'a0', 'letter', 'tabloid'].map((size) => (
                <Button
                  {...btnProps}
                  onClick={() => handleExport('tile', size)}
                  data-test={size}
                  key={size}
                >
                  {size} PDF
                </Button>
              ))}
            </div>
            <div style={styles.column} data-test="editing">
              <h5>
                <FormattedMessage id="app.exportForEditing" />
              </h5>
              {['svg', 'postscript', 'pdf'].map((format) => (
                <Button
                  {...btnProps}
                  onClick={() => handleExport('raw', format)}
                  data-test={format}
                  key={format}
                >
                  {format}
                </Button>
              ))}
              <h5>
                <FormattedMessage id="app.exportAsData" />
              </h5>
              {['json', 'yaml', 'github gist'].map((format) => (
                <Button
                  {...btnProps}
                  onClick={() => handleExport('data', format)}
                  data-test={format}
                  key={format}
                >
                  {format}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Xport
