import styled from 'styled-components';
import { Button } from '../../components/Button/styles.css';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoginContainer = styled.div`
  width: 400px;
  height: 400px;
  padding: 0 70px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  flex-direction: column;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
`;

export const LoginHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #006064;
  span {
    margin-left: 10px;
  }
`;

export const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  span {
    margin-top: 10px;
    text-align: center;
    color: #d50000;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 30px;
`;
