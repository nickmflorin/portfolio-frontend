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

  &:hover {
    filter: brightness(0.6)
  }
`;

const SocialIconImage = styled.img`
  content: ${props => 'url("' + props.icon + '")'};
  height: 30px;
  width: 30px;
`;


class SocialIcon extends React.Component {
  render() {
      console.log(this.props.icon)
      return (
        <SocialIconContainer>
          <SocialIconLink href={this.props.url}>
            <SocialIconImage icon={this.props.icon} />
          </SocialIconLink>
        </SocialIconContainer>
      )
  }
}

export default SocialIcon;
