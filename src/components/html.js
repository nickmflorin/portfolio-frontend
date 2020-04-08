import React from 'react';
import { IconizedHeader } from 'components/icons'


export const HtmlDescription = (props) => (
  <p className='description' dangerouslySetInnerHTML={{__html: props.children}}></p>
)
