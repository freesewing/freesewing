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
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    }
  ]
})
