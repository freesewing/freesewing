// Dependencies
import { nsMerge, capitalize, cloudflareImageUrl, yyyymmdd } from 'shared/utils.mjs'
// Hooks
import { useState, useContext, Fragment } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { Popout } from 'shared/components/popout/index.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { DesignPicker } from './design-picker.mjs'
import {
  AuthorInput,
  TitleInput,
  SlugInput,
  ImageInput,
  CaptionInput,
  IntroInput,
  BodyInput,
} from './inputs.mjs'
import { Tab } from 'shared/components/account/bio.mjs'
import { CodeBox } from 'shared/components/code-box.mjs'
import { PageLink, WebLink } from 'shared/components/link.mjs'
import { OkIcon, WarningIcon as KoIcon } from 'shared/components/icons.mjs'
import { PostImage } from 'site/components/layouts/post.mjs'
import { Mdx } from 'shared/components/mdx/dynamic.mjs'

export const ns = nsMerge('account', 'posts', authNs)

const Tip = ({ children }) => <p className="italic opacity-70">{children}</p>

const Item = ({ title, children }) => (
  <div className="collapse collapse-arrow bg-base-100 hover:bg-secondary hover:bg-opacity-20">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title text-xl font-medium">{title}</div>
    <div className="collapse-content bg-base-100 hover:bg-base-100">{children}</div>
  </div>
)

const dataAsMd = ({ title, author, caption, intro, designs, body }, type) => {
  let md = `---
title: "${title}"
caption: "${caption}"
date: ${yyyymmdd()}
intro: "${intro}"
author: ${author}`
  if (type === 'showcase')
    md += `
designs: [${designs.map((design) => `"${design}"`).join(', ')}]`
  md += `
---

${body}

`

  return md
}

