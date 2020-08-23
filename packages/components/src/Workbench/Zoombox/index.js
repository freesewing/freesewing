import React, { useState, useRef, useEffect } from 'react'
import Draft from '../../Draft'
import IconButton from '@material-ui/core/IconButton'
import ZoomIcon from '@material-ui/icons/Cancel'

const Zoombox = (props) => {
  const [from, setFrom] = useState(false)
  const [to, setTo] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [factor, setFactor] = useState(1)
  const [box, setBox] = useState(false)
  const [panning, setPanning] = useState(false)
  const [falseAlarm, setFalseAlarm] = useState(false)
  const [panFrom, setPanFrom] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    let box = ref.current.getBoundingClientRect()
    setBox(box)
    setFactor(props.patternProps.width / box.width)
  }, [])

  const resetZoom = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    setFrom(false)
    setTo(false)
    setDragging(false)
    props.setViewBox(false)
  }
  const startPan = (evt) => {
    if (!dragging && !panning) {
      evt.stopPropagation()
      evt.preventDefault()
      setPanning(true)
      setPanFrom([evt.clientX, evt.clientY])
    }
  }
  const endPan = (evt) => {
    if (!dragging && panning) {
      evt.stopPropagation()
      evt.preventDefault()
      setPanning(false)
      setPanFrom(false)
      updateViewBox()
    }
  }
  const handlePan = (evt) => {
    if (!dragging && panning) {
      evt.stopPropagation()
      evt.preventDefault()
      if (from[0] + (evt.clientX - panFrom[0]) <= -5) {
        // Bump into left
      } else if (from[1] + (evt.clientY - panFrom[1]) <= -5) {
        // Bump into top
      } else if (to[0] + (evt.clientX - panFrom[0]) >= box.width + 5) {
        // Bump into right
      } else if (to[1] + (evt.clientY - panFrom[1]) >= box.height + 5) {
        // Bump into bottom
      } else {
        setPanFrom([evt.clientX, evt.clientY])
        setFrom([from[0] + (evt.clientX - panFrom[0]), from[1] + (evt.clientY - panFrom[1])])
        setTo([to[0] + (evt.clientX - panFrom[0]), to[1] + (evt.clientY - panFrom[1])])
      }
    }
  }
  const handleMouseDown = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    setFrom([evt.clientX - box.x, evt.clientY - box.y])
    setTo([evt.clientX - box.x, evt.clientY - box.y])
    setDragging(1)
    setPanning(false)
  }
  const handleMouseUp = (evt) => {
    if (dragging == 2) {
      updateViewBox()
      if (falseAlarm) setFalseAlarm(false)
    } else {
      setFalseAlarm(true)
      let box = ref.current.getBoundingClientRect()
      setBox(box)
      setFactor(props.patternProps.width / box.width)
    }
    setDragging(false)
    setPanning(false)
    evt.stopPropagation()
    evt.preventDefault()
  }
  const handleMouseMove = (evt) => {
    if (dragging) {
      evt.stopPropagation()
      evt.preventDefault()
      if (dragging === 1) setDragging(2)
      if (falseAlarm) setFalseAlarm(false)
      setTo([evt.clientX - box.x, evt.clientY - box.y])
    }
  }
  const updateViewBox = () => {
    props.setViewBox(
      from[0] * factor +
        ' ' +
        from[1] * factor +
        ' ' +
        (to[0] - from[0]) * factor +
        ' ' +
        (to[1] - from[1]) * factor
    )
  }

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="zoombox"
        ref={ref}
      >
        <Draft {...props.patternProps} />
        <div className="mask" />
        {box && from && to && dragging !== 1 && !falseAlarm && (
          <div
            className={'box' + (dragging ? ' active' : ' inactive')}
            style={{
              // Remove 16px because of the close icon
              width: to[0] - from[0] - 16 + 'px',
              height: to[1] - from[1] - 16 + 'px',
              left: from[0] + 'px',
              top: from[1] + 'px'
            }}
            onMouseDown={startPan}
            onMouseUp={endPan}
            onMouseMove={handlePan}
          >
            {!dragging && (
              <IconButton
                size="small"
                color="primary"
                className="close"
                onMouseDown={resetZoom}
                onMouseUp={resetZoom}
              >
                <ZoomIcon />
              </IconButton>
            )}
          </div>
        )}
      </div>
      <pre>{false && JSON.stringify({ from, to, panFrom }, null, 2)}</pre>
    </>
  )
}

export default Zoombox
