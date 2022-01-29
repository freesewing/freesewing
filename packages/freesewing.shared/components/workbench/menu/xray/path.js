/*
 * Things to add
 *
 * attributes
 * ops
 * render
 */


const XrayPath = props => {
    return <pre>{JSON.stringify(props.gist.xray.parts[props.partName].paths[props.id], null ,2)}</pre>
}

export default XrayPath
