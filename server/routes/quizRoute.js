const express = require("express");
const router = express.Router();
const { getAllQuiz } = require("../controllers/quizController");

router.route("/quiz/all").get(getAllQuiz);

module.exports = router;
