import React from 'react';
import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


const PageItem = (props) => {
  const {className, loading, children, ...otherProps} = props;
  return (
    <div className={classNames('page-item', className)} {...otherProps}>
      <Loader active={loading} size="mini"/>
      {children}
    </div>
  )
}

PageItem.Header = (props) => (
  <div className={props.className ? classNames('header', props.className) : 'header'}>
    {props.children}
  </div>
)

PageItem.Body = (props) => (
  <div className={props.className ? classNames('body', props.className) : 'body'}>
    {props.children}
  </div>
)


export default PageItem;
