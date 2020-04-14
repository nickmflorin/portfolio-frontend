import React from 'react';
import { IconizedHeader } from 'components/icons'

var classNames = require('classnames')


export const Panel = (props) => {
  var child = <div className="panel-item">{props.children}</div>
  if (props.children && props.children.constructor === Array){
    child = props.children.map((cl, index) => {
      if (cl) {
        return <div className="panel-item" key={index}>{cl}</div>
      }
      else {
        return <React.Fragment key={index}/>
      }
    })
  }
  return (
    <div className={props.className ? classNames('panel', props.className) : 'panel'}>
      {props.header && (
        <IconizedHeader icon={props.icon}>{props.header}</IconizedHeader>
      )}
      {child}
    </div>
  )
}


export default Panel;
