import React from 'react';
import './Voting.css';
import assets from './../../assets';

const Voting = ({ score, onUpVoting, onDownVoting, className }) => {
  return (
    <div className={`voting ${className}`}>
      <button className="btn-voting" onClick={onUpVoting}>
        <img src={assets.plus} alt="plus" />
      </button>
      <p className="votes">{score}</p>
      <button className="btn-voting" onClick={onDownVoting}>
        <img src={assets.minus} alt="minus" />
      </button>
    </div>
  );
};

export default Voting;
