import React from 'react';

import { FOOTER } from 'config'
import './footer.sass'


const Footer = (props) => {
  return (
    <footer>
      <p className="footer-content">{FOOTER}</p>
    </footer>
  )
}

export default Footer;
