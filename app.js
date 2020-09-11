const express = require("express");
const userRouter = require("./routers/user");
const pagesRouter = require("./routers/page");
const articleRouter = require("./routers/article");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const port = process.env.PORT;

require("./db/db");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload());
app.use(pagesRouter);
app.use(userRouter);
app.use(articleRouter);

app.listen(port, () => {
  app.use(express.static("./public"));
  console.log(`Server running on port ${port}`);
});
