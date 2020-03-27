import React from 'react';
import styled from 'styled-components';


const SocialIconContainer = styled.div`
  height: 30px;
  width: 30px;
  margin-left: 10px;
  margin-right: 10px;
`;

const SocialIconLink = styled.a`
  height: 30px;
  width: 30px;
  opacity:1.0;

  &:hover {
    opacity: 0.7;
  }
`;

const SocialIcon = styled.img`
  content: ${props => 'url("' + props.icon + '")'};
  height: 30px;
  width: 30px;
`;


class SocialButton extends React.Component {
  render() {
      return (
        <SocialIconContainer>
          <SocialIconLink href={this.props.url}>
            <SocialIcon icon={this.props.icon} />
          </SocialIconLink>
        </SocialIconContainer>
      )
  }
}

export default SocialButton;
