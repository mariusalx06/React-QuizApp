import React, { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import styles from "./PreGame.module.css";
import SelectButton from "./SelectButton";

export default function PreGame() {
  const { startQuiz } = useContext(QuizContext);

  return (
    <div className={styles.preGameContainer}>
      <h2 className={styles.heading}>Select Difficulty</h2>
      <SelectButton onClick={() => startQuiz("easy")} text={"Easy"} />
      <SelectButton onClick={() => startQuiz("medium")} text={"Medium"} />
      <SelectButton onClick={() => startQuiz("hard")} text={"Hard"} />
      <SelectButton onClick={() => startQuiz("expert")} text={"Expert"} />
    </div>
  );
}
