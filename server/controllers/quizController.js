const BigPromise = require("../middlewares/bigPromise");
const Quiz = require("../models/quizModel");

exports.getAllQuiz = BigPromise(async (req, res) => {
  const quiz = await Quiz.find();

  res.status(200).json({
    success: true,
    quiz,
  });
});
