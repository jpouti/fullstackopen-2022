const Comments = ({ comments }) => {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div>
      <ul>
        {comments.map((comment) => {
          return <li key={comment._id}>{comment.comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Comments;
