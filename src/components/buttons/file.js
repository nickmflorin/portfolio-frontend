import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledFileLink = styled.a`
  color: ${props => props.theme.colors.blue};
  display: block;
  margin-bottom: 2px;

  &:hover {
    color: ${props => props.theme.colors.bluehover};
    text-decoration: underline;
  }
`;


class FileLink extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }
  render() {
      console.log(this.props.url)
      return (
        <StyledFileLink href={this.props.url}>{this.props.label}</StyledFileLink>
      )
  }
}

export default FileLink;
