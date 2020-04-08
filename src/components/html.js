import React from 'react';
import dompurify from 'dompurify';

import { IconizedHeader } from 'components/icons'


export const HtmlDescription = (props) => {
  const sanitizer = dompurify.sanitize;
  return <p className='description' dangerouslySetInnerHTML={{__html: sanitizer(props.children)}}></p>
}
