## About

This wraps the [remark-jargon](https://github.com/freesewing/freesewing/tree/develop/packages/remark-jargon) plugin
for Gatsby so you can use _jargon_ in the markdown/mdx of your Gatsby site:

![An example of this plugin being used on freesewing.org](example.png)

## Install

```bash
npm install --save gatsby-remark-jargon
```

## Configuration


In `gatsby-config.js` include your jargon file, and add the remark plugin:


```js
  {
    resolve: 'gatsby-remark-jargon',
    options: { jargon: require('./jargon.js') }
  }
```

## Usage

### The jargon file

The jagon file is a simple key-value file:

```js
const jargon = {
  msf: "<b>MSF</b> Médecins Sans Frontières / Doctors Without Borders — An international, independent, medical humanitarian organisation. See <a href='https://www.msf.org/'>msf.org</a>"
}

export default jargon
```

### Using jargon in markdown

This plugin will only add markup to your jargon if you emphasize it. In the following example, 
only the first mention of MSF will be changed:

```md
_MSF_ was founded in 1971 by 13 doctors and journalists. Today, MSF is a worldwide movement of more than 67,000 people.
```

This will be rendered as:

```html
<p>
  <em>
    <span class="jargon-term">
      MSF
      <span class="jargon-info">
        <b>MSF</b> Médecins Sans Frontières / Doctors Without Borders — An international, independent, medical humanitarian organisation. See <a href='https://www.msf.org/'>msf.org</a>
      </span>
    </span>
  </em>
  was founded in 1971 by 13 doctors and journalists. Today, MSF is a worldwide movement of more than 67,000 people.
</p>
```

Which you can then style so that the definition is only show on hover/touch.

### Styling your jargon

You will need to add CSS to style your jargon properly, and hide the definition by default.
Below is an example to get you started:

```css
// Add a dashed line under jargon terms
.jargon-term {
  text-decoration: underline dotted #228be6
}
// Add a question mark behind/above jargon terms
.jargon-term::after {
  content: "?";
  font-weight: bold;
  display: inline-block;
  transform: translate(0, -0.5em);
  font-size: 75%;
  color: #228be6;
  margin-left: 3px;
}
// Hover behavior for the therm itself
.jargon-term:hover {
  position: relative;
  text-decoration: none;
  cursor: help;
}
// Hide info by default
.jargon-term .jargon-info {
  display: none
}
// Show info on hover
.jargon-term:hover .jargon-info {
  display: block;
  position: absolute;
  top: 1.5em;
  left: 0;
  background: #F8F8F8;
  border: 1px solid #DCDCDC;
  padding: 1rem;
  border-radius: 4px;
  font-size: 90%;
  min-width: 250px;
  max-width: 450px;
  z-index: 1;
}
```

## Tips for using jargon

### Lowercase your terms in the jargon file

When looking for terms to match, we lowercase the term your emphazised.
So in the jargon file, you should use `msf`, but in your text, you can use `MSF`, `Msf`, or `msf`.

### If you use HTML, only use inline elements

Your jargon term definition can contain HTML, but only inline elements.
Typically, you will want to stick to:

 - Making things **bold**
 - Inserting [links](#)


