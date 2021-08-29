import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Categories, Difficulties, QuestionTypes } from "utils/contants/QuizOptions";
import { DifficultiesType, QuestionTypesType, resetActiveQuiz, setQuizStatus } from "store/Slices/Quiz.Slice";

import Modal from "components/Modal";
import FormRadioGroup from "components/Form/FormRadioGroup/FormRadioGroup";
import FormSelect from "components/Form/FormSelect";

// Redux
import useStoreSelector from "hooks/useStoreSelector";
import useStoreDispatch from "hooks/useStoreDispatch";
import { getQuizState, setQuestionAmount, setCategory, setDifficulty, setQuestionType } from "store/Slices/Quiz.Slice";

import { ReactComponent as GLogo } from "assets/svg/logo.svg";

export default function Home(): JSX.Element {
  const dispatch = useStoreDispatch();
  const quizState = useStoreSelector(getQuizState);
  const { difficulty, category, questionAmount, questionType } = quizState;

  const history = useHistory();
  const [amount, setAmount] = useState(questionAmount || 10);
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function startQuiz() {
    dispatch(setQuizStatus("ready"));
    history.push("/quiz");
  }

  function setQuizQuestionAmount(amount: number) {
    dispatch(setQuestionAmount(amount));
  }

  function setQuizCategory(category: number) {
    dispatch(setCategory(category));
  }

  function setQuizDifficulty(option: DifficultiesType) {
    dispatch(setDifficulty(option));
  }

  function setQuizQuestionType(option: QuestionTypesType) {
    dispatch(setQuestionType(option));
  }

  function handleAmountChange(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.target as HTMLInputElement;
    const valueInt = parseInt(value, 10);
    if (valueInt > 20) {
      setAmount(20);
    } else {
      setAmount(valueInt);
    }
  }

  useEffect(() => {
    dispatch(resetActiveQuiz());
  }, []);

  useEffect(() => {
    setQuizQuestionAmount(amount);
  }, [amount]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      {/* Hero Content */}
      <div className="text-center">
        <GLogo className="mx-auto max-h-64 mb-2" />
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Welcome to the</span> <span className="block text-red-600">Trivia Challenge!</span>
        </h1>
        <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl mx-auto">
          This trivia application was made possible by the generous people over at{" "}
          <a className="underline text-blue-500 visited:text-blue-600" href="https://www.pixeltailgames.com/">
            PixelTail Games LLC
          </a>{" "}
          who made their TriviaDB API publicly available and{" "}
          <a className="underline text-blue-500 visited:text-blue-600" href="https://www.pixeltailgames.com/">
            G2i
          </a>{" "}
          for the challenge and opportunity.
        </p>

        <div className="mt-3 sm:mt-4 w bg-gray-100 p-2 sm:p-4 rounded-lg">
          <ul className=" sm:text-lg text-gray-800 font-medium">
            <li>
              Questions: <span className=" font-bold uppercase">{questionAmount}</span>{" "}
            </li>
            <li>
              Category: <span className=" font-bold uppercase">{category}</span>{" "}
            </li>
            <li>
              Difficulty: <span className=" font-bold uppercase">{difficulty}</span>{" "}
            </li>
            <li>
              Type: <span className=" font-bold uppercase">{questionType}</span>{" "}
            </li>
          </ul>
        </div>

        <div className="mt-5 sm:mt-8 sm:flex justify-center">
          <div className="rounded-md shadow">
            <button onClick={startQuiz} className="btn">
              Start Quiz
            </button>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button onClick={openModal} className="btn btn--light">
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal title="Quiz Settings" subtitle="Customize your Trivia experience." open={modalOpen} setOpen={setModalOpen}>
        {/* {/*  */}
        <section aria-labelledby="options-heading" className="mt-10">
          <h3 id="options-heading" className="sr-only">
            Product options
          </h3>

          <form>
            {/* Amount */}
            <div className="mt-6">
              <label htmlFor="question-amount" className="block text-sm font-medium text-gray-700">
                Amount of Questions
              </label>
              <input
                type="number"
                min="10"
                max="20"
                name="question-amount"
                id="question-amount"
                value={amount}
                onChange={handleAmountChange}
                className="mt-1 h-11 px-4 border focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
              />
            </div>

            {/* Category */}
            <div className="mt-6">
              <label htmlFor="question-amount" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <FormSelect options={Categories} value={category} onChangeHandler={setQuizCategory} />
            </div>

            {/* Difficulty */}
            <div className="mt-6">
              <FormRadioGroup groupTitle="Difficulty" value={difficulty} options={Difficulties} onChangeHandler={setQuizDifficulty} />
            </div>

            {/* Question Types */}
            <div className="mt-6">
              <FormRadioGroup
                groupTitle="Question Type"
                value={questionType}
                options={QuestionTypes}
                onChangeHandler={setQuizQuestionType}
              />
            </div>

            <button type="button" className="btn mt-6" onClick={() => setModalOpen(false)}>
              Save Settings
            </button>
          </form>
        </section>
      </Modal>
    </div>
  );
}
