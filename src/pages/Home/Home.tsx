import "./Home.css";
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
    <div data-testid="home_page" className="home__wrapper">
      {/* Hero Content */}
      <div className="text-center">
        <GLogo className="mx-auto max-h-64 mb-2" />
        <h1 className="home__header">
          <span className="block">Welcome to the</span> <span className="block text-red-600">Trivia Challenge!</span>
        </h1>
        <p className="home__subheader">
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

        <div className="home__settings">
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

        <div className="home__actions">
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
              <label htmlFor="question-amount" className="label">
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
                className="input"
              />
            </div>

            {/* Category */}
            <div className="mt-6">
              <label htmlFor="question-amount" className="label">
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
