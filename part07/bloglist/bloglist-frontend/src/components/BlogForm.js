import { useState } from "react";

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url,
    };
    createBlog(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            id="author"
            name="author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            id="url"
            name="url"
            placeholder="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-blog-btn">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
