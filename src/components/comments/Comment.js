import React, { useContext, useState } from 'react';
import { CommentContext } from '../../context/CommentContext';
import './Comment.css';
import Voting from './Voting';
import assets from '../../assets';
import AddComment from './AddComment';
import IconButton from '../UI/IconButton';
import { ModalContext } from '../../context/ModalContext';
import Button from '../UI/Button';
import TextArea from './../UI/TextArea';

const RenderEditForm = ({ content, onChange, onSubmit }) => {
  return (
    <div className="edit-form">
      <TextArea className="textarea" value={content} onChange={onChange} />
      <div className="edit-form-btn-section">
        <Button onClick={onSubmit} className="btn btn-primary">
          Update
        </Button>
      </div>
    </div>
  );
};

const getDate = (date) => {
  if (typeof date === 'number') {
    let distance = new Date().getTime() - date;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (seconds === 0 && minutes === 0 && hours === 0 && days === 0)
      return 'Now...';
    else if (seconds > 0 && minutes === 0) return `${seconds} seconds ago...`;
    else if (minutes > 0 && hours === 0) return `${minutes} minutes ago...`;
    else if (hours > 0 && days === 0) return `${hours} hours ago...`;
    else if (days > 0) return `${days} days ago...`;
  } else {
    return date;
  }
};

const RenderComment = ({
  comment,
  commentId,
  isReply,
  currentUser,
  toggleReply,
  showModal,
}) => {
  const [onEdit, setOnEdit] = useState(false);
  const [updatedContent, setupdatedContent] = useState(comment.content);
  const { editComment, upVote, downVote } = useContext(CommentContext);

  const handleEditing = (e) => {
    setupdatedContent(e.target.value);
  };

  const onToggleEdit = () => {
    setOnEdit((prev) => !prev);
  };

  const updateContent = () => {
    if (isReply) {
      editComment({ commentId, replyId: comment.id, content: updatedContent });
    } else {
      editComment({ commentId: comment.id, content: updatedContent });
    }

    setOnEdit(false);
  };

  const renderDelete = currentUser.username === comment.user.username && (
    <IconButton
      icon={assets.iconDelete}
      alt="delete"
      text={'Delete'}
      onClick={showModal}
    />
  );
  const renderEdit = currentUser.username === comment.user.username && (
    <IconButton
      icon={assets.edit}
      onClick={onToggleEdit}
      alt="edit"
      text={'Edit'}
    />
  );

  const renderTag = currentUser.username === comment.user.username && (
    <div className="tag">you</div>
  );

  const renderReply = !(currentUser.username === comment.user.username) && (
    <IconButton
      icon={assets.reply}
      alt="reply"
      text={'Reply'}
      onClick={toggleReply}
    />
  );

  const onUpVoting = () => {
    if (isReply) {
      upVote({
        commentId,
        replyId: comment.id,
      });
    } else {
      upVote({ commentId: comment.id });
    }
  };

  const onDownVoting = () => {
    if (isReply) {
      downVote({
        commentId,
        replyId: comment.id,
      });
    } else {
      downVote({ commentId: comment.id });
    }
  };

  return (
    <div className={`comment-wrapper`}>
      <Voting
        className={'voting-bg'}
        score={comment.score}
        onDownVoting={onDownVoting}
        onUpVoting={onUpVoting}
      />
      <div className="comment">
        <div className="meta-row">
          <div className="user-info">
            <img
              src={`${comment.user.image.png}`}
              className="avatar"
              alt={comment.user.username}
            />
            <p className="username">{comment.user.username}</p>
            {renderTag}
            <em className="created-at">
              {comment.edited
                ? `edited ${getDate(comment.createdAt)}`
                : getDate(comment.createdAt)}
            </em>
          </div>
          <div className="btn-section collapse">
            {renderDelete}
            {renderEdit}
            {renderReply}
          </div>
        </div>
        {onEdit ? (
          <RenderEditForm
            content={updatedContent}
            onChange={handleEditing}
            onSubmit={updateContent}
          />
        ) : (
          <p className="content">
            {isReply && (
              <span className="reply-to">{`@${comment.replyingTo} `}</span>
            )}
            {comment.content}
          </p>
        )}
        <div className="action-bar-m">
          <div className="btn-section">
            {renderDelete}
            {renderEdit}
            {renderReply}
          </div>
          <Voting
            className={'voting-sm'}
            score={comment.score}
            onDownVoting={onDownVoting}
            onUpVoting={onUpVoting}
          />
        </div>
      </div>
    </div>
  );
};

const RenderReply = ({ reply, currentUser, className, commentId }) => {
  const [showReply, setShowReply] = useState(false);
  const { setCommentId, setReplyId } = useContext(CommentContext);
  const { showModal } = useContext(ModalContext);

  const toggleReply = () => setShowReply(!showReply);

  const setReplyToDelete = () => {
    showModal();
    setCommentId(commentId);
    setReplyId(reply.id);
  };

  return (
    <div className={`reply ml-2 ${className}`}>
      <RenderComment
        toggleReply={toggleReply}
        currentUser={currentUser}
        comment={reply}
        commentId={commentId}
        isReply={true}
        showModal={setReplyToDelete}
      />
      {showReply && (
        <AddComment
          currentUser={currentUser}
          commentId={commentId}
          isReply={true}
          showReply={showReply}
          replyingTo={reply.user.username}
          toggleReply={toggleReply}
          text={'reply'}
        />
      )}
    </div>
  );
};

// Entry point --->
const Comment = ({ comment, className }) => {
  const { currentUser, setCommentId } = useContext(CommentContext);
  const [showReply, setShowReply] = useState(false);
  const { showModal } = useContext(ModalContext);

  const toggleReply = () => {
    setShowReply(!showReply);
  };

  const setCommentToDelete = () => {
    showModal();
    setCommentId(comment.id);
  };

  return (
    <div className={`comment-container ${className}`}>
      <RenderComment
        toggleReply={toggleReply}
        comment={comment}
        isReply={false}
        key={comment.id}
        currentUser={currentUser}
        showModal={setCommentToDelete}
      />
      {showReply && (
        <AddComment
          isReply={true}
          commentId={comment.id}
          currentUser={currentUser}
          text={'reply'}
          replyingTo={comment.user.username}
          showReply={showReply}
          toggleReply={toggleReply}
        />
      )}
      {comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply, index) => {
            const marginBottom =
              index === comment.replies.length - 1 ? 'mb-0' : undefined;

            return (
              <RenderReply
                key={reply.id}
                commentId={comment.id}
                reply={reply}
                className={marginBottom}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
