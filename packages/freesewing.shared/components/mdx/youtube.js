const YouTube = (props) => (
  <iframe
    className="w-full aspect-video"
    src={
      props.playlist
        ? `https://www.youtube.com/embed/videoseries?list=${props.id}`
        : `https://www.youtube.com/embed/${props.id}?${props.params || ''}`
    }
    frameBorder="0"
  />
)

export default YouTube

