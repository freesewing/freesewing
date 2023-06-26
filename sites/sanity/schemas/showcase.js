export const showcaseSchemaBuilder = (lang) => ({
  name: `showcase${lang}`,
  type: 'document',
  title: `Showcase ${lang.toUpperCase()}`,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
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
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Main (first) image caption',
    },
    {
      name: 'maker',
      title: 'Maker',
      type: 'number',
    },
  ],
})
