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
import { PostArticle } from 'site/components/mdx/posts/article.mjs'

export const ns = nsMerge('account', authNs)

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

export const CreateShowcasePost = ({ noTitle = false }) => {
  const { account } = useAccount()
  const backend = useBackend()
  const toast = useToast()
  const { t } = useTranslation(ns)

  const [designs, setDesigns] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState(false)
  const [img, setImg] = useState(false)
  const [caption, setCaption] = useState('')
  const [intro, setIntro] = useState('')
  const [body, setBody] = useState('')
  const [extraImages, setExtraImages] = useState({})
  const [activeTab, setActiveTab] = useState('create')

  // Shared props for tabs
  const tabProps = { activeTab, setActiveTab, t }

  const addImage = () => {
    const id = Object.keys(extraImages).length + 1
    const newImages = { ...extraImages }
    newImages[id] = null
    setExtraImages(newImages)
  }

  const setExtraImg = (key, img) => {
    console.log('setting extra', { key, img })
    const newImages = { ...extraImages }
    newImages[key] = img
    setExtraImages(newImages)
  }

  return (
    <AuthWrapper>
      <div className="max-w-2xl">
        {!noTitle && <h1>{t('showcaseNew')}</h1>}
        <Tip>{t('showcaseNewInfo')}</Tip>

        <div className="tabs w-full">
          <Tab id="create" {...tabProps} />
          <Tab id="preview" {...tabProps} />
        </div>
        {activeTab === 'create' ? (
          <>
            <Item
              title={
                <span>
                  <b>Designs</b>:{' '}
                  <span className="text-sm">{designs.map((d) => capitalize(d)).join(', ')}</span>
                </span>
              }
            >
              <Tip>Pick one or more designs that are featured in this post.</Tip>
              <DesignPicker {...{ designs, setDesigns }} />
            </Item>
            <Item
              title={
                <span>
                  <b>Title</b>: <span className="text-sm">{title}</span>
                </span>
              }
            >
              <Tip>Give your post a title. A good title is more than just a few words.</Tip>
              <TitleInput {...{ title, setTitle }} />
            </Item>
            <Item
              title={
                <span>
                  <b>Slug</b>: <span className="text-sm">{slug}</span>
                </span>
              }
            >
              <Tip>
                The slug is the part of the URL that uniquely identifies the post. We can generate
                one based on the title, but you can also customize it.
              </Tip>
              <SlugInput {...{ title, slug, setSlug }} />
            </Item>
            <Item
              title={
                <span>
                  <b>Main Image</b>: <span className="text-sm">{img}</span>
                </span>
              }
            >
              <Tip>
                The main image will be shown at the top of the post, and as the only image on the
                showcase index page.
              </Tip>
              <ImageInput {...{ img, setImg, slug }} type="showcase" subId="main" />
            </Item>
            <Item
              title={
                <span>
                  <b>Main Image Caption</b>: <span className="text-sm">{caption}</span>
                </span>
              }
            >
              <Tip>
                The caption is the text that goes under the main image. Can include
                copyrights/credits. Markdown is allowed.
              </Tip>
              <CaptionInput {...{ caption, setCaption }} />
            </Item>
            <Item
              title={
                <span>
                  <b>Intro</b>: <span className="text-sm">{intro}</span>
                </span>
              }
            >
              <Tip>
                A brief paragraph that will be shown on post previews on social media and so on.
              </Tip>
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
                <span>
                  <b>Post body</b>: {body.slice(0, 30) + '...'}
                </span>
              }
            >
              <Tip>The actual post body. Supports Markdown.</Tip>
              <BodyInput {...{ body, setBody }} />
            </Item>
          </>
        ) : (
          <>
            <h1>{title}</h1>
            <PostArticle
              frontmatter={{
                title,
                maker: account.username,
                date: yyyymmdd(),
                caption,
                intro,
              }}
              imgId={img}
              body={body}
            />
          </>
        )}
      </div>
    </AuthWrapper>
  )
}
