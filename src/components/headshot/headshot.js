import React from 'react';
import styled from 'styled-components';

import headshot from './headshot.png';


const HeadShotContainer = styled.div`
  display: inline-block;
  position: relative;
  background: white;
  clip-path: circle(45px at center);
  -webkit-clip-path: circle(45px at center);
  width: 90px;
  height: 90px;

  @media screen and (min-width: 320px){
    width: 110px;
    height: 110px;
    clip-path: circle(55px at center);
    -webkit-clip-path: circle(55px at center);
  }

  @media screen and (min-width: 768px){
    width: 130px;
    height: 130px;
    clip-path: circle(65px at center);
    -webkit-clip-path: circle(65px at center);
  }

  @media screen and (min-width: 1200px){
    width: 150px;
    height: 150px;
    clip-path: circle(75px at center);
    -webkit-clip-path: circle(75px at center);
  }
`;

const HeadShotImage = styled.img`
  position: absolute;
  top: 2px; /* equal to border thickness */
  left: 2px; /* equal to border thickness */

  clip-path: circle(43px at center);
  -webkit-clip-path: circle(43px at center);
  width: 86px;
  height: 86px;

  &:hover {
    filter: brightness(0.6)
  }

  @media screen and (min-width: 320px){
    width: 106px;
    height: 106px;
    clip-path: circle(53px at center);
    -webkit-clip-path: circle(53px at center);
  }

  @media screen and (min-width: 768px){
    width: 126px;
    height: 126px;
    clip-path: circle(63px at center);
    -webkit-clip-path: circle(63px at center);
  }

  @media screen and (min-width: 1200px){
    width: 146px;
    height: 146px;
    clip-path: circle(73px at center);
    -webkit-clip-path: circle(73px at center);
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
