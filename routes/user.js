const express = require("express");
const router = express.Router();

// top to bottom

router.use(logger);

router.get("/", (req, res) => {
  res.send("users");
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", (req, res) => {
  console.log(req.body);
  if (true) {
    users.push({ name: req.body.userid });
    res.redirect(`/users/${users.length - 1}`); // redirect는 말그대로 redirect..
  } else {
    res.send("fail : )");
  }
});

// 같은 라우터에 대해서 chaining 가능
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user); //미들웨어에서 가미된 req를 받는다
    res.send(`Get user with ID : ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`update user with ID : ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`delete user with ID : ${req.params.id}`);
  });

// router.get("/:id", (req, res) => {
//   res.send(`Get user with ID : ${req.params.id}`);
// });
// router.put("/:id", (req, res) => {
//   res.send(`update user with ID : ${req.params.id}`);
// });
// router.delete("/:id", (req, res) => {
//   res.send(`delete user with ID : ${req.params.id}`);
// });

// 해당되는 파람이 요청에 있다면, 무조건 이함수를 먼저 실행한다.(미들웨어)
const users = [{ name: "kong" }, { name: "ha" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id]; //미들웨어를 거치면 req에 원하는 정보를 더 심을 수 있음
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
