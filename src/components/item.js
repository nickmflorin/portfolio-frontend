import React from 'react';
import PropTypes from 'prop-types';

import './item.scss'

var classNames = require('classnames')


class IconizedText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object, // Is this right?
    fontFamily: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className={classNames('iconized-text', this.props.className)}>
        {this.props.icon &&
          <div className="icon-container">
            {this.props.icon}
          </div>
        }
        <p className="text">{this.props.text}</p>
      </div>
    )
  }
}


class ResumeItem extends React.Component {
  static defaultProps = {
    header_items: [],
    footer_items: [],
  }
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string.isRequired,
    header_items: PropTypes.array,
    footer_items: PropTypes.array,
    description: PropTypes.string,
  };
  render() {
    // TODO: Create an icon for logos that could not be loaded.
    return (
      <div className='item'>
        <div className='left-container'>
          <img className='image' alt="Could not Load" src={this.props.logo} />
        </div>
        <div className='right-container'>
          <p className='title'>{this.props.title}</p>
          <p className='sub-title'>{this.props.sub_title}</p>
          <div className="header-items">
            {this.props.header_items.map((item) => {
              return (
                  <IconizedText
                    text={item.text}
                    icon={item.icon || null}
                    className="opensans"
                  />
              )
            })}
          </div>
          {this.props.description &&
            <p className='description'>
              {this.props.description}
            </p>
          }
          <div className="footer-items">
            {this.props.footer_items.map((item) => {
              return (
                  <IconizedText
                    text={item.text}
                    icon={item.icon || null}
                    className="roboto"
                  />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default ResumeItem;
