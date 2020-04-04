import React from 'react';
import styled from 'styled-components';

import { FOOTER } from 'config'


class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className='content'>{FOOTER}</div>
      </footer>
    )
  }
}

export default Footer;
