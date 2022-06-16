import Popout from 'shared/components/popout.js'

const HelpUs = ({ mdx=false, slug='/' }) => (
  <details className="mt-4">
    <summary>Click here to learn how you can help us improve this page</summary>
    {mdx && (
      <Popout tip className='max-w-prose'>
        <h6>Found a mistake?</h6>
        You can <a
          href={`https://github.com/freesewing/freesewing/edit/develop/markdown/dev/${slug}/en.md`}
          className="text-secondary font-bold"
        >edit this page on Github</a> and help us improve our documentation.
      </Popout>
    )}
    <Popout comment by="joost" className='max-w-prose'>
      <h6>Does this look ok?</h6>
      <img
        className="my-4 rounded"
        src={`https://canary.backend.freesewing.org/og-img/en/dev${slug}`}
      />
      <p>
        If it looks ok, great! But if not, please let me know about it.
        Either by <a href="https://discord.freesewing.org/" className="text-secondary">
          reaching out on Discord
        </a> or feel free to <a
          href="https://github.com/freesewing/freesewing/issues/new/choose"
          className="text-secondary"
        >create
        an issue on Github</a>.
      </p>
      <h6>Why do you ask?</h6>
      <p className="text-base">
        I recently added a backend endpoint to auto-generate pretty (I hope) Open Graph images.
        They are those little preview images you see when you paste a link in Discord (for example).
      </p>
      <p className="text-base">
        This idea is that it will auto-generate an image, but I am certain there are some edge cases
        where that will not work.
        There are hundreds of pages on this website and checking them all one by one is not something
        I see myself doing. But since you are here on this page, perhaps you could see if the image
        above looks ok.
      </p>
      <p className="text-base">Thank you, I really appreciate your help with this.</p>
    </Popout>
  </details>
)

export default HelpUs

