import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px !important;
  padding: 20px;
  margin: 20px;
  height: 150px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
`;

export const IconContainer = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #006064;
  font-size: 40px;
  padding-right: 20px;
`;

export const InfoContainer = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  justify-content: space-around;
`;
