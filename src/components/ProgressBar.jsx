import React, { useContext } from "react";
import styles from "./ProgressBar.module.css";
import { ThemeContext } from "../store/ThemeContext";

export default function ProgressBar({ value, max, className }) {
  const { isDarkMode } = useContext(ThemeContext);

  const progressPercentage = Math.round((value / max) * 100);

  const progressTextClass = isDarkMode
    ? progressPercentage >= 50
      ? styles.progressTextBlack
      : styles.progressTextWhite
    : progressPercentage >= 50
    ? styles.progressTextWhite
    : styles.progressTextBlack;

  return (
    <div className={`${styles.progressContainer} ${className}`}>
      <progress className={styles.progress} value={value} max={max} />
      <span className={`${styles.progressText} ${progressTextClass}`}>
        {`${progressPercentage}%`}
      </span>
    </div>
  );
}
