import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { getMdxStaticProps, getMdxPaths } from '@/shared/content/mdx'
import AppWrapper from '@/shared/components/wrappers/app'
import useNavigation from '@/shared/hooks/useNavigation'
import MdxWrapper from '@/shared/components/wrappers/mdx'
import config from '@/site/freesewing.config'
import Plugin from '@/site/components/mdx/plugin'
import Pattern from '@/site/components/mdx/pattern'
import get from 'lodash.get'

const MdxPage = (props) => {
  const tree = useNavigation(props.mdx.scope.lang)
  const { t } = useTranslation('common')
  const title = get(tree, (props.mdx.scope.page+'/_title').split('/'))

  return (
    <AppWrapper title={props.frontmatter.title || title } t={t}>
      <article className="mdx prose lg:prose-lg mb-12">
        <MdxWrapper
          components={{Pattern, Plugin}}
          mdx={props.mdx}
          t={t}
          page={props.mdx.scope.page}
          tree={tree}
        />
      </article>
    </AppWrapper>
  );
};

export const getStaticProps = async (context) => ({
  props: {
    ...(await getMdxStaticProps(config, context.locale || config.language, context.params.mdx.join('/'))),
    ...(await serverSideTranslations(context.locale || config.language, ['common'])),
  }
})

export const getStaticPaths = async (context) => {
  const basePaths = await getMdxPaths(config)
  const paths = []
  for (const path of basePaths) {
    for (const locale of context.locales) {
      paths.push({params: {mdx: path.split('/')} , locale})
    }
  }

  return { paths, fallback: false }
}

export default MdxPage
