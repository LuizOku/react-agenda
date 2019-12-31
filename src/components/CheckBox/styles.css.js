import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 17px;
  justify-content: flex-start;
  width: 100%;
  color: ${props => props.disabled ? '#9E9E9E' : '#000000'}
  input {
    margin-right: 5px;
  }
`;
