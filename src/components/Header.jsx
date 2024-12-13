import styles from "./Header.module.css";
import notebookImg from "../assets/notebook.png";
import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import { ThemeContext } from "../store/ThemeContext";
import ProgressBar from "./ProgressBar";

export default function Header() {
  const { toggleTheme } = useContext(ThemeContext);
  const { questions, activeQuestionIndex } = useContext(QuizContext);

  const progressValue =
    questions.length > 0 ? activeQuestionIndex / questions.length : 0;

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <img src={notebookImg} alt="notebook image" />
        <h1>Marius's React QuizzApp</h1>
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
