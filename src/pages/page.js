import React from 'react';
import Container from 'react-bootstrap/Container'

import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


export const Page = (props) => (
  <div className={props.className ? classNames('page', props.className) : 'page'}>
    <Loader active={props.loading}/>
    <Container fluid="sm" style={props.style || {}}>
      {props.header && (
        <div className="header-container">
          <h2 className="title">{props.header}</h2>
        </div>
      )}
      {props.children}
    </Container>
  </div>
)

export const LandingPage = (props) => (  // eslint-disable-line
  <div className="landing-page">
    {props.children}
  </div>
)

export const PageContent = (props) => ( // eslint-disable-line
  <div className="page-content">
    {props.children}
  </div>
)

PageContent.Left = (props) => ( // eslint-disable-line
  <div className="left">
    {props.children}
  </div>
)

PageContent.Right = (props) => ( // eslint-disable-line
  <div className="right">
    {props.children}
  </div>
)
