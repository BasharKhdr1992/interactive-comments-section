import React, { useContext, useState } from 'react';
import { CommentContext } from '../../context/CommentContext';
import TextArea from '../UI/TextArea';
import './AddComment.css';
import Button from './../UI/Button';
import useWindowSize from '../../custom-hooks/useWindowSize';

const AddComment = ({
  currentUser,
  text,
  isReply,
  replyingTo,
  commentId,
  toggleReply,
}) => {
  const { comment, updateComment, addComment, addReply } =
    useContext(CommentContext);
  const [reply, setReply] = useState('');

  const { width } = useWindowSize();

  const onCommentAdd = () => {
    if (isReply) {
      addReply(reply, replyingTo, commentId);
      toggleReply();
      setReply('');
    } else {
      addComment();
    }
  };
  const onCommentChange = (e) => {
    if (isReply) {
      const content = e.target.value.replace(/@[a-zA-Z0-9]+\s+/, '');
      setReply(content);
    } else {
      updateComment(e.target.value);
    }
  };

  const currentComment = isReply ? `@${replyingTo} ${reply}` : comment;

  return (
    <div className={`add-comment`}>
      {width > 900 && (
        <img
          src={`${currentUser.image.png}`}
          className="avatar"
          alt={currentUser.username}
        />
      )}
      <TextArea
        onChange={onCommentChange}
        isReply={isReply}
        value={currentComment}
      />
      {width > 900 && (
        <Button className="btn btn-primary" onClick={onCommentAdd}>
          {text}
        </Button>
      )}
      <div className="add-comment-sm">
        <img
          src={`${currentUser.image.png}`}
          className="avatar"
          alt={currentUser.username}
        />
        <Button className="btn btn-primary" onClick={onCommentAdd}>
          {text}
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
