import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type QuizStatus = "ready" | "in-progress" | "completed";
export type DifficultiesType = "easy" | "medium" | "hard";
export type QuestionTypesType = "multiple" | "boolean";

interface QuizSliceState {
    // Settings
    questionAmount: number,
    category: number,
    difficulty: DifficultiesType,
    questionType: QuestionTypesType,
    // Active State
    quizStatus: QuizStatus,
    questions: any[],
    activeIndex: number,
    answerSheet: any,
    currentQuestion: any,
}

const INITIAL_STATE: QuizSliceState = {
    // Settings
    category: 9,
    questionAmount: 10,
    difficulty: "easy",
    questionType: "boolean",
    // Active State
    quizStatus: "completed",
    questions: [],
    activeIndex: 0,
    answerSheet: {},
    currentQuestion: {},
}

const QuizSlice = createSlice({
    name: "quiz",
    initialState: INITIAL_STATE,
    reducers: {
        // Settings
        setQuestionAmount: (state, action: PayloadAction<number>) => {
            state.questionAmount = action.payload;
        },
        setCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload;
        },
        setDifficulty: (state, action: PayloadAction<DifficultiesType>) => {
            state.difficulty = action.payload;
        },
        setQuestionType: (state, action: PayloadAction<QuestionTypesType>) => {
            state.questionType = action.payload;
        },
        // Active State
        setQuizStatus: (state, action: PayloadAction<QuizStatus>) => {
            state.quizStatus = action.payload;
        },
        setQuestions: (state, action: PayloadAction<any[]>) => {
            state.questions = action.payload;
        },
        setActiveIndex: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload;
        },
        setAnswerSheet: (state, action: PayloadAction<any>) => {
            state.answerSheet = { ...action.payload };
        },
        setCurrentQuestion: (state, action: PayloadAction<any>) => {
            state.currentQuestion = action.payload;
        },
        resetActiveQuiz: (state) => {
            state.questions = [];
            state.activeIndex = 0;
            state.answerSheet = {};
            state.currentQuestion = {};
        },
        resetQuizState: () => INITIAL_STATE
    }
});

// Actions
export const {
    // Settings
    setQuestionAmount,
    setCategory,
    setDifficulty,
    setQuestionType,
    resetQuizState,
    // Active State
    setQuizStatus,
    setQuestions,
    setActiveIndex,
    setAnswerSheet,
    setCurrentQuestion,
    resetActiveQuiz
} = QuizSlice.actions;


// Selectors
export const getQuizState = ({ quiz: state }: RootState): QuizSliceState => state;

// Export Slice
export default QuizSlice;