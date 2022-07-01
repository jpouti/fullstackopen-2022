import Blogs from "./Blogs";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const Home = ({ createBlog, blogFormRef, user, blogs }) => {
  return (
    <div>
      <div>
        <Togglable showButton="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} blogFormRef={blogFormRef} />
        </Togglable>
      </div>
      <Blogs user={user} blogs={blogs} />
    </div>
  );
};

export default Home;
