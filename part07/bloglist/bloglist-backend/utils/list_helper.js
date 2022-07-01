const _ = require("lodash");

const dummy = (testBlogs) => {
  if (testBlogs) {
    return 1;
  }
  return 1;
};

const totalLikes = (testBlogs) => {
  return testBlogs.reduce((sum, likes) => sum + likes.likes, 0);
};

const favoriteBlog = (testBlogs) => {
  const favorite = testBlogs.reduce(
    (accumulator, likes) =>
      accumulator.likes > likes.likes ? accumulator : likes,
    0
  );
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (testBlogs) => {
  let countBlogs = _.map(_.countBy(testBlogs, "author"), (count, author) => ({
    author: author,
    blogs: count,
  }));
  const maxCount = _.maxBy(countBlogs, "blogs");
  return maxCount;
};

const mostLikes = (testBlogs) => {
  // likes by authors
  let blogLikes = testBlogs.reduce((blogAuthor, { author, likes }) => {
    blogAuthor[author] = blogAuthor[author] || 0;
    blogAuthor[author] += likes;
    return blogAuthor;
  }, {});
  let max = Object.entries(blogLikes).reduce((max, entry) =>
    entry[1] >= max[1] ? entry : max
  );

  return { author: max[0], likes: max[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
