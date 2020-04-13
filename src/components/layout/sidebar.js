import React from 'react';
import PropTypes from 'prop-types';

import { SideBarButton } from 'components/buttons'
import './sidebar.sass'

var classNames = require('classnames')


class SideBar extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,  // eslint-disable-line
    onSideBarItemClick: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {visible: false}
  }
  toggle(){
    if (this.state.visible) {
      this.setState({ visible: false })
    }
    else {
      this.setState({ visible: true })
    }
  }
  showIfHidden(){
    if (this.state.visible === false) {
      this.setState({ visible: true })
    }
  }
  hideIfShowing(){
    if (this.state.visible === true) {
      this.setState({ visible: false })
    }
  }
  render() {
    return (
      <div className={classNames('sidebar', this.state.visible ? 'visible' : 'invisible')}>
        {this.props.items.map((item) => {
          return (
            <div className="button-container" key={item.id}>
              <SideBarButton
                external={item.external}
                icon={item.icon}
                label={item.label}
                onClick={this.props.onSideBarItemClick}
                url={item.url}
              />
            </div>
          )
        })}
      </div>
    );
  }
}

export default SideBar;
