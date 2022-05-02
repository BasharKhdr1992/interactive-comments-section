import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = (props) => {
  const [modal, setModal] = useState(false);

  const closeModal = () => setModal(false);
  const showModal = () => setModal(true);

  return (
    <ModalContext.Provider value={{ modal, showModal, closeModal }}>
      {props.children}
    </ModalContext.Provider>
  );
};
