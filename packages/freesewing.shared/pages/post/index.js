import Preview from '@/shared/components/strapi/preview'

const Page = props => {
  return (
    <div className="flex flex-row flex-wrap">
      {Object.values(props.posts).reverse().map(post => (
        <Preview post={post} type={props.type}/>
      ))}
    </div>
  )
}

export default Page
