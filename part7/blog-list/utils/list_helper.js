const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let maxItem = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > maxItem.likes) {
      maxItem = blog;
    }
  });
  return blogs.length === 0 ? null : maxItem;
};

const mostBlogs = (blogs) => {
  const countByAuthor = _.countBy(blogs, (blog) => {
    return blog.author;
  });

  let maxAuthor = null;
  let maxCount = 0;
  _.forEach(countByAuthor, (value, key) => {
    if (value > maxCount) {
      maxCount = value;
      maxAuthor = key;
    }
  });

  return { author: maxAuthor, blogs: maxCount };
};

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, (blog) => {
    return blog.author;
  });

  let maxAuthor = null;
  let maxSum = 0;
  _.mapKeys(blogsByAuthor, (blogList, author) => {
    const sum = _.sumBy(blogList, (blog) => blog.likes);

    if (sum > maxSum) {
      maxSum = sum;
      maxAuthor = author;
    }
  });

  return blogs.length === 0 ? null : { author: maxAuthor, likes: maxSum };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
