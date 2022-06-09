/* Breaks image out of its parent container to fill the screen on mobile */
const ImageWrapper = ({ children }) => (
  <div className="-ml-8 -mr-8 sm:m-0">{children}</div>
)

export default ImageWrapper

