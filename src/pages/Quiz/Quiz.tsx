import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Categories } from "utils/contants/QuizOptions";

// Redux
import useStoreSelector from "hooks/useStoreSelector";
import useStoreDispatch from "hooks/useStoreDispatch";
import { getQuizState, setQuestions, setActiveIndex, setAnswerSheet, setCurrentQuestion, setQuizStatus } from "store/Slices/Quiz.Slice";

// Helpers
import { decodeEntity } from "utils/helpers/parsing";

// Components
import MultipleChoice from "components/Quiz/MultipleChoice";

export default function Quiz(): JSX.Element {
  const history = useHistory();
  const dispatch = useStoreDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const quizState = useStoreSelector(getQuizState);
  const { category, difficulty, questionAmount, questionType } = quizState;
  const { quizStatus, questions, activeIndex, answerSheet, currentQuestion } = quizState;

  const categoryLabel = Categories.find((cat) => cat?.value === category)?.label || "";

  // Checks requirements fior displaying the quiz layout
  function isQuizReady(questions: any[]) {
    if (loading === false && questions?.length > 0 && Object.keys(currentQuestion || {}).length > 0) {
      return true;
    }
    return false;
  }

  // Checks if you're on the last question in the list
  function isLastQuestion() {
    if (activeIndex + 1 >= questions.length) {
      return true;
    }
    return false;
  }

  // Shuffles and decodes the answers for each quesiton
  function shuffleAnswers(answers: string[]) {
    const decodedAnswers = answers.map((answer) => decodeEntity(answer));
    let randomIndex;
    let currentIndex = decodedAnswers.length;
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]];
    }

    return answers;
  }

  // Destructures and formats the questions into a usable format
  function prepareQuizData(questions: any[]) {
    return questions.map((question) => {
      return {
        question: decodeEntity(question?.question),
        correctAnswer: decodeEntity(question?.correct_answer),
        answerOptions: shuffleAnswers([...question?.incorrect_answers, question?.correct_answer]),
      };
    });
  }

  // Generate object for tracking question answers
  function generateAnswerSheet(questions: any[]) {
    const answerSheet: any = {};
    questions.forEach((question) => {
      answerSheet[question?.question] = null;
    });
    return answerSheet;
  }

  // Add question answer to answer sheet
  function answerQuestion(answer: string) {
    const newAnswerSheet = { ...answerSheet, [currentQuestion?.question]: answer };
    dispatch(setAnswerSheet({ ...newAnswerSheet }));
    if (questionType === "boolean") {
      gotoNextQuestion();
    }
  }

  // Traverse question list
  function gotoQuestion(index: number) {
    dispatch(setActiveIndex(index));
    dispatch(setCurrentQuestion({ ...questions[index] }));
  }

  // Load next question in list
  function gotoNextQuestion() {
    if (!isLastQuestion()) {
      const newIndex = activeIndex + 1;
      dispatch(setActiveIndex(newIndex));
      dispatch(setCurrentQuestion({ ...questions[newIndex] }));
    }
  }

  function isQuizComplete() {
    return !Object.values(answerSheet).some((answer) => answer === null);
  }

  // End trivia quiz and show results
  function submitAnswers() {
    const quizCompleted = isQuizComplete();

    if (quizCompleted) {
      dispatch(setQuizStatus("completed"));
      history.push("/results");
    }
  }

  useEffect(() => {
    // Redirect if test was already finished
    if (quizStatus === "completed") {
      history.goBack();
      return;
    }

    // Fetch Trivia Questions
    if (questions?.length === 0) {
      setLoading(true);
      fetch(`https://opentdb.com/api.php?amount=${questionAmount}&category=${category}&difficulty=${difficulty}&type=${questionType}`)
        .then((response) => response.json())
        .then((data) => {
          if (data?.response_code === 0) {
            const { results } = data;
            const quizQuestions = prepareQuizData(results);
            dispatch(setQuestions([...quizQuestions]));
          } else {
            setError(true);
          }
        })
        .catch((error) => {
          console.error(error);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(answerSheet).length === 0) {
      dispatch(setAnswerSheet({ ...generateAnswerSheet(questions) }));
    }
    if (Object.keys(currentQuestion).length === 0) {
      dispatch(setCurrentQuestion(questions?.length > 0 ? { ...questions[0] } : {}));
    }
  }, [questions]);

  return (
    <div className="mx-auto flex-grow w-full flex flex-col max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Question Tabs */}
      <ul
        className={`hidden flex-shrink md:mb-4 md:grid md:gap-2 lg:gap-4`}
        style={{ gridTemplateColumns: `repeat(${questions?.length}, minmax(0, 1fr))` }}>
        {questions &&
          questions.map((question, index) => {
            return (
              <button
                key={question?.question}
                className={`h-2 md:h-3 rounded-md bg-gray-200 
                ${question?.question === currentQuestion?.question ? "ring-2 ring-offset-2 ring-offset-white ring-orange-400" : ""} 
                ${answerSheet[question?.question] ? "bg-red-600" : ""}`}
                onClick={() => gotoQuestion(index)}
              />
            );
          })}
      </ul>
      <div className="flex items-center justify-between md:text-lg">
        <button className="flex items-center text-gray-600 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="ml-2">Previous</span>
        </button>
        <h2 className="text-red-600 font-semibold">Category: {categoryLabel}</h2>
      </div>
      {/* Quiz Content */}
      {isQuizReady(questions) && (
        <div className="mx-auto w-full flex-grow flex flex-col justify-center max-w-lg">
          <p className="text-md sm:text-lg text-center font-bold text-red-600">{`Question ${activeIndex + 1} / ${questions?.length}`}</p>
          {/* Question */}
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl tracking-tight font-extrabold text-gray-800">{decodeEntity(currentQuestion?.question)}</h1>
          </div>
          {/* Answers */}
          {questionType === "multiple" ? (
            <MultipleChoice
              answers={currentQuestion?.answerOptions}
              selected={answerSheet[currentQuestion?.question]}
              onSelectHandler={answerQuestion}
            />
          ) : (
            <div className="mt-5 mb-7 sm:mt-8 sm:flex justify-center">
              <div className="rounded-md shadow">
                <button
                  onClick={() => answerQuestion("True")}
                  className={`btn ${answerSheet[currentQuestion?.question] === "True" ? "" : "btn--light"}`}>
                  TRUE
                </button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  onClick={() => answerQuestion("False")}
                  className={`btn ${answerSheet[currentQuestion?.question] === "False" ? "" : "btn--light"}`}>
                  FALSE
                </button>
              </div>
            </div>
          )}

          {(questionType === "multiple" || (isLastQuestion() && isQuizComplete())) && (
            <div className="max-auto mt-2">
              <button className="btn" onClick={isLastQuestion() ? submitAnswers : gotoNextQuestion}>
                {isLastQuestion() ? "Submit Answers" : "Next Question"}
              </button>
            </div>
          )}
        </div>
      )}
      {/* Error Layout */}
      {error === true && (
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 sm:h-24 sm:w-14 mx-auto sm:mt-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Error!</span> <span className="block text-red-600">Something went wrong!</span>
          </h1>
          <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-2xl mx-auto">
            {/* Please refresh and try again later. */}
            There may have been an error with the amount questions you requested for this category. Lower the amount and try again.
          </p>
        </div>
      )}
    </div>
  );
}
