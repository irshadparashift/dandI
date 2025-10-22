// redux/slices/Questions/questionSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';

// ---------- Types ----------
export type Question = {
  _id: string;
  Question: string;
  CategoryName: string;
  CategoryId: string;
  SubcategoryId: string | null;
  Options: number[];
};

export type CategoryWithQuestions = {
  Category: {
    _id: string;
    Name: string;
  };
  Questions: Question[];
};

export type GetQuestionsResponse = {
  status: boolean;
  message: string;
  data: Question[];
};

export type QuestionByCategoryResponse = {
  status: boolean;
  message: string;
  data: {
    CategoryId: string;
    AssetId: string;
    QuestionNumber: string;
    Question: {
      _id: string;
      Question: string;
      Options: number[];
      CategoryId: string;
      SubcategoryId: string | null;
    };
    TotalQuestions: number;
    next: boolean;
  };
};

export type QuestionsByCategoryIdResponse = {
  status: boolean;
  message: string;
  data: Question[];
};

// ---------- API Slice ----------
export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie('UserToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Get all questions by AssetId
    getAllQuestionByAssetId: builder.query<GetQuestionsResponse, string>({
      query: (assetId) => `/question/asset/${assetId}`,
    }),

    // ✅ Get question by AssetId + CategoryId + currentStep
    getQuestionByAssetCategoryStep: builder.query<
      QuestionByCategoryResponse,
      { assetId: string; categoryId: string; currentStep: number }
    >({
      query: ({ assetId, categoryId, currentStep }) =>
        `/question/asset/${assetId}/category/${categoryId}/${currentStep}`,
    }),

    // ✅ NEW: Get all questions by CategoryId
    getQuestionsByCategoryId: builder.query<QuestionsByCategoryIdResponse, string>({
      query: (categoryId) => `/question/${categoryId}`,
    }),
  }),
});

// ---------- Hooks ----------
export const {
  useGetAllQuestionByAssetIdQuery,
  useLazyGetAllQuestionByAssetIdQuery,
  useGetQuestionByAssetCategoryStepQuery,
  useGetQuestionsByCategoryIdQuery,
} = questionApi;
