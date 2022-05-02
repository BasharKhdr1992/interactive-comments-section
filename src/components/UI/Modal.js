import React from 'react';
import Button from './Button';
import './Modal.css';

const Modal = ({ onConfirm, onCancel, bg }) => {
  return (
    <div className={`modal ${bg}`}>
      <div className="modal-content">
        <h2>Delete Comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and cannot be undone
        </p>
        <div className="btn-row">
          <Button onClick={onCancel} className={'btn btn-cancel'}>
            No, Cancel
          </Button>
          <Button onClick={onConfirm} className={'btn btn-danger'}>
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
