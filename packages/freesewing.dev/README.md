## About

This is a work in progress to rebuild the freesewing.dev website with NextJS (rather than Gatsby).

## Notes

### Tailwind and Daisy

We are using TailwindCSS and Daisyui for styling.
The idea is to ship less Javascript by getting rid of MaterialUI and instead rely on
more CSS and native HTML elements

### files outside app root


Since we plan to also port freesewing.org to NextJS, we should be able to re-use a good bit of
code between both websites.

However, NextJS will not properly transpile code outside the app root, not to mention that it
also won't watch for changes there.

So, we use the experimental feature flag to load files from outside the app root.
See: https://github.com/vercel/next.js/pull/22867


