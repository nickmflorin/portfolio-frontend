import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Loader } from 'semantic-ui-react'

var classNames = require('classnames');


const Container = (props) => (
  <div className='container' style={props.style}>
    {props.header && (
      <div className='header-container'>
        <h3 className='header'>{props.header}</h3>
      </div>
    )}
    <div className='container-content'>
      {props.children}
    </div>
  </div>
)


export const Page = (props) => (
  <div className={props.className ? classNames('page', props.className) : 'page'}>
    <Loader active={props.loading}/>
    <div className='page-content'>
      <Container {...props} />
    </div>
  </div>
)
