import React from 'react';

import { Container } from './styles.css';

const CheckBox = ({ checked, label, onChange }) => (
  <Container>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <label>{label}</label>
  </Container>
);

export default CheckBox;
