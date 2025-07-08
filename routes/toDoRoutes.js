const express = require("express");
const toDoController = require("../controllers/toDoControllers");

const router = express.Router();

router.post("/", toDoController.create);
router.put("/:id", toDoController.update);
router.delete("/:id", toDoController.delete);
router.get("/", toDoController.read);
router.get("/:id", toDoController.readID);

module.exports = router;
