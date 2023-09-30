import { Popout } from 'shared/components/popout/index.mjs'
import { Lightbox } from 'shared/components/lightbox.mjs'
import { ImageWrapper } from 'shared/components/wrappers/img.mjs'

export const Figure = (props) => {
  const title = props?.title ? props.title : props?.alt ? props.alt : false

  return (
    <figure className="block my-4">
      <Lightbox>
        <ImageWrapper>
          <img src={props?.src} alt={props?.alt || ''} title={title || ''} className="m-auto" />
        </ImageWrapper>
        {title ? (
          <figcaption className="text-center italic mt-1">{title}</figcaption>
        ) : (
          <Popout fixme>
            <h5>This image does not have an alt of title specified</h5>
            <p>Please improve our documentation and fix this.</p>
          </Popout>
        )}
      </Lightbox>
    </figure>
  )
}
