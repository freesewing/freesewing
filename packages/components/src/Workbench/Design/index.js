import React from "react";

const Design = props => {
  // Methods
  const renderAttributes = attr => {
    let list = [];
    for (let a in attr.list)
      list.push(
        <li key={a}>
          <b>{a}</b>: {renderAttributeValue(attr.list[a])}
        </li>
      );

    return <ul className="links">{list}</ul>;
  };

  const renderAttributeValue = val => {
    if (Array.isArray(val)) {
      if (val.length === 1) return val.pop();
      let list = [];
      for (let v of val) list.push(<li key={v}>{v}</li>);
      return <ul>{list}</ul>;
    }

    return val;
  };

  const idPathPoint = (part, a) => {
    for (let p in props.parts[part].points) {
      let b = props.parts[part].points[p];
      if (a.x === b.x && a.y === b.y) return p;
    }
    return false;
  };

  const renderPathOps = (path, part) => {
    let list = [];
    for (let i in path.ops) list.push(renderPathOp(path.ops[i], i, part));

    return <ul className="links">{list}</ul>;
  };

  const renderPathOp = (op, key, part) => {
    let list = [];
    let focus = {
      part,
      coords: {
        x: null,
        y: null
      }
    };

    if (op.type === "move" || op.type === "line") {
      focus.coords.x = op.to.x;
      focus.coords.y = op.to.y;
      let text = <span>(op.to.x,op.to.y)</span>;
      let click = () => props.raiseEvent("coords", focus);
      let pname = idPathPoint(part, op.to);
      if (pname) {
        text = pname;
        click = () =>
          props.raiseEvent("point", {
            point: props.parts[part].points[pname],
            name: pname,
            part: part
          });
      }
      return (
        <li key={key}>
          <b>{op.type}</b>
          &nbsp;&raquo;&nbsp;
          <a href="#logo" role="button" onClick={click}>
            {text}
          </a>
        </li>
      );
    } else if (op.type === "curve") {
      let texts = {};
      let clicks = {};
      let types = ["to", "cp1", "cp2"];
      for (let t of types) {
        let pname = idPathPoint(part, op[t]);
        if (pname) {
          texts[t] = pname;
          clicks[t] = () =>
            props.raiseEvent("point", {
              point: props.parts[part].points[pname],
              name: pname,
              part
            });
        } else {
          texts[t] = (
            <span>
              ({op[t].x},{op[t].y})
            </span>
          );
          clicks[t] = () =>
            props.raiseEvent("coords", {
              ...focus,
              coords: {
                x: op[t].x,
                y: op[t].y
              }
            });
        }
      }
      return (
        <li key={key}>
          <b>{op.type}</b>
          {types.map(t => (
            <React.Fragment key={t}>
              <span>&ensp;&raquo;&ensp;</span>
              <a href="#logo" role="button" onClick={clicks[t]}>
                {texts[t]}
              </a>
            </React.Fragment>
          ))}
        </li>
      );
    } else if (op.type === "close")
      return (
        <li key={key}>
          <b>close</b>
        </li>
      );

    return null;
  };

  // Variables
  const styles = {
    container: {
      padding: "0 1rem"
    },
    h3: {
      margin: "0.5rem 0"
    },
    h4: {
      margin: "0.25rem 0 0 0.5rem"
    },
    ul: {
      marginTop: "0.25rem"
    }
  };

  if (
    !props.design ||
    props.focus === null ||
    Object.keys(props.focus).length < 1
  )
    return null;
  let info = [];
  for (let part of Object.keys(props.focus)) {
    info.push(
      <h3 key={"part-" + part} style={styles.h3}>
        parts.<b>{part}</b>
      </h3>
    );
    for (let i in props.focus[part].paths) {
      let name = props.focus[part].paths[i];
      let path = props.parts[part].paths[name];
      info.push(
        <h4
          key={"patitle-" + name}
          style={styles.h4}
          className={"path c" + (i % 4)}
        >
          path.<b>{name}</b>
        </h4>
      );
      info.push(
        <ul className="links" key={"ops-" + name} style={styles.ul}>
          <li>
            <b>attributes</b>: {renderAttributes(path.attributes)}
          </li>
          <li>
            <b>ops</b>: {renderPathOps(path, part)}
          </li>
        </ul>
      );
    }
    for (let i in props.focus[part].points) {
      let name = props.focus[part].points[i];
      let point = props.parts[part].points[name];
      info.push(
        <h4
          key={"potitle-" + name}
          style={styles.h4}
          className={"point c" + (i % 4)}
        >
          point.<b>{name}</b>
        </h4>
      );
      info.push(
        <ul className="links" key={"pdata-" + name} style={styles.ul}>
          <li>
            <b>x</b>: {point.x}
          </li>
          <li>
            <b>y</b>: {point.y}
          </li>
          <li>
            <b>attributes</b>: {renderAttributes(point.attributes)}
          </li>
        </ul>
      );
    }
  }

  return (
    <div style={styles.container} className="design">
      {info}
    </div>
  );
};

export default Design;
