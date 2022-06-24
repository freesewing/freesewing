const RawSpan = ({ html='' }) => <span
  dangerouslySetInnerHTML={{ __html: html }}
/>

export default RawSpan
