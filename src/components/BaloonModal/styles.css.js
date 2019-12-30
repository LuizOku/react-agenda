import styled from 'styled-components';

import { Button } from '../Button/styles.css';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 10;
`;

export const ModalContainer = styled.div`
  height: 450px;
  width: 350px;
  background: #fff;
  border-radius: 15px 15px 0 15px;
  position: fixed;
  bottom: 45px;
  right: 45px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  height: 60px;
  width: 100%;
  background: #80deea;
  border-radius: 15px 15px 0 0;
  color: #006064;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
`;

export const ModalBody = styled.div`
  width: 100%;
  height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  span {
    margin-bottom: 10px;
    text-align: center;
    color: #d50000;
  }
`;

export const ModalFooter = styled.div`
  bottom: 0;
  position: absolute;
  border-top: 1px solid #212121;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  border-radius: 0 0 0 15px;
`;

export const DeleteButton = styled(Button)`
  background: #d50000 !important;
  align-self: flex-start;
`;
