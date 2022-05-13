const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: [true, "Quiz Name required"],
  },
  quizImage: {
    type: String,
    required: [true, "Quiz Image url required"],
  },
  questions: [
    {
      questionNumber: {
        type: Number,
        required: [true, "Question number required"],
      },
      question: {
        type: String,
        required: [true, "Question Required"],
      },
      points: {
        type: Number,
        required: [true, "Question Points Required"],
      },
      options: [
        {
          value: {
            type: String,
            required: [true, "Option Value Required"],
          },
          isRight: {
            type: Boolean,
            required: [true, "IsRight value of option required"],
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Quiz", QuizSchema);
