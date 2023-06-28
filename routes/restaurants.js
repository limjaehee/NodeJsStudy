const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-data");

const router = express.Router();

router.get("/confirm", (req, res) => {
  res.render("confirm");
});

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

//다른 경로에 대해 동일한 경로를 사용할 수 있다.
router.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurant);

  resData.storeRestaurants(storedRestaurants);

  res.redirect("/confirm");
});

router.get("/restaurants", (req, res) => {
  const storedRestaurants = resData.getStoredRestaurants();

  res.render("restaurants", {
    restaurants: storedRestaurants,
  });
});

router.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;

  const storedRestaurants = resData.getStoredRestaurants();

  const restaurant = storedRestaurants.find((v) => v.id === restaurantId);

  res.render("restaurant-detail", {
    restaurant: restaurant,
  });
});

module.exports = router;
