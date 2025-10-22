// redux/slices/Assesment/assesmentSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';
// ---------- Types ----------
export type CreateAssesmentRequest = {
  AssetId: string;
};

export type AssesmentData = {
  UserId: string;
  AssetId: string;
  Status: string;
  Steps: number;
  CurrentStep: number;
  Responses: any[];
  _id: string;
  StartedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CreateAssesmentResponse = {
  status: boolean;
  message: string;
  data?: AssesmentData;
};

// ---------- Step Count Types ----------

export type GetStepCountResponse = {
  status: boolean;
  message: string;
  data: {
    current: number;
  };
};

// ---------- Submit Step Types ----------
export type SubmitStepRequest = {
  assessmentId: string; // dynamic path
  StepNumber: number;
  AssetId: string;
  CategoryId: string;
  QuestionId: string;
  AnswerValue: number;
};

// ---------- Step Answer Type ----------
export type StepAnswer = {
  _id: string;
  AssessmentId: string;
  UserId: string;
  StepNumber: number;
  AssetId: string;
  CategoryId: string;
  QuestionId: string;
  AnswerValue: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type SubmitStepResponse = {
  status: boolean;
  message: string;
  data: {
    assessment: AssesmentData;
    stepAnswers: StepAnswer[]; // ✅ typed
  };
};

// ---------- API Slice ----------
export const assesmentApi = createApi({
  reducerPath: 'assesmentApi',
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
    // ✅ Create / Start Assessment
    createAssesment: builder.mutation<CreateAssesmentResponse, CreateAssesmentRequest>({
      query: (body) => ({
        url: '/assesmentsteps/start',
        method: 'POST',
        body,
      }),
    }),

    // ✅ Get Step Count
    getAssesmentStepsCount: builder.query<GetStepCountResponse, string>({
      query: (assessmentId) => ({
        url: `/assesmentsteps/step-count/${assessmentId}`,
        method: 'GET',
      }),
    }),

    submitStep: builder.mutation<SubmitStepResponse, SubmitStepRequest>({
      query: ({ assessmentId, ...body }) => ({
        url: `/assesmentsteps/step/${assessmentId}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

// ---------- Hooks ----------
export const {
  useCreateAssesmentMutation,
  useSubmitStepMutation,
  useGetAssesmentStepsCountQuery,
  useLazyGetAssesmentStepsCountQuery, // ✅ Add this line
} = assesmentApi;
