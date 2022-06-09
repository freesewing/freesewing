import Popout from 'shared/components/popout'
import Modal from 'shared/components/modal'

const Figure = props => {

  const title = props?.title
    ? props.title
    : props?.alt
    ? props.alt
    : false

  return (
    <figure className="block my-4">
      <Modal>
        <img
          src={props?.src}
          alt={props?.alt || ''}
          title={title || ''}
          className="m-auto"
          style={{
            maxHeight: "calc(100vh - 6rem)",
            maxWidth: "calc(100vw - 6rem)",
          }}
        />
        {title
          ? <figcaption className="text-center italic mt-1">{title}</figcaption>
          : (
            <Popout fixme>
              <h5>This image does not have an alt of title specified</h5>
              <p>Please improve our documentation and fix this.</p>
            </Popout>
          )
        }
      </Modal>
    </figure>
  )
}

export default Figure
