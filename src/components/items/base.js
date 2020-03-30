import styled from 'styled-components';


export const Item = styled.div`
  display: flex;
  max-width: ${props => props.maxWidth || "800px"};
  margin: 0px auto 20px auto;
  border: ${props => props.theme.borders.regular};
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white};
  padding: 10px;
`;

export const LogoContainer = styled.a`
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  padding: 10px;
  display: inline-block;
`;

export const Logo = styled.img`
  height: 100%;
  width: 100%;
`;

export const DetailContainer = styled.div`
  padding: 12px;
  text-align: left;
  display: inline-block;

  div:last-child {
    margin-bottom: 0px !important;
  }
`;
