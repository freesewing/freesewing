import AppWrapper from 'shared/components/wrappers/app'
import config from 'site/freesewing.config'
import { getMdxStaticProps } from 'shared/content/mdx'
import MdxWrapper from 'shared/components/wrappers/mdx'

const body = `
### About

Project 2022 is an initiative (started by Joost) to give FreeSewing a new face.
Specifically, the aim is to build new freesewing.dev and freesewing.org websites
that are better/faster/more intuitive than what we currently have.

It's named **2022** to manage expectations for when it will be ready 😄

### Goals

- Switch from GatsbyJS to **NextJS** as our framework
- Reduce build-time and make it easier for changes to be rolled out in production
- Use **TailwindCSS** for styling, and remove \`@freesewing/css-theme\` as a dependency
- Remove the \`@material-ui\` component library as a dependency, and use native elements & CSS where possible to reduce the Javascript bundle size
- Bring the code for both websites into our monorepo &
  enable code sharing between sites without the need to publish NPM packages
- Bring our markdown content into our monorepo
- Bundle all translation into a single translation project on Crowdin
- Provide a better search experience
- Use a headless CMS for blog posts and other content that has little reason to be kept in git &
  limit the size of the monorepo
- Make things pretty and themeable
- Improve support on mobile
- Involve the community to work on some of the pain-points of the current site(s)

### Status

Please check [our new developer blog](/blog) for news and updates.

### Get involved

I would really appreciate your help with this.
It's not every day we overhaul our entire technology stack, so now is the time
to weigh in with your opinions and feedback.

Please [join our Discord server](https://discord.freesewing.org/) and
head over to the \`#project-2022\` channel.
`


const Page = props => {
  return (
    <AppWrapper {...props} title='Project 2022' noCrumbs>
      <div className="prose lg:prose-xl">
        <MdxWrapper>{body}</MdxWrapper>
      </div>
    </AppWrapper>
  )
}

export const getStaticProps = async (props) => {
  const mdx = await getMdxStaticProps(config.site, config.language)

  return { props: { ...mdx } }
}

export default Page
