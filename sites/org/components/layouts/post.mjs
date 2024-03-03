import { useContext, useState } from 'react'
import { ModalContext } from 'shared/context/modal-context.mjs'
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { cloudflareImageUrl, nsMerge } from 'shared/utils.mjs'
import { authors } from 'site/prebuild/authors.mjs'
// Components
import { MdxWrapper } from 'shared/components/wrappers/mdx.mjs'
import { Lightbox } from 'shared/components/lightbox.mjs'
import { ImageWrapper } from 'shared/components/wrappers/img.mjs'
import { TimeAgo, ns as timeagoNs } from 'shared/components/timeago/index.mjs'
import { useTranslation } from 'next-i18next'
import { Link } from 'shared/components/link.mjs'
import {
  BaseLayout,
  BaseLayoutLeft,
  BaseLayoutProse,
  BaseLayoutRight,
  BaseLayoutWide,
} from 'shared/components/base-layout.mjs'
import {
  NavLinks,
  Breadcrumbs,
  MainSections,
  ns as navNs,
} from 'shared/components/navigation/sitenav.mjs'
import { Toc, ns as tocNs } from 'shared/components/mdx/toc.mjs'
import { PrevNext } from 'shared/components/prev-next.mjs'
import { Tag } from 'shared/components/tag.mjs'
import { UserProfile } from 'shared/components/user-profile.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { MarkdownInput } from 'shared/components/inputs.mjs'
import { userCard } from 'shared/components/support/support.mjs'

export const ns = nsMerge(navNs, tocNs, timeagoNs, 'docs', 'account')

const PostMeta = ({ frontmatter, t }) => (
  <div className="flex flex-row justify-between text-sm mb-1 mt-2">
    <div>
      <TimeAgo date={frontmatter.date} t={t} />
    </div>
    <div>
      {frontmatter.designs?.map((design) => (
        <Tag
          href={`/showcase#filter="${design}"`}
          color="primary"
          hoverColor="secondary"
          key={design}
        >
          {design}
        </Tag>
      ))}
    </div>
    <div>
      By{' '}
      <a href="#author" className="text-secondary hover:text-secondary-focus">
        {authors[frontmatter.author || 1]?.username || '???'}
      </a>
    </div>
  </div>
)

export const PostImage = ({ imgId, frontmatter }) => (
  <figure>
    <Lightbox>
      <ImageWrapper>
        <img
          src={cloudflareImageUrl({ id: imgId })}
          alt={frontmatter.caption}
          className="shadow m-auto"
        />
      </ImageWrapper>
      <figcaption
        className="text-center mb-8 prose m-auto text-sm italic"
        dangerouslySetInnerHTML={{ __html: frontmatter.caption }}
      />
    </Lightbox>
  </figure>
)

const createIssue = async ({ account, setLoadingStatus, title, body, backend, setModal }) => {
  setLoadingStatus([true, 'account:oneMomentPlease'])
  const issueData = {
    title,
    body: account ? `${body}\n\n${userCard(account.id || false)}` : body,
    labels: [':+1: good first issue', 'author claim'],
  }
  const result = await backend.createIssue(issueData)
  if (result.success) {
    setLoadingStatus([true, 'account:nailedIt', true, true])
    setModal(
      <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right" keepOpenOnClick>
        <div className="max-w-prose mdx">
          <h2>Issue created</h2>
          <p>Thank you for helping out.</p>
          <p>
            We <a href={result.data.issue.html_url}>created a new issue for this</a>.
            <br />
            If you would like to help out even more, the issue describes what file to change and
            what change needs to be made.
          </p>
          <p>
            You can do this via the GitHub website, so it is a great way to make a first
            contribution if you are new to open source.
          </p>
        </div>
      </ModalWrapper>
    )
  } else setLoadingStatus([true, 'backendError', true, false])
}

export const PostContent = ({ mdx, dir }) => (
  <div className="strapi prose lg:prose-lg mb-12 m-auto">
    <MdxWrapper mdx={mdx} slug={`blog/${dir}`} />
  </div>
)

const ClaimAuthor = ({ t, type }) => (
  <div className="max-w-prose">
    <h2>{t(`docs:i${type === 'blog' ? 'Wrote' : 'Made'}This`)}</h2>
    <p>Great, but it looks like you are not currently logged in.</p>
    <p>Please log in and then claim this post so we know what account to associate it with.</p>
    <p className="text-center">
      <Link href="/signin" className="btn btn-primary">
        Sign In
      </Link>
    </p>
  </div>
)

