export const blogSchemaBuilder = (lang) => ({
  name: `blog${lang}`,
  type: 'document',
  title: `Blog ${lang.toUpperCase()}`,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'linktitle',
      type: 'string',
      title: 'Link Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'text',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'number',
    },
  ],
})
