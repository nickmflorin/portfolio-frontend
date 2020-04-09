import React from 'react';
import dompurify from 'dompurify';


const SafeInjection = (html) => {
  const sanitizer = dompurify.sanitize;
  return {__html: sanitizer(html)}
}

export const HtmlDescription = (props) => {
  return (
    <p
      className="description"
      dangerouslySetInnerHTML={SafeInjection(props.children)}
    />
  )
}


export const HtmlHeader = (props) => {
  const CustomTag = `${props.tag}`
  return (
    <CustomTag
      dangerouslySetInnerHTML={SafeInjection(props.children)}
      className={props.className}
    />
  )
}

export const HtmlCaption = (props) => {
  return (
    <p
      className="caption"
      dangerouslySetInnerHTML={SafeInjection(props.children)}
    />
  )
}
