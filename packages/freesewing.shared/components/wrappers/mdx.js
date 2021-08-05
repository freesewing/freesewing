import { MDXRemote } from 'next-mdx-remote'
import { MDXProvider } from "@mdx-js/react";
import MDX from "@mdx-js/runtime";
import YouTube from "../mdx/youtube"
import Highlight from "../mdx/highlight"
import Popout from '../popout'
import ReadMore from '../navigation/readmore'
import Example from '../core/example'
import { list as designs } from '@freesewing/pattern-info'
import { useRouter } from 'next/router'
import useNavigation from '@/shared/hooks/useNavigation'
// Site config
import config from '@/site/freesewing.config'

const DesignIterator = props => {
  const Component = props.component
  return designs.map(design => <Component design={design} />)
}

const MdxWrapper = props => {
  /*
  const router = useRouter()
  const path = router.asPath
  const locale = router.locale || config.language
  const tree = useNavigation(locale, path)
  const steps = path.slice(1).split('/')
  let branch = {...tree}
  for (const step of steps) branch = tree[step]
  */
  const { t=x=>x } = props
  const { site, page, lang } = props.mdx.scope
  const tree = useNavigation(lang, '/'+page)
  const steps = page.split('/')
  let branch = {...tree}
  for (const step of steps) branch = tree[step]

  const components = {
    Example,
    Hashtag: props => <span className="font-bold bg-neutral px-4 py-1 rounded-full text-accent animate-pulse">#{props.tag}</span>,
    Fixme: props => <Popout {...props} t={t} lang={lang} fixme />,
    Note: props => <Popout {...props} t={t} lang={lang} note />,
    Tip: props => <Popout {...props} t={t} lang={lang} tip />,
    Related: props => <Popout {...props} t={t} lang={lang} related />,
    Link: props => <Popout {...props} t={t} lang={lang} link />,
    Warning: props => <Popout {...props} t={t} lang={lang} warning />,
    YouTube,
    // Tailwind typography plugin overrides
    h5: props => <h5 className="font-bold my-2">{props.children}</h5>,
    h6: props => <h6 className="font-bold my-2 text-sm">{props.children}</h6>,
    pre: props => <Highlight {...props} tag='pre'/>,
    code: props => <Highlight {...props} tag='code'/>,
    DesignIterator,
    ReadMore: mdxProps => <ReadMore {...props} {...mdxProps} path={'/'+page} tree={branch}/>,
  }

  return (
    <MDXRemote
      components={{...components, ...props.components}}
      compiledSource={props.mdx.compiledSource}
    />
  )
}

export default MdxWrapper

