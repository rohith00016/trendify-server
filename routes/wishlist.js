const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist");
const { auth } = require("../middleware/auth");

router.post(
  "/add",
  (req, res, next) => {
    console.log("🔥 Route /add hit");
    next();
  },
  auth,
  wishlistController.addToWishlist
);
router.post("/remove", auth, wishlistController.removeFromWishlist);
router.get("/", auth, wishlistController.getWishlist);

module.exports = router;
