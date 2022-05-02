import React from 'react';

const IconButton = ({ icon, alt, text, onClick }) => {
  return (
    <button className="btn-icon" onClick={onClick}>
      <img src={icon} alt={alt} />
      &nbsp;&nbsp;
      {text}
    </button>
  );
};

export default IconButton;
