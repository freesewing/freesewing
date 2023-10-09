import Link from 'next/link'

export const CardLink = ({ color = 'primary', href, title, text }) => (
  <div className={`p-1 bg-${color} rounded-none lg:rounded-xl lg:shadow flex flex-col`}>
    <Link
      href={href}
      className={`px-4 lg:px-8 py-10 rounded-none lg:rounded-lg block
      bg-base-100 text-base-content hover:bg-${color} hover:text-${color}-content
      transition-color duration-300 grow`}
    >
      <h2 className="mb-4 text-inherit">{title}</h2>
      <p className="font-medium text-inherit">{text}</p>
    </Link>
  </div>
)
