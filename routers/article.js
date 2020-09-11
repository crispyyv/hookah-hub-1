const express = require("express");
const Article = require("../models/article");
const check = require("../middleware/check");
const session = require("express-session");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/create_article", async (req, res) => {
  var number = req.body.number;
  const article = new Article(req.body);
  console.log(article);
  if (article) {
    await article.save();
    res.status(200).send("OK");
  } else {
    res.status(400).send(error);
  }
});

router.get("/pg_:number", async (req, res) => {
  console.log("Redirect started!");
  try {
    const number = req.params;
    const article = await Article.findOne(number, function(err, doc) {
      if (err) return; //console.log(err)
    });
    const title = article.title;
    const content = article.content;
    const headline = content.match(/<\h1>(.*)<\/h1>/);
    const edit_content = content.replace(headline[0], "");
    console.log(headline[0]);
    res.render("pages/asd", {
      title: title,
      content: edit_content,
      headline: headline[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
