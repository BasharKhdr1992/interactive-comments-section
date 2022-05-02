import React, { useContext } from 'react';
import Comment from './Comment';
import './Comments.css';
import { CommentContext } from '../../context/CommentContext';
import AddComment from './AddComment';

const Comments = () => {
  const { comments, currentUser } = useContext(CommentContext);

  return (
    <div className="comments-list">
      {comments.map((comment, index) => {
        const marginTop = index === comments.length - 1 ? 'mt-1' : undefined;

        return (
          <Comment key={comment.id} className={marginTop} comment={comment} />
        );
      })}
      <AddComment reply={false} currentUser={currentUser} text={'send'} />
    </div>
  );
};

export default Comments;
