import all from '@/site/prebuild/blogposts'

const useBlogposts = (lang='en', post=false) => {
  const posts = {}
  for (const [slug, post] of Object.entries(all[lang].posts)) {
    posts[slug] = {
      slug,
      title: post.title,
      linktitle: post.linktitle,
      author: post.author.displayname,
      date: post.date,
      image: post.image.formats.medium.url,
    }
  }

  return post
    ? [ all[lang].posts[post], posts ]
    : posts
}

export default useBlogposts
