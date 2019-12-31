import React from 'react';

import { Container } from './styles.css';

const CheckBox = ({ checked, label, onChange, disabled }) => (
  <Container disabled={disabled}>
    <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
    <label>{label}</label>
  </Container>
);

export default CheckBox;
