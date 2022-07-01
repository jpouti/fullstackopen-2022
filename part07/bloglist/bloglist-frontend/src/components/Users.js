import { useEffect, useState } from "react";
import userService from "../services/users";
import "../styles/App.css";

const User = ({ user }) => {
  return (
    <div className="user-container">
      <p id="user-name">{user.name}</p>
      <p> {user.blogs.length} </p>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <div>
        <p></p>
        <p id="users-blogs">blogs created</p>
        <div>
          {users.map((user) => {
            return <User key={user.id} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Users;
