export const newsletter = {
  name: 'newsletter',
  type: 'document',
	title: 'Newsletter',
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
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}]
    },
  ]
}
