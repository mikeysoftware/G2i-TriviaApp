import "./Results.css";
import { useEffect } from "react";
import { useHistory } from "react-router";

// Redux
import useStoreSelector from "hooks/useStoreSelector";
import useStoreDispatch from "hooks/useStoreDispatch";
import { getQuizState, setQuizStatus, resetActiveQuiz } from "store/Slices/Quiz.Slice";

export default function Results(): JSX.Element {
  const history = useHistory();
  const dispatch = useStoreDispatch();
  const quizState = useStoreSelector(getQuizState);

  const { quizStatus, questions, answerSheet } = quizState;

  // Return to home
  function playAgain() {
    dispatch(setQuizStatus("ready"));
    dispatch(resetActiveQuiz());
    history.push("/");
  }

  function calculateScore() {
    let score = 0;
    questions.forEach((question) => {
      if (question?.correctAnswer === answerSheet[question?.question]) {
        score += 1;
      }
    });
    return score;
  }

  useEffect(() => {
    // Redirect if quiz is still in progress
    if (quizStatus !== "completed") {
      history.goBack();
      return;
    }
  }, []);

  return (
    <div className="results__wrapper">
      {/* Hero Content */}
      <div className="text-center">
        <h1 className="score">
          <span className="block">Final Score</span>{" "}
          <span className="block text-red-600">{`${calculateScore()} / ${questions.length}`}</span>
        </h1>
        <ol className="question__list">
          {questions.map((question) => (
            <li key={question?.question} className="my-4">
              <p>{question?.question}</p>
              {answerSheet[question?.question] === question?.correctAnswer ? (
                <span className="answer--correct">{question?.correctAnswer}</span>
              ) : (
                <div>
                  <span className="answer--incorrect">{answerSheet[question?.question]}</span>
                  <span className="answer--correct ml-2">{question?.correctAnswer}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-5 sm:mt-8 sm:flex justify-center">
          <div className="rounded-md shadow">
            <button onClick={playAgain} className="btn w-full">
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
