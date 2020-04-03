import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 8px;
`;

export const Body = styled.div`
  margin-left: 0px;
  margin-top: 10px;

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    margin-left: 95px;
    margin-top: 0px;
  }

  > div {
    margin-bottom: 15px;
  }

  > div:last-child {
    margin-bottom: 0px;
  }
`;

export const Descriptions = styled.div``;

export const Description = styled.p`
  font-family: ${props => props.theme.fonts.roboto};
  font-weight: ${props => props.theme.fontweights.light};
  color: ${props => props.theme.colors.textTertiary};
  margin-bottom: 8px;
  text-align: left;

  :last-child {
    margin-bottom: 0px !important;
  }
`;

export const LeftContainer = styled.a`
  display: inline-block;
  margin-right: 6px;
  min-width: 60px;
  min-height: 60px;
  max-width: 60px;
  max-height: 60px;

  @media screen and (min-width: ${props => props.theme.responsive.breakSmall}){
    margin-right: 10px;
    min-width: 80px;
    min-height: 80px;
    max-width: 80px;
    max-height: 80px;
  }
`;

export const RightContainer = styled.div`
  padding-top: 5px;
  padding-left: 5px;
  div:last-child {
    margin-bottom: 0px !important;
  }
`;

export const Logo = styled.img`
  height: 100%;
  width: 100%;
`;

export const Title = styled.h3`
  margin-bottom: 8px;
`;

export const SubTitle = styled.h5`
  margin-bottom: 8px;
`

export const HeaderItems = styled.div`
  margin-bottom: 10px;
  display: flex;

  flex-direction: column;
  div:first-child {
    margin-bottom: 4px;
  }
  div:last-child {
    margin-bottom: 0px;
  }

  @media screen and (min-width: 320px){
    flex-direction: column;
    div {
      margin-bottom: 4px;
    }
    div:last-child {
      margin-bottom: 0px;
    }
  }

  @media screen and (min-width: 768px){
    flex-direction: row;
    div {
      margin-bottom: 0px;
    }
  }

  @media screen and (min-width: 1200px){
    flex-direction: row;
    div {
      margin-bottom: 0px;
    }
  }
`;

export const HeaderItem = styled.div`
  margin-right: 12px;
`;
