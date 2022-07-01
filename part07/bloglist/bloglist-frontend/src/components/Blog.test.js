import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
};

test("renders only blog title and author by default view, 5.13 STEP 1", () => {
  const mockHandler = jest.fn();
  const { container } = render(
    <Blog blog={blog} handleLike={mockHandler} handleDeleteBlog={mockHandler} />
  );

  expect(screen.getByText("React patterns")).toBeDefined(); // title
  expect(screen.getByText("Michael Chan")).toBeDefined(); // author
  expect(container.querySelector("#blog-url")).not.toBeInTheDocument();
  expect(container.querySelector("#blog-likes")).not.toBeInTheDocument();
});

test('Url and number of likes of blog are shown when pressing button "show", 5.14 STEP 2', async () => {
  const mockHandler = jest.fn();
  const { container } = render(
    <Blog blog={blog} handleLike={mockHandler} handleDeleteBlog={mockHandler} />
  );

  const user = userEvent.setup();
  const button = screen.getByText("Show");
  await user.click(button);

  expect(container.querySelector("#blog-url")).toBeInTheDocument();
  expect(container.querySelector("#blog-likes")).toBeInTheDocument();
});

test("When like button is pressed twice, event handler is called twice, 5.15 STEP 3", async () => {
  const mockHandler = jest.fn();
  const mockHandlerDelete = jest.fn(); // to avoid failed prop type

  render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
      handleDeleteBlog={mockHandlerDelete}
    />
  );

  const user = userEvent.setup();

  const showBtn = screen.getByText("Show");
  await user.click(showBtn);

  const likeBtn = screen.getByText("like");
  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
