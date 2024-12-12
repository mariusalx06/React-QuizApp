import { useState, useEffect, useContext } from "react";
import completedImg from "../assets/completed.png";
import styles from "./Summary.module.css";
import { QuizContext } from "../store/QuizContext";

export default function Summary() {
  const [score, setScore] = useState(0);

  const { resetQuiz, questions, userAnswers } = useContext(QuizContext);

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

  useEffect(() => {
    calculateScore();
  }, []);

  return (
    <div className={styles.summaryContainer}>
      <img
        src={completedImg}
        alt="Checkmark"
        className={styles.completedImage}
        style={{ width: "6rem", height: "auto" }}
      />
      <h2 className={styles.completionText}>Quiz Completed</h2>

      <div>
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
      <div className={styles.bottomSide}>
        <p>Score:{score}</p>
        <button onClick={resetQuiz} className={styles.resetButton}>
          Reset
        </button>
      </div>
    </div>
  );
}
