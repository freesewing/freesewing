import { getMdxStaticProps, getMdxPaths } from 'shared/utils/mdx'
import AppWrapper from 'shared/components/wrappers/app'
import MdxWrapper from 'shared/components/wrappers/mdx'
import config from '../freesewing.config'

const Post = (props) => {
  return (
    <AppWrapper {...props}>
      <article className="mdx prose lg:prose-lg mb-12">
        <MdxWrapper>{props.mdx}</MdxWrapper>
      </article>
    </AppWrapper>
  );
};

export const getStaticProps = async (props) => {
  const mdx = await getMdxStaticProps(config.site, config.language, props.params.mdx.join('/'))

  return { props: { ...mdx } }
}

export const getStaticPaths = async () => {
  const paths = await getMdxPaths(config.site, config.language)

  const re = {
    paths: paths.map(mdx => ({ params: { mdx: mdx.split('/') } })),
    fallback: false,
  }

  return re
}

export default Post;
