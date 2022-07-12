import rough from 'roughjs/bundled/rough.cjs.js'

const getAttributes = (element) => Array.prototype.slice.call(element.attributes)

const getNum = (element, attributes) => attributes.map(attr => parseFloat(element.getAttribute(attr)))

const getDiam = (element, attributes) => attributes.map(attr => 2 * parseFloat(element.getAttribute(attr)))

const getCoords = (element, attribute) => element
  .getAttribute(attribute)
  .trim()
  .split(' ')
  .filter(item => item.length > 0)
  .map(item => item.trim().split(',').map(num => parseFloat(num)))

const getSettings = element => {
  const settings = {};

  if(element.hasAttribute('stroke')) {
    settings.stroke = element.getAttribute('stroke');
  }

  if(element.hasAttribute('fill')) {
    settings.fill = element.getAttribute('fill');
  }

  if(element.hasAttribute('stroke-width') && !element.getAttribute('stroke-width').includes('%')) {
    settings.strokeWidth = parseFloat(element.getAttribute('stroke-width'));
  }

  return settings;
}

/* Switch the default black to currentColor for dark mode support */
const noBlack = orig => {
  if (orig.getAttribute('stroke') === '#000000') {
    orig.setAttribute('stroke', 'currentColor')
  }
  if (orig.getAttribute('fill') === '#000000') {
    orig.setAttribute('fill', 'currentColor')
  }
  if (orig.getAttribute('color') === '#000000') {
    orig.setAttribute('color', 'currentColor')
  }

  return orig
}


const coarse = (svg, options) => {
  const blacklist = [
    'cx',
    'cy',
    'd',
    'fill',
    'height',
    'points',
    'r',
    'rx',
    'ry',
    'stroke-width',
    'stroke',
    'width',
    'x',
    'x1',
    'x2',
    'y',
    'y1',
    'y2'
  ];

  const flatten = (...args) => {
    const rv = []
    for(let i = 0; i < args.length; i++) {
      const arr = args[i]
      for(let j = 0; j < arr.length; j++) {
        rv.push(arr[j])
      }
    }
    return rv
  }

  const rc = rough.svg(svg, options || {})

  // Replace shapes
  const children = svg.querySelectorAll('circle, rect, ellipse, line, polygon, polyline, path')
  for(let i = 0; i < children.length; i += 1) {
    const original = noBlack(children[i]);
    let params = [];
    let shapeType;

    switch(original.tagName) {
      case 'circle':
        params = flatten(getNum(original, ['cx', 'cy']), getDiam(original, ['r']));
        shapeType = 'circle';
        break;
      case 'rect':
        params = flatten(getNum(original, ['x', 'y', 'width', 'height']));
        shapeType = 'rectangle';
        break;
      case 'ellipse':
        params = flatten(getNum(original, ['cx', 'cy']), getDiam(original, ['rx', 'ry']));
        shapeType = 'ellipse';
        break;
      case 'line':
        params = flatten(getNum(original, ['x1', 'y1', 'x2', 'y2']));
        shapeType = 'line';
        break;
      case 'polygon':
        params = [getCoords(original, 'points')];
        shapeType = 'polygon';
        break;
      case 'polyline':
        params = [getCoords(original, 'points')];
        shapeType = 'linearPath';
        break;
      case 'path':
        params = [original.getAttribute('d')];
        shapeType = 'path';
        break;
    }

    const replacement = rc[shapeType](...params, getSettings(original));

    const attributes = getAttributes(original)
      .filter(attribute => !blacklist.includes(attribute.name))

    for(let j = 0; j < attributes.length; j++) {
      replacement.setAttribute(attributes[j].name, attributes[j].value);
    }

    original.replaceWith(replacement);
  }

  // Replace text color
  const text = svg.querySelectorAll('text')
  for(let i = 0; i < text.length; i += 1) noBlack(text[i])

}

export default coarse

