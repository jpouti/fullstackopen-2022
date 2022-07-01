import loginService from "../services/login";
import blogsService from "../services/blogs";
import { Form, Button } from "react-bootstrap";

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  setErrorMessage,
  setNotifyMessage,
  setUser,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      blogsService.setToken(user.token);

      setUser(user);
      setNotifyMessage(`${user.name} logged in`);
      setTimeout(() => {
        setNotifyMessage(null);
      }, 5000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Password"</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit" id="login-btn" variant="primary">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
