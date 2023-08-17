// Dependencies
import { nsMerge, capitalize, cloudflareImageUrl, yyyymmdd } from 'shared/utils.mjs'
// Hooks
import { useState, useEffect } from 'react'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useBackend } from 'shared/hooks/use-backend.mjs'
import { useToast } from 'shared/hooks/use-toast.mjs'
import { useTranslation } from 'next-i18next'
// Components
import { Popout } from 'shared/components/popout/index.mjs'
import { AuthWrapper, ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { DesignPicker } from './design-picker.mjs'
import {
  TitleInput,
  SlugInput,
  ImageInput,
  CaptionInput,
  IntroInput,
  BodyInput,
} from './inputs.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { Tab } from 'shared/components/account/bio.mjs'
import { CodeBox } from 'shared/components/code-box.mjs'
import { PostArticle, ns as mdxNs } from 'site/components/mdx/posts/article.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { OkIcon, WarningIcon as KoIcon } from 'shared/components/icons.mjs'

export const ns = nsMerge('account', 'posts', authNs, mdxNs)

const Title = ({ children }) => (
  <h3 className="flex flex-row flex-wrap items-end justify-between">{children}</h3>
)

const Tip = ({ children }) => <p className="italic opacity-70">{children}</p>

const Item = ({ title, children }) => (
  <div className="collapse collapse-arrow bg-base-100 hover:bg-secondary hover:bg-opacity-20">
    <input type="radio" name="my-accordion-2" />
    <div className="collapse-title text-xl font-medium">{title}</div>
    <div className="collapse-content bg-base-100 hover:bg-base-100">{children}</div>
  </div>
)

const dataAsMd = ({ title, maker, caption, intro, designs, body }) => `---
title: "${title}"
maker: ${maker}
caption: "${caption}"
date: ${yyyymmdd()}
intro: "${intro}"
designs: [${designs.map((design) => `"${design}"`).join(', ')}]
---

${body}

`

export const CreateShowcasePost = ({ noTitle = false }) => {
  const { account } = useAccount()
  const backend = useBackend()
  const toast = useToast()
  const { t, i18n } = useTranslation(ns)

  const [designs, setDesigns] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState(false)
  const [img, setImg] = useState(false)
  const [caption, setCaption] = useState('')
  const [intro, setIntro] = useState('')
  const [body, setBody] = useState('')
  const [extraImages, setExtraImages] = useState({})
  const [activeTab, setActiveTab] = useState('create')

  // Method that submits the PR
  const submitPullRequest = async () => {
    const result = await backend.createShowcasePr({
      markdown: dataAsMd({
        title,
        maker: account.username,
        caption,
        intro,
        designs,
        body,
      }),
      slug,
      language: i18n.language,
    })
  }

  // Shared props for tabs
  const tabProps = { activeTab, setActiveTab, t }

  const addImage = () => {
    const id = Object.keys(extraImages).length + 1
    const newImages = { ...extraImages }
    newImages[id] = null
    setExtraImages(newImages)
  }

  const setExtraImg = (key, img) => {
    const newImages = { ...extraImages }
    newImages[key] = img
    setExtraImages(newImages)
  }

  const childProps = {
    designs,
    setDesigns,
    title,
    setTitle,
    slug,
    setSlug,
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
  }

  return (
    <AuthWrapper>
      <div className="hidden md:grid md:grid-cols-2 md:gap-4">
        <div className="p-4 shadow rounded-lg my-8">
          <ShowcaseEditor {...childProps} />
        </div>
        <div className="p-4 shadow rounded-lg my-8">
          <ShowcasePreview {...childProps} />
        </div>
      </div>
      <div className="block md:hidden px-4">
        <div className="tabs w-full">
          <Tab id="create" {...tabProps} />
          <Tab id="preview" {...tabProps} />
        </div>
        {activeTab === 'create' ? (
          <ShowcaseEditor {...childProps} />
        ) : (
          <ShowcasePreview {...childProps} />
        )}
      </div>
      <div className="px-4 max-w-lg m-auto my-8 text-center">
        {!(title && slug && img && designs.length > 0) && (
          <Popout note>
            <h5 className="text-left">You are missing the following:</h5>
            <ul className="text-left list list-inside list-disc ml-4">
              {designs.length < 1 && <li>Design</li>}
              {!title && <li>Title</li>}
              {!slug && <li>Slug</li>}
              {!img && <li>Main Image</li>}
            </ul>
          </Popout>
        )}
        <button
          className="btn btn-lg btn-primary"
          disabled={!(title && slug && img && designs.length > 0)}
          onClick={submitPullRequest}
        >
          Submit Showcase Post
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
    </AuthWrapper>
  )
}

const ShowcasePreview = ({ designs, title, img, caption, intro, body, account }) => (
  <>
    <h1>{title}</h1>
    <PostArticle
      frontmatter={{
        title,
        designs,
        maker: account.username,
        date: yyyymmdd(),
        caption,
        intro,
      }}
      imgId={img}
      body={body}
    />
  </>
)

const ShowcaseEditor = ({
  designs,
  setDesigns,
  title,
  setTitle,
  slug,
  setSlug,
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
  t,
}) => (
  <>
    <h2>Create a new showcase post</h2>
    <Tip>{t('showcaseNewInfo')}</Tip>
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
          {slug.length > 3 ? (
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
      <SlugInput {...{ title, slug, setSlug }} />
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
        The main image will be shown at the top of the post, and as the only image on the showcase
        index page.
      </Tip>
      <ImageInput {...{ img, setImg, slug }} type="showcase" subId="main" />
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
              <>
                <ImageInput
                  key={key}
                  setImg={(img) => setExtraImg(key, img)}
                  type="showcase"
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
              </>
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
