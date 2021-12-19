const Figure = props => (
  <figure>
    <img src={props?.src} alt={props?.alt || ''} title={props?.title || ''} className="shadow-md"/>
    <figcaption className="text-center italic">{props.title || 'FIXME: No title property set on this image'}</figcaption>
  </figure>
)

export default Figure
