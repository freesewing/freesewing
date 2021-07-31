---
title: Code and code blocks
order: 80
---

Especially for our developer documentation, there's a lot of times we include source code 
in the documentation.
You can make these look pretty by using a code block.

The basic use is to wrap your code in three backtick characters on a line:

````
```
let me = 'you'
```
````

Gives you: 

```
let me = 'you'
```

This is a generic code block. But we also support syntax highlighting.
To do so, add the language specifier after the opening backticks:

````
```js
let me = 'you'
```
````

To get:

```js
let me = 'you'
```

The following language codes are supported:

 - `js` for Javascript code
 - `md` for Markdown
 - `html` for HTML
 - `svg` for SVG
 - `bash` for Bash or shell scripts
 - `mdx` for MDX
 - `jsx` for JSX
 - `json` for JSON
 - `js-error` for a Javascript error
 - `js-trace` for a Javascript stack trace



