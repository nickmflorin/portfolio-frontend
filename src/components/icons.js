import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './icons.sass'
var classNames = require('classnames')


const conditionalClassNames = (props, ...constantClassNames) => {
  if (props.className) {
    return classNames(props.className, ...constantClassNames)
  }
  return classNames(...constantClassNames)
}


class IconizedText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    color: PropTypes.string,
  }
  render() {
    return (
        <p className={conditionalClassNames(this.props, 'iconized-text')} style={this.props.style}>
          <span className='icon-container'>
            <FontAwesomeIcon className='icon' icon={this.props.icon}/>
          </span>
          <span className='text'>
            {this.props.text}
          </span>
        </p>
    )
  }
}

export default IconizedText;
