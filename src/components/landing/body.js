import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LandingCommentForm } from 'components/forms'


const LandingBodyContainer = styled.div`
  position: relative;
  height: ${props => (`${100 - props.theme.heights.banner}vh`)};
  margin-top: ${props => (`${-1 * (props.theme.heights.banner)}vh`)};
  padding: 40px;
  margin-bottom: 20px;
  max-height: ${props => (`calc(${props.theme.heights.banner}vh - ${props.theme.heights.footer})`)};
  overflow-y: scroll;
`;

const LandingBodyContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Intro = styled.h3`
  font-style: italic;
  color: ${props => props.theme.colors.textgray2};
  font-weight: 400;
  line-height: 22px;
  font-size: 16px;
  margin-bottom: 32px;
  text-align: center;
`;

const RequestForComment = styled(Intro)`
  margin-bottom: 28px;
  font-size: 14px;
  font-style: normal;
  color: ${props => props.theme.colors.textgray1};
`;


class LandingBody extends React.Component {
  static propTypes = {
    // Make not required temporarily so we do not hit errors when the API is still
    // loading the results.
    intro: PropTypes.string,
  }
  render(){
    return (
      <LandingBodyContainer>
        <LandingBodyContent>
          <Intro>{this.props.intro}</Intro>
          <RequestForComment>Please leave any comments or suggestions.</RequestForComment>
          <LandingCommentForm />
        </LandingBodyContent>
      </LandingBodyContainer>
    )
  }
}

export default LandingBody;
