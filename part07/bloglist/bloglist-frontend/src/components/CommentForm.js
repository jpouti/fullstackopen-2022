import { useState } from "react";

const CommentForm = ({ createComment, id }) => {
  const [comment, setComment] = useState("");
  const handleAddComment = async (event) => {
    event.preventDefault();
    createComment(comment, id);
    setComment("");
  };
  return (
    <div>
      <form onSubmit={handleAddComment}>
        <div className="flex-container">
          <input
            type="text"
            value={comment}
            placeholder="comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
