// External Library imports
import styled from 'styled-components';

// Internal Components imports
import { ItemVV2 } from '../../components/SharedStyling';
import { TextType } from '../../types/otherStyled';

export const DashBoardContainer = styled(ItemVV2)`
  width: 100%;
  height: auto;
  justify-content: flex-start;

  @media (min-width: 310px) {
    padding: 0px 24px !important;
  }
  @media (min-width: 1024px) {
    padding: 0px 70px !important;
  }
`;

export const Text = styled.p<TextType>`
  font-size: ${(props) => props.size || '15px'};
  font-weight: ${(props) => props.weight || 400};
  font-family: 'Strawford', Helvetica, sans-serif;
  color: ${(props) => props.color || props.theme.text.primary};
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  margin-left: ${(props) => props.marginLeft || '0px'};
`;

export const HorizontalLine = styled.div(
  ({ theme }) => `
  display: none;
  height: 0px;
  border: 0.5px solid ${theme.background.timeFilter};
  width: 100%;
  margin: 0 auto;
  @media (max-width: 480px) {
    display: block;
  }
`
);
