import React from 'react';
import PropTypes from 'prop-types';

import './item.scss'


class ResumeItem extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string.isRequired,
    sub_title_2: PropTypes.string,
    sub_title_3: PropTypes.string,
    sub_title_4: PropTypes.string,
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
          <p className='align-left title'>{this.props.title}</p>
          <p className='align-left sub-title'>{this.props.sub_title}</p>
          {this.props.sub_title_2 &&
            <p className='align-left sub-title-2'>{this.props.sub_title_2}</p>
          }
          {this.props.sub_title_3 &&
            <p className='align-left sub-title-3'>{this.props.sub_title_3}</p>
          }
          {this.props.sub_title_4 &&
            <p className='align-left sub-title-4'>{this.props.sub_title_4}</p>
          }
          {this.props.description &&
            <p className='align-left description'>
              {this.props.description}
            </p>
          }
        </div>
      </div>
    )
  }
}

export default ResumeItem;
