import { Popout } from 'shared/components/popout/index.mjs'

export const HelpUs = ({ slug = '/' }) => (
  <details className="mt-4">
    <summary>Click here to learn how you can help us improve this page</summary>
    <Popout tip className="max-w-prose">
      <h6>Found a mistake?</h6>
      You can{' '}
      <a
        href={`https://github.com/freesewing/freesewing/edit/develop/markdown/dev/${slug}/en.md`}
        className="text-secondary font-bold"
      >
        edit this page on Github
      </a>{' '}
      and help us improve our documentation.
    </Popout>
  </details>
)
