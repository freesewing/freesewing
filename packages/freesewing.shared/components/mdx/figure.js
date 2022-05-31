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
          className="m-auto max-h-full max-w-full"
        />
        {title
          ? <figcaption className="text-center italic text-base-content mt-1">{title}</figcaption>
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
