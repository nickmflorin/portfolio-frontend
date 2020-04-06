import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container'

import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


export const Page = (props) => (
  <div className={props.className ? classNames('page', props.className) : 'page'}>
    <Loader active={props.loading}/>
    <Container fluid="sm" style={props.style || {}}>
      {props.header && (
        <div className='header-container'>
          <h3 className='header'>{props.header}</h3>
        </div>
      )}
      {props.children}
    </Container>
  </div>
)
