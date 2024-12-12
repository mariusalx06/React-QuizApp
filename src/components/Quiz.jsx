import React, { useContext } from "react";
import { QuizContext } from "../store/QuizContext.jsx";
import styles from "./Quiz.module.css";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const { quizIsComplete } = useContext(QuizContext);

  return (
    <div className={styles.quizContainer}>
      {quizIsComplete ? <Summary /> : <Question />}
    </div>
  );
}
