import React, { createContext, useState } from 'react';
import data from '../data/data.json';

export const CommentContext = createContext();

export const CommentPorvider = (props) => {
  const [comments, setComments] = useState(data);
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [replyId, setReplyId] = useState(null);

  const addComment = () => {
    const newComment = {
      id: comments.comments.length + 1,
      content: comment,
      createdAt: new Date().getTime(),
      score: 0,
      user: data.currentUser,
      replies: [],
    };
    setComments((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
    setComment('');
  };

  const updateComment = (value) => {
    setComment(value);
  };

  const addReply = (reply, replyingTo, commentId) => {
    setComments((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) => {
        if (comment.id === commentId) {
          const newReply = {
            id: comment.replies,
            content: reply,
            createdAt: new Date().getTime(),
            replyingTo,
            score: 0,
            user: data.currentUser,
          };

          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }

        return comment;
      }),
    }));
  };

  const deleteComment = () => {
    if (commentId && replyId) {
      setComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            else {
              return {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyId
                ),
              };
            }
          }),
        };
      });
    } else {
      setComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.filter((comment) => comment.id !== commentId),
        };
      });
    }
  };

  const editComment = (obj) => {
    if (obj.commentId && obj.replyId) {
      setComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.map((comment) => {
            if (comment.id !== obj.commentId) return comment;
            else {
              return {
                ...comment,
                replies: comment.replies.map((reply) => {
                  if (reply.id !== obj.replyId) return reply;
                  else {
                    return {
                      ...reply,
                      content: obj.content,
                      createdAt: new Date().getTime(),
                      edited: true,
                    };
                  }
                }),
              };
            }
          }),
        };
      });
    } else {
      setComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.map((comment) => {
            if (comment.id !== obj.commentId) return comment;
            else {
              return {
                ...comment,
                createdAt: new Date().getTime(),
                edited: true,
                content: obj.content,
              };
            }
          }),
        };
      });
    }
  };

  const upVote = (obj) => {
    if (obj.commentId && obj.replyId) {
      setComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.map((comment) => {
            if (obj.commentId !== comment.id) return comment;
            else {
              return {
                ...comment,
                replies: comment.replies.map((reply) => {
                  if (obj.replyId !== reply.id) return reply;
                  else {
                    return {
                      ...reply,
                      score: reply.score + 1,
                    };
                  }
                }),
              };
            }
          }),
        };
      });
    } else {
      setComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.map((comment) => {
            if (obj.commentId !== comment.id) return comment;
            else {
              return {
                ...comment,
                score: comment.score + 1,
              };
            }
          }),
        };
      });
    }
  };
  const downVote = (obj) => {
    if (obj.commentId && obj.replyId) {
      setComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.map((comment) => {
            if (obj.commentId !== comment.id) return comment;
            else {
              return {
                ...comment,
                replies: comment.replies.map((reply) => {
                  if (obj.replyId !== reply.id) return reply;
                  else {
                    return {
                      ...reply,
                      score: reply.score - 1,
                    };
                  }
                }),
              };
            }
          }),
        };
      });
    } else {
      setComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.map((comment) => {
            if (obj.commentId !== comment.id) return comment;
            else {
              return {
                ...comment,
                score: comment.score - 1,
              };
            }
          }),
        };
      });
    }
  };
  return (
    <CommentContext.Provider
      value={{
        comments: comments.comments,
        currentUser: comments.currentUser,
        setComments,
        comment,
        updateComment,
        addComment,
        addReply,
        setCommentId,
        setReplyId,
        deleteComment,
        editComment,
        upVote,
        downVote,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