const issueData = ({ type, dir, account, body = false }) => ({
  title: body
    ? `An author suggestion was submitted for the ${type} post ${dir}`
    : `The ${type} post ${dir} was claimed as their own by user ${account.id}`,
  body: `This issue is about who should get credit for [this ${type} post](https://freesewing.org/${type}/${dir}).

According to [user ${account.username}](https://freesewing.org/users/user?id=${account.id}) with ID ${account.id},
${body ? 'who wrote:\n\n---\n\n' + body + '\n\n---\n\n' : 'who claimed it as their own'}.

To reflect this on the site, update [this markdown file](https://github.com/freesewing/freesewing/blob/develop/markdown/org/${type}/${dir}/en.md) so that the frontmatter includes this:

\`\`\`md
author: ${body ? 'the FreeSewing user ID' : account.id}
\`\`\`

Anyone can do this, so if you're looking to contribute, this is a great way to get started.`,
})

const SuggestAuthor = ({ t, type, setLoadingStatus, backend, dir, setModal }) => {
  const { account } = useAccount()
  const [body, setBody] = useState('')

  return (
    <>
      <h2>{t(`docs:iKnowWho${type === 'blog' ? 'Wrote' : 'Made'}This`)}</h2>
      <p>Awesome. Please let us know below who it was by providing either:</p>
      <ul className="list list-inside list-disc ml-4">
        <li>
          Their FreeSewing <b>user id</b> (best)
        </li>
        <li>
          Their FreeSewing <b>username</b> (good)
        </li>
        <li>Other info that allows us to figure out who it is</li>
      </ul>
      <MarkdownInput
        id="support-body"
        label={t('support:description')}
        update={setBody}
        current={body}
        valid={(val) => val.length > 10}
      />
      <p>When you are done, click the button below to submit.</p>
      <p className="text-center">
        <button
          className="btn btn-primary w-full"
          onClick={() =>
            createIssue({
              account,
              backend,
              setLoadingStatus,
              setModal,
              ...issueData({ type, dir, account, body }),
            })
          }
        >
          Submit
        </button>
      </p>
    </>
  )
}

const ClaimThisPost = ({ t, type, dir }) => {
  const { setModal } = useContext(ModalContext)
  const { account } = useAccount()
  const backend = useBackend()
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  return (
    <div id="author" className="p-4 border rounded-lg shadow">
      <h3>Claim this post</h3>
      <p>
        This post has not (yet) been associated with a FreeSewing account. Please help us assign
        proper credit:
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          className="btn btn-primary btn-outline"
          onClick={() =>
            setModal(
              <ModalWrapper
                flex="col"
                justify="top lg:justify-center"
                slideFrom="right"
                keepOpenOnClick
              >
                <SuggestAuthor
                  {...{ t, type, setLoadingStatus, dir, account, backend, setModal }}
                />
              </ModalWrapper>
            )
          }
        >
          {t(`docs:iKnowWho${type === 'blog' ? 'Wrote' : 'Made'}This`)}
        </button>
        <button
          className="btn btn-primary"
          onClick={
            account.id
              ? () =>
                  createIssue({
                    account,
                    backend,
                    setLoadingStatus,
                    setModal,
                    ...issueData({ type, dir, account }),
                  })
              : () =>
                  setModal(
                    <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="right">
                      <ClaimAuthor {...{ t, type, setLoadingStatus, dir, backend, setModal }} />
                    </ModalWrapper>
                  )
          }
        >
          {t(`docs:i${type === 'blog' ? 'Wrote' : 'Made'}This`)}
        </button>
      </div>
    </div>
  )
}

const Author = ({ id, type, t, dir }) =>
  authors[id] ? (
    <div id="author" className="p-4 border rounded-lg shadow">
      <h5 className="text-center">{t(`docs:${type === 'blog' ? 'writtenBy' : 'madeBy'}`)}</h5>
      <UserProfile user={authors[id]} />
    </div>
  ) : (
    <ClaimThisPost t={t} type={type} dir={dir} />
  )

/** layout for a page that displays a blog, showcase or newsletter */
export const PostLayout = ({ mdx, frontmatter, type, dir }) => {
  const { t } = useTranslation(ns)

  return (
    <BaseLayout>
      <BaseLayoutLeft>
        <MainSections />
        <NavLinks />
      </BaseLayoutLeft>

      <BaseLayoutWide>
        <div className="w-full max-w-4xl">
          <Breadcrumbs />
          <h1 className="break-words searchme">{frontmatter.title}</h1>
          <PostMeta frontmatter={frontmatter} t={t} />
          {type === 'newsletter' ? null : (
            <PostImage imgId={`${type}-${dir}`} frontmatter={frontmatter} />
          )}
          <div className="block xl:hidden">
            <Toc toc={frontmatter.toc} wrap />
          </div>
        </div>
        <div className="flex flex-row">
          <BaseLayoutProse>
            <article className="mb-12 max-w-7xl">
              <PostContent {...{ mdx }} />
              <Author id={frontmatter.author} type={type} t={t} dir={dir} />
              <PrevNext />
            </article>
          </BaseLayoutProse>
          <BaseLayoutRight>
            <div className="hidden xl:block xl:sticky xl:top-4">
              <Toc toc={frontmatter.toc} wrap />
            </div>
          </BaseLayoutRight>
        </div>
      </BaseLayoutWide>
    </BaseLayout>
  )
}
