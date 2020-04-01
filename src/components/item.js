import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ComponentSpinner } from 'components/spinner'


const StyledItem = styled.div`
  max-width: ${props => props.maxWidth || "800px"};
  margin: 0px auto 20px auto;
  border: ${props => props.theme.borders.regular};
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.padding || "10px"};
  position: relative;
`;

class Item extends React.Component {
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

export default Item;
