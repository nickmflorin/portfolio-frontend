import React from 'react';
import PropTypes from 'prop-types';

import { SideBarButton } from './buttons'
import './sidebar.sass'

var classNames = require('classNames')


class SideBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    onSideBarClick: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {visible: false}
  }
  toggle(){
    if (this.state.visible) {
      this.hide()
    }
    else {
      this.show()
    }
  }
  hide(){
    this.setState({ visible: false })
  }
  show(){
    this.setState({ visible: true })
  }
  render() {
    return (
      <div className={classNames('sidebar', this.state.visible ? 'visible' : 'invisible')}>
        {this.props.items.map((item) => {
          return (
            <div className='button-container' key={item.id}>
              <SideBarButton
                url={item.url}
                label={item.label}
                external={item.external}
                icon={item.icon}
                onClick={this.props.onSideBarClick}
              />
            </div>
          )
        })}
      </div>
    );
  }
}

export default SideBar;
