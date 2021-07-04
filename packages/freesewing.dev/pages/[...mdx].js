//import { MDXProvider } from "@mdx-js/react";
import MDX from "@mdx-js/runtime";
import { getMdxStaticProps, getMdxPaths } from 'shared/utils/mdx'
import AppWrapper from 'shared/components/wrappers/app'
import config from '../freesewing.config'

const Post = (props) => {
  return (
    <AppWrapper {...props}>
      <article className="mdx prose lg:prose-xl">
        <MDX>{props.mdx}</MDX>
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
