import React from 'react';
import styled from 'styled-components';

import headshot from './headshot.png';

import './headshot.sass'


class Headshot extends React.Component {
  render() {
      return (
        <div className="headshot-container">
          <img className="headshot" src={headshot}/>
        </div>
      )
  }
}

export default Headshot;
