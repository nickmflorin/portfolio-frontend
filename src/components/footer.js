import React from 'react';
import styled from 'styled-components';

import { FOOTER } from 'config'


const StyledFooter = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${props => props.theme.colors.footer};
  border-top: ${props => props.theme.borders.dark};
  height: ${props => props.theme.heights.footer}
`;

const StyledFooterContent = styled.p`
  line-height: ${props => props.theme.heights.footer};
  color: ${props => props.theme.colors.white};
  font-size: 12px;
  text-align: center;
`;

class Footer extends React.Component {
  render() {
    return (
      <StyledFooter>
        <StyledFooterContent>
          {FOOTER}
        </StyledFooterContent>
      </StyledFooter>
    )
  }
}

export default Footer;
