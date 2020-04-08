import React from 'react';
import Container from 'react-bootstrap/Container'

import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


export const Page = (props) => (
  <div className={props.className ? classNames('page', props.className) : 'page'}>
    <Loader active={props.loading}/>
    <Container fluid="sm" style={props.style || {}}>
      {props.header && (
        <div className='header-container'>
          <h1 className='header bold'>{props.header}</h1>
        </div>
      )}
      {props.children}
    </Container>
  </div>
)
