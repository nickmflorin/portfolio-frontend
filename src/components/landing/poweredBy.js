import React from 'react';

import Beanstalk from 'media/icons/Amazon_Elastic_Beanstalk.png'
import DRF from 'media/icons/Django_Rest_Framework.png'
import Rct from 'media/icons/React.png'

import './poweredBy.sass'


const PoweredBy = (props) => (
  <div className="powered-by">
    <img src={DRF}/>
    <img src={Rct}/>
    <img src={Beanstalk}/>
  </div>
)

export default PoweredBy;
