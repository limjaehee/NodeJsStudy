const express = require("express");
const path = require("path");

//파일명이 아닌 경로를 추가해준다.
const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

/**익스프레스 옵션 설정
 * views: 뷰 설정, 템플릿 파일을 찾을 위치를 익스프레스에 알림
 * path.join 안의 'views'는 html이 들어있는 폴더명을 뜻한다.
 * view engine: 뷰 파일을 html로 보내기 전에 처리하는 템플릿 엔진
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**미들웨어
 * express.static : 모든 수신 요청에 대해 이 공용 폴더에서 찾을 수 있는지 확인
 */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//해당 라우트가 없는 경우에만 아래를 확인하게 됨
app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

/**404
 * 404를 처리하는 미들웨어는 맨 마지막에 와야 한다.
 * 위에서부터 차례대로 읽기 때문
 */
app.use((req, res) => {
  res.status(404).render("404");
});

/**500
 * 4개의 매개변수를 꼭 추가해야 한다.
 * error 객체는 익스프레스에서 자동으로 생성되고 채워진다.
 * error는 발생한 오류 정보를 포함한다.
 */
app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(3000);
