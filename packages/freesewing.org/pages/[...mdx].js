import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { getMdxStaticProps, getMdxPaths } from '@/shared/content/mdx'
import AppWrapper from '@/shared/components/wrappers/app'
import MdxWrapper from '@/shared/components/wrappers/mdx'
import config from '@/site/freesewing.config'
import Plugin from '@/site/components/mdx/plugin'
import Pattern from '@/site/components/mdx/pattern'

const MdxPage = (props) => {
  const { t } = useTranslation('common')
  return (
    <AppWrapper title={props.frontmatter.title} t={t}>
      <article className="mdx prose lg:prose-lg mb-12 m-auto">
        <MdxWrapper
          components={{Pattern, Plugin}}
          mdx={props.mdx}
          t={t}
          page={props.mdx.scope.page}
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
