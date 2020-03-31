import React from 'react';
import styled from 'styled-components';

import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

// NOTE: There seems to be some confusion between the parameters provided
// to FadeLoader and the ones defined by CSS.  Regardless of the `size`, the
// spinner is 60px x 60px.  Setting the border-color on the CSS is unclear.

// TODO: Adjust the size.

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const SpinnerContainer = styled.div`
  position: fixed;
  top: calc(50vh - 30px);
  left: calc(50vw - 30px);
`;

class Spinner extends React.Component {
  render() {
    // TODO: Export withTheme(Spinner) so we can access the color directly from
    // the maps.
    return (
      <SpinnerContainer>
        <FadeLoader
          css={override}
          size={50}
          color={"#2196f3"}
          loading={this.props.loading}
        />
      </SpinnerContainer>
    )
  }
}

export default Spinner;
