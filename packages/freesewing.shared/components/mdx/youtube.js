const YouTube = (props) => {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0,
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={
          props.playlist
            ? `https://www.youtube.com/embed/videoseries?list=${props.id}`
            : `https://www.youtube.com/embed/${props.id}?${props.params || ''}`
        }
        frameBorder="0"
      />
    </div>
  )
}

export default YouTube

