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
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === questions.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  }

  function startQuiz(selectedDifficulty) {
    setDifficulty(selectedDifficulty);
    setQuizStarted(true);
  }

  function resetQuiz() {
    setUserAnswers([]);
    setDifficulty("");
    setQuizStarted(false);
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
    handleSelectAnswer,
    startQuiz,
    resetQuiz,
    quizStarted,
    setDifficulty,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
