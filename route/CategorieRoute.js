const express = require("express");
const categoryController = require("../Controller/CategorieController");
const auth = require("../Middleware/Auth");
const router = express.Router()


router.post("/", auth, categoryController.createCategory)
router.get("/",auth,  categoryController.findAllCategory)
router.get("/findAll", auth, categoryController.findAllCategorieOfUser)
router.get("/:id",auth,  categoryController.findCategoryById)
router.delete("/:id", auth, categoryController.deleteCategory)
router.put("/:id", auth, categoryController.updateCategory)


module.exports = router;