export const CreatePost = ({ type = 'showcase' }) => {
  // Hooks
  const backend = useBackend()
  const { account } = useAccount()
  const { t, i18n } = useTranslation(ns)
  const { loading, setLoadingStatus } = useContext(LoadingStatusContext)

  // State
  const [author, setAuthor] = useState(null)
  const [designs, setDesigns] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState(false)
  const [slugAvailable, setSlugAvailable] = useState(true)
  const [img, setImg] = useState(false)
  const [caption, setCaption] = useState('')
  const [intro, setIntro] = useState('')
  const [body, setBody] = useState('')
  const [extraImages, setExtraImages] = useState({})
  const [activeTab, setActiveTab] = useState('create')
  const [pr, setPr] = useState(false)

  // Method that submits the post to the backend
  const submitPost = async () => {
    setLoadingStatus([true, `Creating ${type} post & pull request`])
    const result = await backend.createPost(type, {
      markdown: dataAsMd(
        {
          title,
          author,
          caption,
          intro,
          designs,
          body,
        },
        type
      ),
      slug,
      language: i18n.language,
    })
    if (result.success) setPr(result.data)
    setLoadingStatus([false])
  }

  // Shared props for tabs
  const tabProps = { activeTab, setActiveTab, t }

  const addImage = () => {
    const id = Object.keys(extraImages).length + 1
    const newImages = { ...extraImages }
    newImages[id] = null
    setExtraImages(newImages)
  }

  const verifySlug = async (newSlug) => {
    setSlug(newSlug)
    const result = await backend.isSlugAvailable({ slug: newSlug, type })
    setSlugAvailable(result.available === true ? true : false)
  }

  const setExtraImg = (key, img) => {
    const newImages = { ...extraImages }
    newImages[key] = img
    setExtraImages(newImages)
  }

  const childProps = {
    type,
    author,
    setAuthor,
    designs,
    setDesigns,
    title,
    setTitle,
    slug,
    img,
    setImg,
    caption,
    setCaption,
    intro,
    setIntro,
    body,
    setBody,
    extraImages,
    setExtraImages,
    addImage,
    setExtraImg,
    account,
    t,
    verifySlug,
    slugAvailable,
  }

  return (
    <AuthWrapper>
      {pr ? (
        <div className="w-full max-w-3xl m-auto p-4">
          <h1>Thank you for submitting this {type} post</h1>
          <p>Here is what happened while you were waiting:</p>
          <ul className="list list-inside list-disc ml-4">
            <li>
              We created a new branch:{' '}
              <b>
                <WebLink
                  href={`https://github.com/freesewing/freesewing/tree/${type}-${slug}`}
                  txt={`${type}-${slug}`}
                />
              </b>
            </li>
            <li>
              We committed your work:{' '}
              <b>
                <WebLink href={pr.file.commit.html_url} txt={pr.file.commit.sha} />
              </b>
            </li>
            <li>
              We created a pull request:{' '}
              <b>
                <WebLink
                  href={pr.pr.html_url}
                  txt={`github.com/freesewing/freesewing/pull/${pr.pr.number}`}
                />
              </b>
            </li>
          </ul>
          <p>Next steps:</p>
          <ul className="list list-inside list-disc ml-4">
            <li>
              <b>Joost will review</b> the pull request to make sure everything is ok
            </li>
            <li>
              If everything looks fine, <b>they will merge it</b>.
            </li>
            <li>
              This will trigger a <b>preview build of the website</b>
            </li>
            <li>
              If that goes without any hiccups, this preview build will be{' '}
              <b>deployed in production</b>.
            </li>
            <li>
              When that happens, <b>your post will go live</b> at:{' '}
              <WebLink
                href={`https://freesewing.org/${type}/${slug}/`}
                txt={`freesewing.org/${type}/${slug}`}
              />
            </li>
          </ul>
          <p className="text-xl font-bold mt-6">
            To summarize: You did great <span role="img">💜</span> and we&apos;ll take it from here{' '}
            <span role="img">🙌</span>
          </p>
          <button className="btn btn-primary btn-outline mt-4" onClick={() => setPr(false)}>
            Back
          </button>
        </div>
      ) : (
        <>
          <div className="hidden md:grid md:grid-cols-2 md:gap-4">
            <div className="p-4 shadow rounded-lg my-8">
              <PostEditor {...childProps} />
            </div>
            <div className="p-4 shadow rounded-lg my-8">
              <PostPreview {...childProps} />
            </div>
          </div>
          <div className="block md:hidden px-4">
            <div className="tabs w-full">
              <Tab id="create" {...tabProps} />
              <Tab id="preview" {...tabProps} />
            </div>
            {activeTab === 'create' ? (
              <PostEditor {...childProps} />
            ) : (
              <PostPreview {...childProps} />
            )}
          </div>
          <div className="px-4 max-w-lg m-auto my-8 text-center">
            {!(title && slug && img && (type === 'blog' || designs.length > 0)) && (
              <Popout note>
                <h5 className="text-left">You are missing the following:</h5>
                <ul className="text-left list list-inside list-disc ml-4">
                  {type === 'showcase' && designs.length < 1 && <li>Design</li>}
                  {!title && <li>Title</li>}
                  {!slug && <li>Slug</li>}
                  {!img && <li>Main Image</li>}
                </ul>
              </Popout>
            )}
            <button
              className="btn btn-lg btn-primary capitalize"
              disabled={
                loading || !(title && slug && img && (type === 'blog' || designs.length > 0))
              }
              onClick={submitPost}
            >
              Submit {type} Post
            </button>
            {!account.data?.githubUser && !account.data?.githubEmail && (
              <Popout tip>
                <h5 className="text-left">
                  <small>Optional:</small> Are you on GitHub?
                </h5>
                <p className="text-left">
                  If you configure your GitHub username{' '}
                  <PageLink href="/account/github" txt="in your account" />, we will credit these
                  changes to you.
                </p>
              </Popout>
            )}
          </div>
        </>
      )}
    </AuthWrapper>
  )
}

