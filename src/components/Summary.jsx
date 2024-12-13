import { useState, useEffect, useContext } from "react";
import completedImg from "../assets/completed.png";
import styles from "./Summary.module.css";
import { QuizContext } from "../store/QuizContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SelectButton from "./SelectButton";

export default function Summary() {
  const [score, setScore] = useState(0);
  const [hasCompletedProgress, setHasCompletedProgress] = useState(false);
  const [isAnswerListOpen, setIsAnswerListOpen] = useState(false);

  const {
    menuQuiz,
    questions,
    userAnswers,
    completedProgress,
    difficulty,
    quizIsComplete,
  } = useContext(QuizContext);

  function calculateScore() {
    let newScore = 0;
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer === question.answers[0]) {
        newScore += 1;
      }
    });
    setScore(newScore);
  }
  function toggleAnswerList() {
    setIsAnswerListOpen((prev) => !prev);
  }

  useEffect(() => {
    if (
      quizIsComplete &&
      !hasCompletedProgress &&
      (score / questions.length) * 100 > 80
    ) {
      completedProgress(difficulty);
      setHasCompletedProgress(true);
    }
  }, [
    quizIsComplete,
    score,
    questions.length,
    completedProgress,
    difficulty,
    hasCompletedProgress,
  ]);

  useEffect(() => {
    calculateScore();
  }, [questions, userAnswers]);

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.topSide}>
        <img
          src={completedImg}
          alt="Checkmark"
          className={styles.completedImage}
        />
        <h2 className={styles.completionText}>Quiz Completed</h2>
      </div>

      <SelectButton
        onClick={toggleAnswerList}
        className={styles.toggleButton}
        text={isAnswerListOpen ? "Hide Answers" : "Show Answers"}
      ></SelectButton>

      {isAnswerListOpen && (
        <div className={styles.answerList}>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index] || "No answer selected";
            const isCorrect = userAnswer === question.answers[0];

            return (
              <div key={question.id} style={{ marginBottom: "20px" }}>
                <h3>{question.text}</h3>

                <p>
                  Correct Answer:
                  <span
                    className={
                      isCorrect ? styles.correctAnswer : styles.incorrectAnswer
                    }
                  >
                    {question.answers[0]}
                  </span>
                </p>

                <p>
                  Your Answer:{" "}
                  <span
                    className={
                      isCorrect ? styles.correctAnswer : styles.incorrectAnswer
                    }
                  >
                    {userAnswer}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.bottomSide}>
        <p>
          Score: {score}/{questions.length}
        </p>
        <button onClick={menuQuiz} className={styles.resetButton}>
          <KeyboardBackspaceIcon />
          Menu
        </button>
      </div>
    </div>
  );
}
