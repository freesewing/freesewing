import React from 'react'
import { examples } from '@site/design-examples.mjs'
import { cloudflareImageUrl } from '@freesewing/utils'
import Link from '@docusaurus/Link'
import { Popout } from '@freesewing/react/components/Popout'

function DesignExamples({ design }) {
  if (!design || !examples[design] || examples[design].length < 1)
    return (
      <Popout note>
        Unfortunately, we do not have examples for this design yet. Hopefully, someone will post one
        soon.
      </Popout>
    )

  return (
    <div className="tw-grid tw-grid-cols-2 tw-gap-2 md:tw-grid-cols-3 2xl:tw-grid-cols-4">
      {examples[design].map((example) => (
        <Link
          href={`/showcase/${example.id}/`}
          title={example.title}
          className="tw-w-full tw-aspect-square tw-rounded-lg tw-shadow"
          style={{
            backgroundImage: `url(${cloudflareImageUrl({ id: 'showcase-' + example.id })}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      ))}
    </div>
  )
}

export default DesignExamples
