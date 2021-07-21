//import { getMdxStaticProps, getMdxPaths } from '@/shared/content/mdx'
import AppWrapper from '@/shared/components/wrappers/app'
//import MdxWrapper from '@/shared/components/wrappers/mdx'
//import config from '@/site/freesewing.config'
//import Plugin from '@/site/components/mdx/plugin'
//import Pattern from '@/site/components/mdx/pattern'

const MdxPage = (props) => {
  return (
    <AppWrapper title='test'>
      <article className="mdx prose lg:prose-lg mb-12 m-auto">
        <p>Docs here</p>
      </article>
    </AppWrapper>
  );
};

//export const getStaticProps = async (context) => {
//  const mdx = await getMdxStaticProps(config.site, config.language, context.params.mdx.join('/'))
//
//  return { props: { ...mdx } }
//}
//
//export const getStaticPaths = async () => {
//  const paths = await getMdxPaths(config.site, config.language)
//
//  const re = {
//    paths: paths.map(mdx => ({ params: { mdx: mdx.split('/') } })),
//    fallback: false,
//  }
//
//  return re
//}

export default MdxPage
