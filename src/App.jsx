import QuizContextProvider from "./store/QuizContext.jsx";

import "./App.css";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  return (
    <>
      <QuizContextProvider>
        <Header />
        <Quiz />
      </QuizContextProvider>
    </>
  );
}

export default App;
