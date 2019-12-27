import styled from 'styled-components';
import { Input } from '../../components/Input/styles.css';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #fff;
  position: fixed;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #006064;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  span {
    margin-left: 10px;
  }
`;

export const AgendaBody = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 100px 20px 20px 20px;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  h2 {
    color: #fff;
    margin-top: 20%;
  }
`;

export const SearchContainer = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
`;

export const StyledInput = styled(Input)`
  width: calc(100% - 50px);
`;

export const SearchButton = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: #006064;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.05);
  }
`;
