import React, { createContext, useEffect, useState } from "react";
import { easyQuestions, mediumQuestions, hardQuestions } from "../questions.js";

export const QuizContext = createContext();

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizContextProvider({ children }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState("hard");
  const [questions, setQuestions] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  useEffect(() => {
    let shuffledQuestions;
    if (difficulty === "easy") {
      shuffledQuestions = shuffleArray(easyQuestions);
    } else if (difficulty === "medium") {
      shuffledQuestions = shuffleArray(mediumQuestions);
    } else if (difficulty === "hard") {
      shuffledQuestions = shuffleArray(hardQuestions);
    }
    setQuestions(shuffledQuestions);
  }, [difficulty]);

  const quizIsComplete = activeQuestionIndex === questions.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  }
  function resetQuiz() {
    setUserAnswers([]);
    setDifficulty("hard");
  }

  const ctxValue = {
    questions,
    userAnswers,
    activeQuestionIndex,
    quizIsComplete,
    handleSelectAnswer,
    setDifficulty,
    resetQuiz,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
