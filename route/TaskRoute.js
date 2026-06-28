const express = require("express");
const taskController = require("../Controller/TaskController");
const auth = require("../Middleware/Auth");
const router = express.Router()


router.post("/", auth, taskController.createTask)
router.get("/", auth, taskController.findAllTask)
router.get("/findAllTask", auth, taskController.findAllTaskOfUser)
router.get("/:id", auth, taskController.findAllTask)
router.delete("/:id",auth, taskController.deleteTask)
router.put("/:id",auth,  taskController.updateTask)


module.exports = router;