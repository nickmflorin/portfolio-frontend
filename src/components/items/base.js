import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ComponentSpinner } from 'components/spinner'


export const ItemsContainer = styled.div`
  > div:last-child {
    margin-bottom: 0px !important;
  }
`;

const StyledItem = styled.div`
  max-width: ${props => props.maxWidth || "800px"};
  margin: 0px auto 20px auto;
  border: ${props => props.theme.borders.regular};
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white};
  position: relative;
  text-align: left;

  padding: ${props => props.padding || "10px"};

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    padding: ${props => props.padding || "20px"};
  }
`;


export class Item extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    loading: false
  }
  render(){
    return (
      <StyledItem {...this.props}>
        <ComponentSpinner show={this.props.loading} />
        {this.props.children}
      </StyledItem>
    )
  }
}
