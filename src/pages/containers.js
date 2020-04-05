import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { pixelfy } from 'utils'
import { Loader } from 'semantic-ui-react'


const HeaderContainer = styled.div`
  margin: 0px auto 20px auto;
  border: ${props => props.theme.borders.regular};
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white};
  padding: 8px;
`;

const Header = styled.h3`
  margin: 0;
  text-align: center;
`

const PageContainer = styled.div`
  padding: 25px;
  margin: 0 auto;
  margin-top: ${props => pixelfy(props.theme.heights.header)};
  max-width: 800px;
`;

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  text-align: center;
  margin: 20px auto 0px auto;
`

export class LandingPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    loading: false,
  }
  render() {
    return (
      <LandingPageContainer>
        <Loader active={this.props.loading}/>
        {this.props.children}
      </LandingPageContainer>
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
      <PageContainer style={this.props.style}>
        <Loader active={this.props.loading}/>
        <HeaderContainer>
          <Header>{this.props.header}</Header>
        </HeaderContainer>
        <PageContent>
          {this.props.children}
        </PageContent>
      </PageContainer>
    )
  }
}
