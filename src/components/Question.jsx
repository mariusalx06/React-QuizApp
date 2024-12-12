import React, { useContext } from "react";
import { QuizContext } from "../store/QuizContext.jsx";
import styles from "./Question.module.css";

function shuffleAnswers(question) {
  const shuffledAnswers = [...question.answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return shuffledAnswers;
}

export default function Question() {
  const { questions, activeQuestionIndex, handleSelectAnswer } =
    useContext(QuizContext);

  const question = questions[activeQuestionIndex];
  const currentQuestionAnswers = shuffleAnswers(question);

  return (
    <div className={styles.question}>
      <h2>{question.text}</h2>
      <ul className={styles.ulList}>
        {currentQuestionAnswers.map((answer, index) => (
          <li className={styles.liItem} key={index}>
            <button
              className={styles.answer}
              onClick={() => {
                handleSelectAnswer(answer);
              }}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
