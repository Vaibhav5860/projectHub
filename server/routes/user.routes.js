const express = require("express");
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
