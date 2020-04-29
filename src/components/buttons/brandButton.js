import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import BrandLogo from 'media/icons/BrandLogo.png';
import { closeSidebarAction } from "../../actions";
import { Logo } from 'components/image';

const BrandButton = (props) => (  // eslint-disable-line
  <Link className="brand-button" to={props.to}>
    <Logo onClick={props.closeSidebar} src={BrandLogo}/>
  </Link>
)

const mapStateToProps = () => {};

const mapDispatchToProps = {
  closeSidebar: () => closeSidebarAction(),
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandButton);
