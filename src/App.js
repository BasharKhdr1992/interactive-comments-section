import React, { useContext } from 'react';
import './App.css';
import Comments from './components/comments/Comments';
import Modal from './components/UI/Modal';
import { ModalContext } from './context/ModalContext';
import { CommentContext } from './context/CommentContext';

const App = () => {
  const { modal, closeModal } = useContext(ModalContext);
  const { deleteComment } = useContext(CommentContext);

  const onConfirm = () => {
    deleteComment();
    closeModal();
  };

  return (
    <div className="wrapper">
      {modal && <Modal onCancel={closeModal} onConfirm={onConfirm} />}
      <Comments />
    </div>
  );
};

export default App;
