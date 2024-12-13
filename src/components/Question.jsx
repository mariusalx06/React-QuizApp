import React, { useContext } from "react";
import { QuizContext } from "../store/QuizContext.jsx";
import { ThemeContext } from "../store/ThemeContext";
import styles from "./Question.module.css";
import SelectButton from "./SelectButton.jsx";
import ProgressBar from "./ProgressBar.jsx";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function shuffleAnswers(question) {
  const shuffledAnswers = [...question.answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return shuffledAnswers;
}

export default function Question() {
  const { questions, activeQuestionIndex, handleSelectAnswer, menuQuiz } =
    useContext(QuizContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const question = questions[activeQuestionIndex];
  const currentQuestionAnswers = shuffleAnswers(question);
  const progressValue =
    questions.length > 0 ? activeQuestionIndex / questions.length : 0;

  return (
    <div className={styles.question}>
      <div className={styles.centeredContainer}>
        <ProgressBar
          value={progressValue}
          max={1}
          isDarkMode={isDarkMode}
          className={styles.progressBar}
        />

        <h2>{question.text}</h2>
      </div>
      <ul className={styles.ulList}>
        {currentQuestionAnswers.map((answer, index) => (
          <li className={styles.liItem} key={index}>
            <SelectButton
              text={answer}
              onClick={() => {
                handleSelectAnswer(answer);
              }}
            />
          </li>
        ))}
      </ul>
      <button onClick={menuQuiz} className={styles.resetButton}>
        <KeyboardBackspaceIcon />
        Menu
      </button>
    </div>
  );
}
