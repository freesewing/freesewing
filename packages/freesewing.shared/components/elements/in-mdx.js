// Generates a ReadMore block
export const ReadMore = props => (
  <blockquote>
    <h5>Read More</h5>
    {props.children}
  </blockquote>
)

export const Note = props => (
  <blockquote classname={` `}>
    <h5>Note</h5>
  {props.children}
  </blockquote>
)
export const Tip = () => <p>Tip</p>
export const Example = () => <p>Example</p>

