import { version, name } from "../package.json";

const dbg = {
  debug: 'custom',
  text: 'Validation error',
  style: 'color: red; font-weight: bold;'
}

function validatePoint(point, partId, pointId, debug) {
  if(typeof point !== 'object') {
    debug(dbg, 'Problem with point:', point);
    throw(`Point pattern.parts.${partId}.points.${pointId} is not an object`);
  } else if(typeof point.x !== 'number' || isNaN(point.x)) {
    debug(dbg, 'Problem with point X-value:', point);
    throw(`X-value of point pattern.parts.${partId}.points.${pointId} is not a number`);
  } else if(typeof point.y !== 'number' || isNaN(point.y)) {
    debug(dbg, 'Problem with point Y-value:', point);
    throw(`Y-value of point pattern.parts.${partId}.points.${pointId} is not a number`);
  } else if(typeof point.attributes !== 'object' || !point.attributes.clone instanceof Function) {
    debug(dbg, 'Problem with point attributes:', point);
    throw(dbg, `attributes property of point pattern.parts.${partId}.points.${pointId} is not an object`);
  } else if(!point.clone instanceof Function) {
    debug(dbg, 'Problem with point:', point);
    throw(`Point pattern.parts.${partId}.points.${pointId} is not a valid Point object`);
  }

  return true;
}

function validateText(type, item, partId, itemId, debug) {
  let text = item.attributes.getAsArray('data-text');
  if(text === false) return true;
  else {
    if(item.attributes.get('data-validate-skip-text') !== false) {
      debug(
        {
          debug: 'custom',
          text: 'Validation warning',
          style: 'color: #da0; font-weight: bold;'
        },
        'This text might be a translation problem:',
        item,
        'However, the error was suppresed, so moving on.'
      );
      return true;
    }
    for (let t of text) {
      if(typeof t !== 'string' && typeof t !== 'number') {
        debug(dbg, 'This text is not a string or number:', t);
        throw(`${type} pattern.parts.${partId}.${type}s.${itemId} has text that is not a string nor a number. Set the 'data-validate-skip-text' attribute to true to suppress this error.`);

      } else if(typeof t === 'string' && t.indexOf(' ') !== -1) {
        debug(dbg, 'This text might be a translation problem:', item);
        throw(`${type} pattern.parts.${partId}.${type}s.${itemId} has text containing spaces. Please insert translation identifiers, and not actual text. Set the 'data-validate-skip-text' attribute to true to suppress this error.`);
      }
    }
  }

  return true;
}

function validatePath(path, partId, pathId, debug) {
  if(typeof path !== 'object') {
    debug(dbg, 'Problem with path:', path);
    throw(`Path pattern.parts.${partId}.paths.${pathId} is not an object`);
  } else if(typeof path.ops !== 'object') {
    debug(dbg, 'Problem with path ops:', path);
    throw(`ops property of path pattern.parts.${partId}.paths.${pathId} is not an object`);
  } else if(path.ops.length < 2) {
    debug(dbg, 'Problem with path ops:', path);
    throw(`Path pattern.parts.${partId}.paths.${pathId} does not do anything`);
  } else if(typeof path.attributes !== 'object') {
    debug(dbg, 'Problem with path attributes:', path);
    throw(`attributes property of path pattern.parts.${partId}.paths.${pathId} is not an object`);
  } else if(!path.clone instanceof Function) {
    debug(dbg, 'Problem with path:', path);
    throw(`Path pattern.parts.${partId}.paths.${pathId} is not a valid Path object`);
  } else if(!path.attributes.clone instanceof Function) {
    debug(dbg, 'Problem with path attributes:', path);
    throw(`attributes property of path pattern.parts.${partId}.paths.${pathId} is not a valid Attributes object`);
  }
  for (let o in path.ops) {
    let op = path.ops[o];
    if(op.type !== 'close') {
      if(!validatePoint(op.to, partId, '_unknown_', debug)) {
        debug(dbg, 'Problem with path TO point:', op.to);
        throw(`Point in pattern.parts.${partId}.paths.${pathId}.ops[o].to is not a valid Point object`);
      }
    } else if (op.type === 'curve') {
      if(!validatePoint(op.cp1, partId, '_unknown_', debug)) {
        debug(dbg, 'Problem with path CP1 point:', op.cp1);
        throw(`Point in pattern.parts.${partId}.paths.${pathId}.ops[o].cp1 is not a valid Point object`);
      } else if(!validatePoint(op.cp2, partId, '_unknown_', debug)) {
        debug(dbg, 'Problem with path CP2 point:', op.cp1);
        throw(`Point in pattern.parts.${partId}.paths.${pathId}.ops[o].cp2 is not a valid Point object`);
      }
    }
  }

  return true;
}

function isSnippet(snippet, partId, snippetId, debug) {
  if(typeof snippet !== 'object') return false;
  if(!validatePoint(snippet.anchor, partId, '_unknown_', debug)) return false;
  if(typeof snippet.attributes !== 'object') return false;
  if(!snippet.clone instanceof Function) return false;
  if(!snippet.attributes.clone instanceof Function) return false;

  return true;
}

export default {
  name: name,
  version: version,
  hooks: {
    preDraft: function(next) {
      for(let m in this.config.measurements) {
        let measurement = this.config.measurements[m];
        if(!this.context.settings.measurements[measurement]) {
          this.debug(dbg, 'Missing measurement:', measurement);
          this.debug('All measurements:', this.settings.measurements);
          throw `Missing measurement: ${measurement}`;
        }
      }
      next();
    },
    postDraft: function(next) {
      for(let partId in this.parts) {
        let part = this.parts[partId];
        let { debug } = part.shorthand();
        for(let pointId in part.points) {
          validatePoint(part.points[pointId], partId, pointId, debug);
          validateText('point', part.points[pointId], partId, pointId, debug);
        }
        for(let pathId in part.paths) {
          validatePath(part.paths[pathId], partId, pathId, debug);
          validateText('path', part.paths[pathId], partId, pathId, debug);
        }
        for(let snippetId in part.snippets) {
          if(!isSnippet(part.snippets[snippetId], partId, snippetId, debug)) {
            throw(`pattern.parts.${partId}.snippets.${snippetId} is not a valid Snippet object`);
          }
        }
      }
      next();
    }
  }
};
