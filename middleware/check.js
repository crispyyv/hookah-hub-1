const jwt = require("jsonwebtoken");
const Article = require("../models/article");

const create = async (req, res, next) => {
  article = Article.findOne(req.body._id);
  try {
    if (!article) {
      throw new Error();
    }
    req.article = article;
    next();
  } catch (error) {
    res.status(401).send({ error: "Статья отсутсвует" });
  }
};

module.exports = create;
