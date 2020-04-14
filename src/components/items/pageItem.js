import React from 'react';
import { Placeholder, Loader } from 'semantic-ui-react'

import { Panel } from './panels'

var classNames = require('classnames');


const Filler = (props) => (
  <div className={classNames('filler', props.className)}>{props.children}</div>
)

const Line = (props) => (
  <div className={classNames('line', props.className, props.size)} style={props.style}>
    <Filler>
      {props.children}
    </Filler>
  </div>
)


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
  <div className={props.className ? classNames('page-item-header', props.className) : 'page-item-header'}>
    {props.children}
  </div>
)

PageItem.Header.Placeholder = (props) => {
  return (
    <PageItem.Header>
      <div className="left">
        <Filler/>
      </div>
      <div className="right">
        <Line className="h1" size={"lg"}/>
        <Line className="h3" size={"md"}/>
        <div className="header-items">
          <div className="header-item">
            <Line size={"sm"}/>
          </div>
          <div className="header-item">
            <Line size={"sm"}/>
          </div>
          <div className="header-item">
            <Line size={"sm"}/>
          </div>
        </div>
      </div>
    </PageItem.Header>
  )
}


PageItem.Body = (props) => (
  <div className={props.className ? classNames('body', props.className) : 'body'}>
    {props.children}
  </div>
)

PageItem.Body.Placeholder = (props) => {
  return (
    <PageItem.Body>
      <Panel>
        <Line className="h1" size={"full"}/>
        <Line className="h1" size={"full"}/>
        <Line className="h1" size={"full"}/>
      </Panel>
      <Panel>
        <Line className="h1" size={"full"}/>
        <Line className="h1" size={"full"}/>
        <Line className="h1" size={"full"}/>
      </Panel>
    </PageItem.Body>
  )
}


export default PageItem;
