import React from 'react';
import styled from 'styled-components';

import { FOOTER } from 'config'


const StyledFooter = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${props => props.theme.colors.footer};
  color: ${props => props.theme.colors.white};
  border-top: ${props => props.theme.borders.dark};
  height: ${props => props.theme.heights.footer}
`;

const StyledFooterContent = styled.p`
  line-height: ${props => props.theme.heights.footer};
  color: ${props => props.theme.colors.white};
  font-size: 12px;
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
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
