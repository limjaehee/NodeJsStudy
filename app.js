const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require('uuid')

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

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/confirm", (req, res) => {
    res.render("confirm");
});

app.get("/", (req, res) => {
    //템플릿 렌더링 작업
    //템플릿 엔진을 사용해서 파일을 생성하고 HTML로 변환하여 브라우저로 전송하는 역할을 한다.
    //index.ejs로 등록하지 않는 이유는 ejs가 자동으로 붙여주기 때문이다.
    res.render("index");
});

app.get("/recommend", (req, res) => {
    res.render("recommend");
});

//다른 경로에 대해 동일한 경로를 사용할 수 있다.
app.post("/recommend", (req, res) => {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const filePath = path.join(__dirname, "data", "restaurants.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect("/confirm");
});

app.get("/restaurants", (req, res) => {
    const filePath = path.join(__dirname, "data", "restaurants.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render("restaurants", {
        restaurants: storedRestaurants,
    });
});

app.get("/restaurants/:id", (req, res) => {
    const restaurantId = req.params.id;

    const filePath = path.join(__dirname, "data", "restaurants.json");

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    const restaurant = storedRestaurants.find((v) => v.id === restaurantId);

    res.render("restaurant-detail", {
        restaurant: restaurant,
    });
})

/**404
 * 404를 처리하는 미들웨어는 맨 마지막에 와야 한다.
 * 위에서부터 차례대로 읽기 때문
*/
app.use((req, res)=> {
    res.render('404')
})

/**500
 * 4개의 매개변수를 꼭 추가해야 한다.
 * error 객체는 익스프레스에서 자동으로 생성되고 채워진다.
 * error는 발생한 오류 정보를 포함한다.
*/
app.use((error, req, res, next)=> {
    res.render('500')
})

app.listen(3000);
