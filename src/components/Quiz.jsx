import React, { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import styles from "./Quiz.module.css";
import PreGame from "./PreGame";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const { quizIsComplete, quizStarted } = useContext(QuizContext);

  let quizContent;

  if (!quizStarted) {
    quizContent = <PreGame />;
  } else if (quizIsComplete) {
    quizContent = <Summary />;
  } else {
    quizContent = <Question />;
  }

  return <div className={styles.quizContainer}>{quizContent}</div>;
}
