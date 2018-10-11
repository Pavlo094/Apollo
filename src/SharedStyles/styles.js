import { css } from 'styled-components';
import { cssConvert } from 'AppUtils';

export const divAStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const phoneDivStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${props => cssConvert(props.marginTop)}
`;
