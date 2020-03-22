import React from 'react';
import styled from 'styled-components';

import headshot from './headshot.png';


const HeadShotContainer = styled.div`
  display: inline-block;
  position: relative;
  background: white;
  clip-path: circle(75px at center);
  -webkit-clip-path: circle(75px at center);
  width: 150px;
  height: 150px;
`;

const HeadShotImage = styled.img`
  clip-path: circle(73px at center);
  -webkit-clip-path: circle(73px at center);
  width: 146px;
  height: 146px;
  position: absolute;
  top: 2px; /* equal to border thickness */
  left: 2px; /* equal to border thickness */

  &:hover {
    filter: brightness(0.6)
  }
`;


class Headshot extends React.Component {
  render() {
      return (
        <HeadShotContainer>
          <HeadShotImage src={headshot}/>
        </HeadShotContainer>
      )
  }
}

export default Headshot;
