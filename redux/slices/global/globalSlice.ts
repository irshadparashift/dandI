//redux/slices/global/globalSlice.ts

//redux/slices/global/globalSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '@/redux/slices/questions/questionSlice'; // ✅ import Question type

interface StepInfo {
  CurrentStepCount: number;
  LastCategoryId: string | null;
  LastQuestionId: string | null;
  CompletedSteps: number;
}

// Define ResultData structure
export interface CategoryScore {
  CategoryId: string;
  CategoryName: string;
  Score: number;
  MaxScore: number;
  Percentage: number;
  _id: string;
}

export interface ResultData {
  TotalScore: number;
  MaxScore: number;
  Percentage: number;
  CategoryScores: CategoryScore[];
}

interface GlobalState {
  assetId: string | null;
  assessmentId: string | null;
  categoryIds: string[]; // ✅ new field
  stepInfo: StepInfo | null;
  questions: Question[]; // ✅ store all questions
  resultData: ResultData | null; // ✅ Add resultData
}

const initialState: GlobalState = {
  assetId: null,
  assessmentId: null,
  categoryIds: [],
  stepInfo: null,
  questions: [],
  resultData: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // Store all questions
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    // Set Asset ID
    setAssetId: (state, action: PayloadAction<string>) => {
      state.assetId = action.payload;
    },
    // Clear Asset ID
    clearAssetId: (state) => {
      state.assetId = null;
    },
    // Set Assessment ID
    setAssessmentId: (state, action: PayloadAction<string>) => {
      state.assessmentId = action.payload;
    },
    // Clear Assessment ID
    clearAssessmentId: (state) => {
      state.assessmentId = null;
    },

    // ✅ Category IDs
    setCategoryIds: (state, action: PayloadAction<string[]>) => {
      state.categoryIds = action.payload;
    },
    clearCategoryIds: (state) => {
      state.categoryIds = [];
    },

    // ✅ Step Info
    setStepInfo: (state, action: PayloadAction<GlobalState['stepInfo']>) => {
      state.stepInfo = action.payload;
    },

    // ✅ Add ResultData reducers
    setResultData: (state, action: PayloadAction<ResultData | null>) => {
      state.resultData = action.payload;
    },
    clearResultData: (state) => {
      state.resultData = null;
    },

    // Optional: Clear both
    clearAll: (state) => {
      state.assetId = null;
      state.assessmentId = null;
      state.categoryIds = [];
    },
  },
});

export const {
  setQuestions,
  setAssetId,
  clearAssetId,
  setAssessmentId,
  clearAssessmentId,
  setCategoryIds,
  setStepInfo,
  setResultData,
  clearResultData,
  clearCategoryIds,
  clearAll,
} = globalSlice.actions;
export default globalSlice.reducer;
