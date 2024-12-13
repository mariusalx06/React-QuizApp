import styles from "./Header.module.css";
import notebookImg from "../assets/notebook.png";
import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import { ThemeContext } from "../store/ThemeContext";
import ProgressBar from "./ProgressBar";

export default function Header() {
  const { toggleTheme } = useContext(ThemeContext);
  const { calculateProgress } = useContext(QuizContext);

  const progressValue = calculateProgress();

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <img src={notebookImg} alt="notebook image" />
        <h1>Math Contest</h1>
      </div>
      <div className={styles.options}>
        <button
          onClick={toggleTheme}
          className={styles.toggleThemeButton}
        ></button>
        <ProgressBar value={progressValue} max={1} />
      </div>
    </div>
  );
}
