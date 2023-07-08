import React from 'react'
import { getProps } from './utils.mjs'
import { Tr, KeyTd, ValTd, Attributes, pointCoords } from './path.mjs'

const snippetInfo = (props) => {
  return (
    <div className="p-4 border bg-neutral bg-opacity-40 shadow rounded-lg">
      <h5 className="text-neutral-content text-center pb-4">Snippet info</h5>
      <table className="border-collapse h-fit">
        <tbody>
          <Tr>
            <KeyTd>Def</KeyTd>
            <ValTd>{props.snippet.def}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Anchor</KeyTd>
            <ValTd>{props.snippet.anchor.name}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Coords</KeyTd>
            <ValTd>{pointCoords(props.snippet.anchor)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Coords</KeyTd>
            <ValTd>{pointCoords(props.snippet.anchor)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Attributes</KeyTd>
            <ValTd>
              <Attributes list={props.snippet.attributes.list} />
            </ValTd>
          </Tr>
        </tbody>
      </table>
      <div className="flex flex-col flex-wrap gap-2 mt-4">
        <button className="btn btn-success" onClick={() => console.log(props.snippet)}>
          console.log(snippet)
        </button>
        <button className="btn btn-success" onClick={() => console.table(props.snippet)}>
          console.table(snippet)
        </button>
      </div>
    </div>
  )
}

export const Snippet = (props) => {
  if (!props.snippet?.anchor) return null
  const snippetProps = {
    xlinkHref: '#' + props.snippet.def,
    x: props.snippet.anchor.x,
    y: props.snippet.anchor.y,
  }
  let scale = props.snippet.attributes.get('data-scale')
  let rotate = props.snippet.attributes.get('data-rotate')
  if (scale || rotate) {
    snippetProps.transform = ''
    if (scale) {
      snippetProps.transform += `translate(${snippetProps.x}, ${snippetProps.y}) `
      snippetProps.transform += `scale(${scale}) `
      snippetProps.transform += `translate(${snippetProps.x * -1}, ${snippetProps.y * -1}) `
    }
    if (rotate) {
      snippetProps.transform += `rotate(${rotate}, ${snippetProps.x}, ${snippetProps.y}) `
    }
  }

  return (
    <use
      {...snippetProps}
      {...getProps(props.snippet)}
      color="currentColor"
      className="hover:cursor-pointer hover:fill-primary hover:text-secondary"
      onClick={(evt) => {
        evt.stopPropagation()
        props.showInfo(snippetInfo(props))
      }}
    />
  )
}
