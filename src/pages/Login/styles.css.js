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
  background: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  flex-direction: column;
`;

export const LoginHeader = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
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
    color: #D50000;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 30px;
`;
