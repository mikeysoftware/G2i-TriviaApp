import { RootState } from './../store';
import { Categories } from './../../utils/contants/QuizOptions';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Categories = "General Knowledge" | "Movies" | "Music" | "Science" | "Sports" | "History" | "Animals";
type Difficulties = "Easy" | "Medium" | "Hard";
type QuestionTypes = "Multiple Choice" | "True/False";

interface QuizSliceState {
    questionAmount: number,
    category: Categories,
    difficulty: Difficulties,
    questionType: QuestionTypes
}

const INITIAL_STATE: QuizSliceState = {
    questionAmount: 10,
    category: "General Knowledge",
    difficulty: "Medium",
    questionType: "Multiple Choice"
}

const QuizSlice = createSlice({
    name: "quiz",
    initialState: INITIAL_STATE,
    reducers: {
        setQuestionAmount: (state, action: PayloadAction<number>) => {
            state.questionAmount = action.payload;
        },
        setCategory: (state, action: PayloadAction<Categories>) => {
            state.category = action.payload;
        },
        setQuestionType: (state, action: PayloadAction<QuestionTypes>) => {
            state.questionType = action.payload;
        }
    }
});

// Actions
export const {
    setCategory
} = QuizSlice.actions;


// Selectors
export const getQuizSettings = ({ quiz: state }: RootState): QuizSliceState => state;

// Export Slice
export default QuizSlice;