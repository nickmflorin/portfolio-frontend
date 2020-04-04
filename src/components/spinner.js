import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import Spinner from 'react-bootstrap/Spinner'
import './spinner.sass'


export const PageSpinner = (props) => {
  if (props.show) {
    return (
      <React.Fragment>
        <div className='spinner-container'>
          <Spinner animation="border" variant="primary" size="md">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
        {props.children}
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }
}

export const ComponentSpinner = (props) => {
  if (props.show) {
    return (
      <div className='spinner-container component'>
        <Spinner animation="border" variant="primary" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  }
  else {
    return (
      <ComponentSpinnerContainer />
    )
  }
}
