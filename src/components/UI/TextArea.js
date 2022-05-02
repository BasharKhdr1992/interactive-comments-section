import React from 'react';
import './TextArea.css';

const TextArea = ({ onChange, value, isReply }) => {
  return (
    <textarea
      placeholder={!isReply ? 'Add a comment...' : ''}
      className="textarea"
      onChange={onChange}
      value={value}
      cols={8}
    />
  );
};

export default TextArea;
