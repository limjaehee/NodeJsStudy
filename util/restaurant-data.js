const path = require("path");
const fs = require("fs");

/**프로젝트 폴더를 가르키기 위해서 '..'을 사용한다.
 * __dirname은 현재 위치를 나타낸다.
 */
const filePath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);

  return JSON.parse(fileData);
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants,
  storeRestaurants,
};
