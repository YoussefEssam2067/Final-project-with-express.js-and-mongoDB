// this is module for making try and catch for controllers

module.exports = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((err) => {
      next(err);
    });
  };
};
