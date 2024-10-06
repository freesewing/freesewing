import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'
function transformImgClassName(className) {
  return clsx(className, styles.img)
}
export default function MDXImg(props) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return (
    <figure>
      <img
        decoding="async"
        loading="lazy"
        {...props}
        className={transformImgClassName(props.className)}
      />
      <figcaption className="mdx">{props.title}</figcaption>
    </figure>
  )
}
