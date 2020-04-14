import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { Modal } from 'semantic-ui-react'

import './tags.sass'


const TagModal = (props) => (
  <Modal closeIcon dimmer={"inverted"} onClose={props.onClose} open={props.open} size={"tiny"}>
    <Modal.Header>{props.name}</Modal.Header>
    <Modal.Content>
      <p className="modal-description">{props.description}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={props.onClose} variant="primary">{"Ok"}</Button>
    </Modal.Actions>
  </Modal>
)


const TagButton = (props) => (
  <a className="tag-button" onClick={props.onClick}>
    {props.children}
  </a>
)

const Tag = (props) => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false)
  const handleClick = () => setOpen(true)

  if (props.description) {
    return (
      <React.Fragment>
        <TagModal
          description={props.description}
          name={props.name}
          onClose={onClose}
          open={open}
        />
        <TagButton onClick={handleClick}>
          <div className="tag">
            <p>{props.children}</p>
          </div>
        </TagButton>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <TagModal/>
        <div className="tag">
          <p>{props.children}</p>
        </div>
      </React.Fragment>
    )
  }
}


class Tags extends React.Component {  // eslint-disable-line
  static propTypes = {
    items: PropTypes.array.isRequired,  // eslint-disable-line
  }
  render(){
    return (
      <div className="tags">
        {this.props.items.map((item, index) => (
          <Tag
            description={item.description}
            id={item.id}
            key={item.id}
            name={item.name}
          >{item.name}
          </Tag>
        ))}
      </div>
    )
  }
}

export default Tags;
