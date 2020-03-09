import React, { Component } from 'react';
import _ from 'underscore'

import landing from './landing.jpeg';
import './landing.css'

function TitleComponent(props){
  const separator = "|"
  if(props.index != 2){
    return <span>{props.text} <span className="separator"> {separator} </span> </span>
  }
  return <span>{props.text}</span>
}

function Title(props) {
  const TitleComponents = props.components.map((text, index) =>
    <TitleComponent key={index} text={text} index={index} />
  );
  return <h2 className="title"> {TitleComponents} </h2>
}

class BackDrop extends Component {
  render() {
    return (
        <div className="backdrop-image-container tint">
          <img className="landing-image" src={landing} />
        </div>
    );
  }
}

class BackDropBody extends Component {
  components = ['Engineer','Technologist','Developer']

  render() {
    return (
      <div className="backdrop-body">
          <Title components={this.components} />
          <div className="social-icons-container">
            <div className="social-icon-container">
              <a className="social-icon" href="https://github.com/nickmflorin">
                <div className="github"></div>
              </a>
            </div>
            <div className="social-icon-container">
              <a className="social-icon linkedin" href="http://linkedin.com/"></a>
            </div>
          </div>
      </div>
    );
  }
}

class Landing extends Component {
  render() {
    return (  
      <div className="landing-banner">
        <BackDrop />
        <BackDropBody />
      </div>
    )
  }
}
export default Landing;