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
  let order = req.query.order;
  let nextOrder = "desc";

  if (!order) {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort((a, b) => {
    if (
      (order === "asc" && a.name > b.name) ||
      (order === "desc" && b.name > a.name)
    )
      return 1;
    return -1;
  });

  res.render("restaurants", {
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
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
