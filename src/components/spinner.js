import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import Spinner from 'react-bootstrap/Spinner'


const PageSpinnerContainer = styled.div`
  position: fixed;
  top: calc(50vh - 30px);
  left: calc(50vw - 30px);
  z-index: 10000;
  width: 60px;
  height: 60px;
`;

const ComponentSpinnerContainer = styled(PageSpinnerContainer)`
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
`;


export class PageSpinner extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    loading: false,
  }
  render() {
    if (this.props.loading) {
      return (
        <React.Fragment>
        <PageSpinnerContainer>
          <Spinner animation="border" variant="primary" size="md">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </PageSpinnerContainer>
        {this.props.children}
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      )
    }
  }
}

export class ComponentSpinner extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    show: true,
  }
  render() {
    if (this.props.loading) {
      return (
        <ComponentSpinnerContainer>
          <Spinner animation="border" variant="primary" size="sm">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </ComponentSpinnerContainer>
      )
    }
    else {
      return (
        <ComponentSpinnerContainer />
      )
    }
  }
}
