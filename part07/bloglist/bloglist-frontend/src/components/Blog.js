import Comments from "./Comments";
import CommentForm from "./CommentForm";

const Blog = ({ blog, handleLike, handleDeleteBlog, createComment }) => {
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p id="blog-url">{blog.url}</p>
      <div className="flex-container">
        <p id="blog-likes">{blog.likes} likes </p>
        <button id="like-btn" onClick={() => handleLike(blog)}>
          like
        </button>
      </div>
      <p>{`added by ${blog.user.name}`}</p>
      <button onClick={() => handleDeleteBlog(blog)} id="remove-btn">
        remove
      </button>
      <h3>comments</h3>
      <CommentForm createComment={createComment} id={blog.id} />
      <Comments comments={blog.comments} />
    </div>
  );
};

export default Blog;
