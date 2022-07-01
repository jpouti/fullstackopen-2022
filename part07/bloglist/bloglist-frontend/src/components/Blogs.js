import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Blogs = ({ user, blogs }) => {
  if (!user || !blogs) {
    return null;
  }

  // display blogs by username & sorting blogs by showing the ones with most likes first
  const userBlogs = () => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  return (
    <div>
      <Table striped>
        <tbody>
          {userBlogs().map((blog) => {
            return (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs;
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};
