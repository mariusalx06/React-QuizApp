import QuizContextProvider from "./store/QuizContext.jsx";
import ThemeProvider from "./store/ThemeContext.jsx";
import "./App.css";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  return (
    <>
      <ThemeProvider>
        <QuizContextProvider>
          <Header />
          <Quiz />
        </QuizContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
