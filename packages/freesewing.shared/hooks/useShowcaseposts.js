import all from '@/site/prebuild/showcaseposts'

const useShowcaseposts = (lang='en', post=false) => {
  const posts = {}
  for (const [slug, post] of Object.entries(all[lang].posts)) {
    posts[slug] = {
      slug,
      title: post.title,
      maker: post?.maker?.displayname,
      date: post.date,
      image: post?.image?.formats?.medium?.url,
    }
  }

  return post
    ? [ all[lang].posts[post], posts ]
    : posts
}

export default useShowcaseposts
