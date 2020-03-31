import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

const override = css``;

const SpinnerContainer = styled.div`
  position: ${props => props.position};
  top: ${props => (`calc(50vh - ${props.size/2}px)`)};
  left: ${props => (`calc(50vw - ${props.size/2}px)`)};
`;

class Spinner extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    position: PropTypes.string,
  }
  static defaultProps = {
    size: 60,
    loading: false,
    position: "fixed"
  }
  render() {
    return (
      // TODO: Figure out how to adjust the size. Regardless of the `size`, the
      // spinner is 60px x 60px.  Also, not really sure what the override is for,
      // since that doesn't seem to be having an effect with values populated.
      <SpinnerContainer position={this.props.position} size={this.props.size}>
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
