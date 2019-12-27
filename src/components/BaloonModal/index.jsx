import React from 'react';

import {
  Container, ModalContainer, ModalHeader, ModalFooter, ModalBody, DeleteButton
} from './styles.css';
import { Button } from '../Button/styles.css';

const BaloonModal = ({
  isVisible, title, showDeleteButton, children, cancelAction, saveAction, deleteAction
}) => (
  <>
    {isVisible && (
      <Container>
        <ModalContainer>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            {showDeleteButton && (
              <DeleteButton onClick={deleteAction}>Apagar</DeleteButton>
            )}
            <Button onClick={cancelAction}>Cancelar</Button>
            <Button onClick={saveAction}>Salvar</Button>
          </ModalFooter>
        </ModalContainer>
      </Container>
    )}
  </>
);

export default BaloonModal;
