import React from 'react';
import styled from 'styled-components';


const PageContainer = styled.div`
  padding: 25px;
  margin-top: ${props => props.theme.heights.header};
  margin-bottom: ${props => props.theme.heights.footer};
  background-color: ${props => props.theme.colors.background};
  height: 100%;
`;


export const LandingPage = styled.div``;


export class Page extends React.Component {
  render() {
    return (
      <PageContainer>
        <h2>{this.props.header}</h2>
        {this.props.children}
      </PageContainer>
    )
  }
}
