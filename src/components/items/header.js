import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { IconizedText } from 'components/icons'


const StyledHeader = styled.div`
  display: inline-block;
  margin-bottom: 16px;

  div:last-child {
    margin-bottom: 0px !important;
  }
`;

const Title = styled.h3`
  margin-bottom: 8px;
`;

const SubTitle = styled.h5`
  margin-bottom: 8px;
`

const Descriptions = styled.div`
  p:last-child {
    margin-bottom: 0px !important;
  }
`;

export const Description = styled.p`
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.text_tertiary};
  margin-bottom: 8px;
  text-align: left;
`;

const HeaderItems = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const HeaderItem = styled.div`
  margin-right: 12px;
`;


class Header extends React.Component {
  static defaultProps = {
    descriptions: [],
    items: [],
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    sub_title: PropTypes.string,
    descriptions: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
  }
  render(){
    return (
      <StyledHeader>
        <Title>{this.props.title}</Title>
        {(this.props.sub_title != 0) && (
          <SubTitle>{this.props.sub_title}</SubTitle>
        )}
        {(this.props.descriptions.length != 0) && (
          <HeaderItems>
            {this.props.items.map((item) => {
              return (item.text &&
                <HeaderItem key={item.id}>
                  <IconizedText text={item.text} icon={item.icon} size={12} />
                </HeaderItem>
              )
            })}
          </HeaderItems>
        )}
        {(this.props.descriptions.length != 0) && (
          <Descriptions>
            {this.props.descriptions.map((desc, index) => {
              if(desc){
                  return <Description key={index}>{desc}</Description>
              }
            })}
          </Descriptions>
        )}
      </StyledHeader>
    )
  }
}

export default Header;