const PostPreview = ({ title, img, caption, body }) => (
  <>
    <h1>{title}</h1>
    <PostImage imgId={img} frontmatter={{ caption }} />
    <Mdx md={body} />
  </>
)

const PostEditor = ({
  type,
  author,
  setAuthor,
  designs,
  setDesigns,
  title,
  setTitle,
  slug,
  verifySlug,
  slugAvailable,
  img,
  setImg,
  caption,
  setCaption,
  intro,
  setIntro,
  body,
  setBody,
  extraImages,
  addImage,
  setExtraImg,
  t,
}) => (
  <>
    <h2>Create a new {type} post</h2>
    <Tip>{t(`${type}NewInfo`)}</Tip>
    {type === 'showcase' && (
      <Item
        title={
          <div className="flex flex-row gap-2 items-center">
            {author ? (
              <OkIcon stroke={4} className="w-5 h-5 text-success" />
            ) : (
              <KoIcon stroke={3} className="w-5 h-5 text-error" />
            )}
            <b>Maker/Author:</b>
            {author ? (
              <span className="text-base">{author}</span>
            ) : (
              <span className="text-error text-base">
                If you know the user ID, please add it here
              </span>
            )}
          </div>
        }
      >
        <Tip>Enter the FreeSewing user ID of the person who is the maker of this showcase.</Tip>
        <AuthorInput {...{ author, setAuthor }} />
      </Item>
    )}
    {type === 'showcase' && (
      <Item
        title={
          <div className="flex flex-row gap-2 items-center">
            {designs.length > 0 ? (
              <OkIcon stroke={4} className="w-5 h-5 text-success" />
            ) : (
              <KoIcon stroke={3} className="w-5 h-5 text-error" />
            )}
            <b>Design:</b>
            {designs.length > 0 ? (
              <span className="text-base">{designs.map((d) => capitalize(d)).join(', ')}</span>
            ) : (
              <span className="text-error text-base">Please select at least 1 design</span>
            )}
          </div>
        }
      >
        <Tip>Pick one or more designs that are featured in this post.</Tip>
        <DesignPicker {...{ designs, setDesigns }} />
      </Item>
    )}
    <Item
      title={
        <div className="flex flex-row gap-2 items-center">
          {title.length > 10 ? (
            <OkIcon stroke={4} className="w-5 h-5 text-success" />
          ) : (
            <KoIcon stroke={3} className="w-5 h-5 text-error" />
          )}
          <b>Title:</b>
          {title.length > 10 ? (
            <span className="text-base">{title}</span>
          ) : (
            <span className="text-error text-base">Please enter a post title</span>
          )}
        </div>
      }
    >
      <Tip>Give your post a title. A good title is more than just a few words.</Tip>
      <TitleInput {...{ title, setTitle }} />
    </Item>
    <Item
      title={
        <div className="flex flex-row gap-2 items-center">
          {slugAvailable && slug.length > 3 ? (
            <OkIcon stroke={4} className="w-5 h-5 text-success" />
          ) : (
            <KoIcon stroke={3} className="w-5 h-5 text-error" />
          )}
          <b>Slug:</b>
          {slug.length > 3 ? (
            <span className="text-base">{slug}</span>
          ) : (
            <span className="text-error text-base">Please enter a slug (or post title)</span>
          )}
        </div>
      }
    >
      <Tip>
        The slug is the part of the URL that uniquely identifies the post. We can generate one based
        on the title, but you can also customize it.
      </Tip>
      <SlugInput {...{ title, slug, setSlug: verifySlug, slugAvailable }} />
    </Item>
    <Item
      title={
        <div className="flex flex-row gap-2 items-center">
          {img.length > 3 ? (
            <OkIcon stroke={4} className="w-5 h-5 text-success" />
          ) : (
            <KoIcon stroke={3} className="w-5 h-5 text-error" />
          )}
          <b>Main Image:</b>
          {img.length > 3 ? (
            <span className="text-base">{img}</span>
          ) : (
            <span className="text-error text-base">Please provide a main image for the post</span>
          )}
        </div>
      }
    >
      <Tip>
        The main image will be shown at the top of the post, and as the only image on the {type}
        index page.
      </Tip>
      <ImageInput {...{ img, setImg, slug }} type={type} subId="main" />
    </Item>
    <Item
      title={
        <div className="flex flex-row gap-2 items-center">
          {caption.length > 3 ? (
            <OkIcon stroke={4} className="w-5 h-5 text-success" />
          ) : (
            <KoIcon stroke={3} className="w-5 h-5 text-error" />
          )}
          <b>Main Image Caption:</b>
          {caption.length > 3 ? (
            <span className="text-base">{caption}</span>
          ) : (
            <span className="text-error text-base">
              Please provide a caption for the main image
            </span>
          )}
        </div>
      }
    >
      <Tip>
        The caption is the text that goes under the main image. Can include copyrights/credits.
        Markdown is allowed.
      </Tip>
      <CaptionInput {...{ caption, setCaption }} />
    </Item>
    <Item
      title={
        <div className="flex flex-row gap-2 items-center">
          {intro.length > 3 ? (
            <OkIcon stroke={4} className="w-5 h-5 text-success" />
          ) : (
            <KoIcon stroke={3} className="w-5 h-5 text-error" />
          )}
          <b>Intro:</b>
          {intro.length > 3 ? (
            <span className="text-base">{intro}</span>
          ) : (
            <span className="text-error text-base">Please provide an intro for link proviews</span>
          )}
        </div>
      }
    >
      <Tip>A brief paragraph that will be shown on post previews on social media and so on.</Tip>
      <IntroInput {...{ intro, setIntro }} />
    </Item>
    <Item
      title={
        <span>
          <b>Additional Images</b>: {Object.keys(extraImages).length}
        </span>
      }
    >
      {img ? (
        <>
          <Tip>Here you can add any images you want to include in the post body.</Tip>
          {Object.keys(extraImages).map((key) => {
            const markup =
              '![The image alt goes here](' +
              cloudflareImageUrl({ id: extraImages[key], variant: 'public' }) +
              ' "The image caption/title goes here")'
            return (
              <Fragment key={key}>
                <ImageInput
                  key={key}
                  setImg={(img) => setExtraImg(key, img)}
                  type={type}
                  subId={key}
                  img={extraImages[key]}
                  slug={slug}
                />
                {extraImages[key] && (
                  <>
                    <p>To include this image in your post, use this markdown snippet:</p>
                    <CodeBox code={markup} title="MarkDown" />
                    <p className="text-right -mt-5">
                      <button
                        className="btn btn-sm btn-secondary btn-outline"
                        onClick={() => setBody(body + '\n\n' + markup)}
                      >
                        Add to post body
                      </button>
                    </p>
                  </>
                )}
              </Fragment>
            )
          })}
          <button className="btn btn-secondary mt-2" onClick={addImage}>
            Add Image
          </button>
        </>
      ) : (
        <Popout note compact>
          Please add a main image first
        </Popout>
      )}
    </Item>
    <Item
      title={
        <div className="flex flex-row gap-2 items-center">
          {body.length > 3 ? (
            <OkIcon stroke={4} className="w-5 h-5 text-success" />
          ) : (
            <KoIcon stroke={3} className="w-5 h-5 text-error" />
          )}
          <b>Post body:</b>
          {body.length > 3 ? (
            <span className="text-base">{body.slice(0, 30) + '...'}</span>
          ) : (
            <span className="text-error text-base">Please provide a post body</span>
          )}
        </div>
      }
    >
      <Tip>The actual post body. Supports Markdown.</Tip>
      <BodyInput {...{ body, setBody }} />
    </Item>
  </>
)
