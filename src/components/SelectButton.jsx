import React from "react";
import styles from "./SelectButton.module.css";

export default function SelectButton({ text, onClick }) {
  return (
    <button className={styles.selectButton} onClick={onClick}>
      {text}
    </button>
  );
}
