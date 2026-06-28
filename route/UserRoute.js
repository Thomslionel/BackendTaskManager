const express = require("express");
const userController = require("../Controller/UserController");
const auth = require("../Middleware/Auth");
const router = express.Router()


router.post("/", auth, userController.createUser)
router.get("/", auth,  userController.findAllUser)
router.get("/:id", auth, userController.findUserById)
router.delete("/:id", auth, userController.deleteUserById)
router.put("/:id", auth, userController.updateUserById)

module.exports = router;