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
    <div className="sm:mt-10 mx-auto max-w-7xl px-4  sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      {/* Hero Content */}
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Final Score</span>{" "}
          <span className="block text-red-600">{`${calculateScore()} / ${questions.length}`}</span>
        </h1>
        <ol className="px-4 py-4 list-decimal text-left mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl mx-auto">
          {questions.map((question) => (
            <li key={question?.question} className="my-4">
              <p>{question?.question}</p>
              {answerSheet[question?.question] === question?.correctAnswer ? (
                <span className="font-bold text-green-700">{question?.correctAnswer}</span>
              ) : (
                <div>
                  <span className="line-through font-bold text-red-500">{answerSheet[question?.question]}</span>
                  <span className="font-bold text-green-700 ml-2">{question?.correctAnswer}</span>
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
