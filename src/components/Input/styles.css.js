import styled from 'styled-components';

import MaskedInput from 'react-text-mask';

export const Input = styled.input`
  height: 35px;
  width: 100%;
  border: none;
  border-bottom: ${(props) => (props.haserror ? '2px solid #D50000' : '1px solid #212121')};
`;

export const StyledMaskedInput = styled(MaskedInput)`
  height: 35px;
  width: 100%;
  border: none;
  border-bottom: ${(props) => (props.haserror ? '2px solid #D50000' : '1px solid #212121')};
`;
