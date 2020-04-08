import React from 'react';
import PropTypes from 'prop-types';

import './tags.sass'


class Tag extends React.Component {
  render() {
    return (
      <div color={this.props.color}>
        <p>{this.props.children}</p>
      </div>
    )
  }
}

class Tags extends React.Component {  // eslint-disable-line
  static propTypes = {
    items: PropTypes.array.isRequired,  // eslint-disable-line
  }
  render(){
    return (
      <div className="tags">
        {this.props.items.map((item, index) => {
          return <Tag key={index}>{item}</Tag>
        })}
      </div>
    )
  }
}

export default Tags;
