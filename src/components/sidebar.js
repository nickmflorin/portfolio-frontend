import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { pixelfy } from 'utils'
import { getProfile } from 'services'

import { SideBarButton } from './buttons'

import './sidebar.sass'

var classNames = require('classNames')


class SideBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { resume_url: null }
  }
  componentWillMount() {
    var self = this
    getProfile().then((response) => {
      self.setState({ resume_url: response.resume })
    }).catch((error) => {
      console.error('There was an error loading the resume.')
    })
  }
  render() {
    return (
      <div className={classNames('sidebar', this.props.visible ? 'visible' : 'invisible')}>
        {this.props.items.map((item) => {
          return (
            <div className='button-container' key={item.id}>
              <SideBarButton
                url={item.link}
                label={item.label}
              />
            </div>
          )
        })}
      </div>
    );
  }
}

export default SideBar;
