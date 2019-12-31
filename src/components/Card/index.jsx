import React from 'react';

import { CardContainer, IconContainer, InfoContainer } from './styles.css';

const Card = ({ icon, name, email, phone, onCardClick }) => (
  <CardContainer onClick={onCardClick}>
    <IconContainer>{icon}</IconContainer>
    <InfoContainer>
      {name && (
        <div>
          <b>Nome: </b>
          {name}
        </div>
      )}
      {email && (
        <div>
          <b>Email: </b>
          {email}
        </div>
      )}
      {phone && (
        <div>
          <b>Celular: </b>
          {phone}
        </div>
      )}
    </InfoContainer>
  </CardContainer>
);

export default Card;
