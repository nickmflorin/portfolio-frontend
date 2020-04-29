import React from "react";
import styled from "styled-components";

const SocialIcon = styled.img`
  content: ${props => 'url("' + props.icon + '")'};
`

const SocialLink = (props) => (  // eslint-disable-line
  <div className="social-link-container">
    <a className="social-link" href={props.url}>
      <SocialIcon className="icon" icon={props.icon} />
    </a>
  </div>
)

export default SocialLink;
