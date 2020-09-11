const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/reg", (req, res) => {
  res.render("pages/reg", { title: "Регистрация" });
});
router.get("/auth", (req, res) => {
  res.render("pages/auth", { title: "Вход" });
});

router.post("/reg", async (req, res) => {
  //Регистрация
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({
      user,
      token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  //Вход
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({
        error: "Вход не выполнен! Проверьте логин и пароль!",
      });
    } else {
      const token = await user.generateAuthToken();
      res.send({
        user,
        token,
      });
      return res.json({
        error: "authorization fail!",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/users/me", auth, async (req, res) => {
  // Просмотр авторизованного профиля пользователя
  res.send(req.user);
});
router.post("/users/me/logout", auth, async (req, res) => {
  // Выйти
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/me/logoutall", auth, async (req, res) => {
  // Выйти со всех устройств
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
