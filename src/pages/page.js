import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


export const Page = (props) => (
  <div className={props.className ? classNames('page', props.className) : 'page'}>
    <Loader active={props.loading}/>
    <Container style={props.style || {}}>
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
  <Row>
    {props.children}
  </Row>
)

Page.Content = PageContent

PageContent.Left = (props) => ( // eslint-disable-line
  <Col lg={2} md={2} xl={2}>
    {props.children}
  </Col>
)

PageContent.Right = (props) => ( // eslint-disable-line
  <Col lg={10} md={10} sm={12} xl={10}>
    {props.children}
  </Col>
)
