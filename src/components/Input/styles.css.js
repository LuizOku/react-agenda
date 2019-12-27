import styled from 'styled-components';

export const Input = styled.input`
  height: 35px;
  border: none;
  border-bottom: ${(props) => (props.hasError ? '2px solid #D50000' : '1px solid #212121')};
`;
