import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledFileLink = styled.a`
  display: block;
  margin-bottom: 2px;
`;


class FileLink extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }
  render() {
      return (
        <StyledFileLink
          className='smaller'
          href={this.props.url}
        >{this.props.label}</StyledFileLink>
      )
  }
}

export default FileLink;
