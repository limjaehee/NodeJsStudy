const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  //템플릿 렌더링 작업
  //템플릿 엔진을 사용해서 파일을 생성하고 HTML로 변환하여 브라우저로 전송하는 역할을 한다.
  //index.ejs로 등록하지 않는 이유는 ejs가 자동으로 붙여주기 때문이다.
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
