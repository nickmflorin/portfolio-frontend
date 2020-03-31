import React from 'react';
import styled, { withTheme } from 'styled-components';

import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

const override = css``;

const SpinnerContainer = styled.div`
  position: ${props => (props.position || "fixed")};
  top: ${props => props.size ? (`calc(50vh - ${props.size/2}px)`) : "calc(50vh - 30px)"};
  left: ${props => props.size ? (`calc(50vw - ${props.size/2}px)`) : "calc(50vw - 30px)"};
`;

class Spinner extends React.Component {
  render() {
    return (
      // TODO: Adjust the size.

      // NOTE: There seems to be some confusion between the parameters provided
      // to FadeLoader and the ones defined by CSS.  Regardless of the `size`, the
      // spinner is 60px x 60px.  Also, not really sure what the override is for,
      // since that doesn't seem to be having an effect with values populated.
      <SpinnerContainer {...this.props}>
        <FadeLoader
          css={override}
          size={this.props.size || 60}
          color={this.props.color || this.props.theme.colors.blue}
          loading={this.props.loading}
        />
      </SpinnerContainer>
    )
  }
}


export default withTheme(Spinner);
