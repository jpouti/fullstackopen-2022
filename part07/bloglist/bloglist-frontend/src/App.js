import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogsService from "./services/blogs";
import NavBar from "./components/NavBar";
import "./styles/App.css";
import Users from "./components/Users";
import Home from "./components/Home";
import { Routes, Route, useMatch } from "react-router-dom";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [updateBlogsList, setUpdateBlogsList] = useState(0); // to update the blog details

  const blogFormRef = useRef();

  useEffect(() => {
    blogsService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, [updateBlogsList]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    return (
      <Login
        setPassword={setPassword}
        setUsername={setUsername}
        username={username}
        password={password}
        setErrorMessage={setErrorMessage}
        setUser={setUser}
        setNotifyMessage={setNotifyMessage}
      />
    );
  };

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogsService.create(blog);
      setBlogs(blogs.concat(newBlog));
      setUpdateBlogsList(updateBlogsList + 1);
      setNotifyMessage(`a new blog added: ${blog.title} by ${blog.author}`);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Adding a new blog failed, please input all the fields and try again!"
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const createComment = async (comment, id) => {
    try {
      await blogsService.createComments(comment, id);
      setUpdateBlogsList(updateBlogsList + 1);
      setNotifyMessage(`a new comment added succesfully`);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setErrorMessage("Adding a new comment failed, please try again!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLike = async (blog) => {
    const likeBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const updatedBlog = await blogsService.update(likeBlog);
      setNotifyMessage(`Blog: ${updatedBlog.title} has been liked`);
      setUpdateBlogsList(updateBlogsList + 1);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setErrorMessage("Liking a blog has been failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        const deletedBlog = await blogsService.deleteBlog(blog.id);
        setNotifyMessage(`Blog: ${deletedBlog.title} has been removed`);
        setUpdateBlogsList(updateBlogsList + 1);
        setTimeout(() => {
          setNotifyMessage(null);
        }, 5000);
      } catch (error) {
        console.log(error);
        setErrorMessage("Deleting a blog has been failed");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } else {
      setNotifyMessage(`Removing blog: ${blog.title} was cancelled`);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 5000);
    }
  };

  // log out, clear local storage
  const logoutHandler = () => {
    const username = user.name;
    window.localStorage.clear();
    setUser(null);
    setNotifyMessage(`${username} logged out`);
    setTimeout(() => {
      setNotifyMessage(null);
    }, 5000);
  };

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <div className="container">
      <NavBar
        user={user}
        logoutHandler={logoutHandler}
        errorMessage={errorMessage}
        notifyMessage={notifyMessage}
      />
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              handleLike={handleLike}
              handleDeleteBlog={handleDeleteBlog}
              createComment={createComment}
            />
          }
        ></Route>
        <Route path="/users" element={<Users />} />
        <Route
          path="/"
          element={
            user !== null ? (
              <Home
                user={user}
                blogs={blogs}
                createBlog={createBlog}
                blogFormRef={blogFormRef}
              />
            ) : (
              loginForm()
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
