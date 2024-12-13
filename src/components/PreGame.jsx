import React, { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import styles from "./PreGame.module.css";
import SelectButton from "./SelectButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function PreGame() {
  const { startQuiz, progress } = useContext(QuizContext);

  return (
    <div className={styles.preGameContainer}>
      <h2 className={styles.heading}>Select Difficulty</h2>
      <div className={styles.buttonContainer}>
        <div className={styles.container}>
          <label className={styles.diffLabel}>
            {progress?.easy === "completed" ? (
              <CheckBoxIcon className={styles.checkbox} />
            ) : (
              <CheckBoxOutlineBlankIcon className={styles.checkbox} />
            )}
          </label>
          <SelectButton onClick={() => startQuiz("easy")} text={"Easy"} />
        </div>
        <div className={styles.container}>
          <label className={styles.diffLabel}>
            {progress?.medium === "completed" ? (
              <CheckBoxIcon className={styles.checkbox} />
            ) : (
              <CheckBoxOutlineBlankIcon className={styles.checkbox} />
            )}
          </label>
          <SelectButton onClick={() => startQuiz("medium")} text={"Medium"} />
        </div>
        <div className={styles.container}>
          <label className={styles.diffLabel}>
            {progress?.hard === "completed" ? (
              <CheckBoxIcon className={styles.checkbox} />
            ) : (
              <CheckBoxOutlineBlankIcon className={styles.checkbox} />
            )}
          </label>
          <SelectButton onClick={() => startQuiz("hard")} text={"Hard"} />
        </div>
        <div className={styles.container}>
          <label className={styles.diffLabel}>
            {progress?.expert === "completed" ? (
              <CheckBoxIcon className={styles.checkbox} />
            ) : (
              <CheckBoxOutlineBlankIcon className={styles.checkbox} />
            )}
          </label>
          <SelectButton onClick={() => startQuiz("expert")} text={"Expert"} />
        </div>
      </div>
    </div>
  );
}
