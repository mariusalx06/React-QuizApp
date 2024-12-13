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
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [progress, setProgress] = useState({
    easy: null,
    medium: null,
    hard: null,
    expert: null,
  });
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === questions.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  }

  function startQuiz(selectedDifficulty) {
    setDifficulty(selectedDifficulty);
    setQuizStarted(true);
  }

  function completedProgress(level) {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [level]: "completed",
    }));
  }

  function menuQuiz() {
    setUserAnswers([]);
    setDifficulty("");
    setQuizStarted(false);
  }

  function calculateProgress() {
    let value = 0;
    if (progress.easy === "completed") value += 0.2;
    if (progress.medium === "completed") value += 0.2;
    if (progress.hard === "completed") value += 0.2;
    if (progress.expert === "completed") value += 0.4;

    return value;
  }

  useEffect(() => {
    if (quizStarted) {
      let shuffledQuestions;

      if (difficulty === "easy") {
        shuffledQuestions = shuffleArray(easyQuestions);
      } else if (difficulty === "medium") {
        shuffledQuestions = shuffleArray(mediumQuestions);
      } else if (difficulty === "hard") {
        shuffledQuestions = shuffleArray(hardQuestions);
      } else if (difficulty === "expert") {
        const allQuestions = [
          ...easyQuestions,
          ...mediumQuestions,
          ...hardQuestions,
        ];
        shuffledQuestions = shuffleArray(allQuestions);
      }

      setQuestions(shuffledQuestions);
    }
  }, [quizStarted, difficulty]);

  const ctxValue = {
    questions,
    userAnswers,
    activeQuestionIndex,
    quizIsComplete,
    quizStarted,
    difficulty,
    progress,
    handleSelectAnswer,
    startQuiz,
    menuQuiz,
    setDifficulty,
    completedProgress,
    calculateProgress,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
