import styles from "./Header.module.css";
import notebookImg from "../assets/notebook.png";
import { useState, useEffect, useContext } from "react";
import { QuizContext } from "../store/QuizContext";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { questions, activeQuestionIndex } = useContext(QuizContext);

  const progressValue =
    questions.length > 0 ? activeQuestionIndex / questions.length : 0;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={styles.header}>
      <img
        src={notebookImg}
        alt="notebook image"
        style={{ width: "6rem", height: "auto" }}
      />
      <h1>Marius's React QuizzApp</h1>
      <div className={styles.options}>
        <button
          onClick={toggleTheme}
          className={styles.toggleThemeButton}
        ></button>
        <div>
          <p>Progress: </p>
          <progress className={styles.progress} value={progressValue} max={1} />
        </div>
      </div>
    </div>
  );
}
