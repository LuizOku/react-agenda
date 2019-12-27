import React from 'react';

import { CardContainer, IconContainer, InfoContainer } from './styles.css';

const Card = ({
 icon, name, email, phone, onCardClick
}) => (
  <CardContainer onClick={onCardClick}>
    <IconContainer>{icon}</IconContainer>
    <InfoContainer>
      <div>
        <b>Nome: </b>
        {name}
      </div>
      <div>
        <b>Email: </b>
        {email}
      </div>
      <div>
        <b>Celular: </b>
        {phone}
      </div>
    </InfoContainer>
  </CardContainer>
);

export default Card;
