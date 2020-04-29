import React from "react";

import { Logo } from 'components/image';


const LogoLink = (props) => (  // eslint-disable-line
  <a className="logo-link" href={props.href}>
    <Logo src={props.src} />
  </a>
)

export default LogoLink;
