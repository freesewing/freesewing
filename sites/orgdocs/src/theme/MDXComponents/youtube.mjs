import React from 'react'
export const YouTube = (props) => (
  <iframe
    style={{ width: '100%', aspectRatio: '16/9' }}
    src={
      props.playlist
        ? `https://www.youtube.com/embed/videoseries?list=${props.id}`
        : `https://www.youtube.com/embed/${props.id}?${props.params || ''}`
    }
    frameBorder="0"
  />
)
