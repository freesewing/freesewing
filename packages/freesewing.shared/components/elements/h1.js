const H1 = props => (
  <h1
    className={`
      text-4xl py-4 font-bold
      lg:text-6xl
    `}
    style={{letterSpacing: '-0.15rem'}}
  >
    {props.children}
  </h1>
)

export default H1
