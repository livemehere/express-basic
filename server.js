const express = require("express");
const userRouter = require("./routes/user");
const app = express();

//everything is Top to Bottom

app.set("view engine", "ejs"); // 이것만해도 알아서 views 폴더를 찾음
// app.use(logger); // 모든 요청에대해서, logger 함수를 미들에어로 사용한다

app.use(express.static("public")); //default값은 index.html을 불러옴 , static으로 지정한 폴더는 서버URL/~~ 에서 접근할수있다.
app.use(express.urlencoded({ extended: true })); // post 요청의 body에 접근하는 방법

//미들웨어의 개별적 사용(제한없이 미들웨어 등록가능)
app.get("/", logger, logger, logger, (req, res) => {
  //   res.sendStatus(500);
  //   res.status(200).send({ mes: "bye" });
  //   res.json({ mes: "hi" });
  //   res.download("package.json");
  res.render("index", { data: "kong" }); //server side rendering
});

app.use("/users", userRouter); //users 로 시작하는 모든 요청은 userRouter로 넘길게

// logger 미들웨어 만들기
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
