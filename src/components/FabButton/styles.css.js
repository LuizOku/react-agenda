import styled from 'styled-components';

export const FabButton = styled.button`
  height: 60px;
  width: 60px;
  background: #80deea;
  border-radius: 50%;
  border: none;
  color: #006064;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.05);
  }
`;
