import { Ul, Li, Details, Summary, SumDiv, Deg } from 'shared/components/workbench/menu'

const XrayPoint = props => [
  <Li key='x'>x: {props.x}</Li>,
  <Li key='y'>x: {props.y}</Li>,
  <Li key='attributes'>Attributes: {props.y}</Li>,
]

export default XrayPoint
