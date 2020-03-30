import React from 'react';
import styled from 'styled-components';


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
  margin-top: ${props => props.theme.heights.header};
  margin-bottom: ${props => props.theme.heights.footer};
  max-width: ${props => props.maxWidth || "800px"};
`;

const PageContent = styled.div`
  text-align: center;
  margin: 20px auto 20px auto;
`

export const LandingPage = styled.div``;


export class Page extends React.Component {
  render() {
    return (
      <PageContainer maxWidth={this.props.maxWidth}>
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
