import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { pixelfy } from 'utils'
import { Loader } from 'semantic-ui-react'


export class LandingPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    loading: false,
  }
  render() {
    return (
      <div className='landing-page'>
        <Loader active={this.props.loading}/>
        {this.props.children}
      </div>
    )
  }
}


export class Page extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    loading: false,
  }
  render() {
    return (
      <div className='page' style={this.props.style}>
        <Loader active={this.props.loading}/>
        <div className='page-header-container'>
          <h3 className='page-header'>{this.props.header}</h3>
        </div>
        <div className='page-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
