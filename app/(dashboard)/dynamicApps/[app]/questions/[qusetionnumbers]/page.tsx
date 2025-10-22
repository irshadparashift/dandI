// =================== 07 Oct
// / app/(dashboard) / dynamicApps / [app] / questions / [questionnumbers] / page.tsx;
// 'use client';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useParams, useRouter, usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useGetQuestionsByCategoryIdQuery } from '@/redux/slices/questions/questionSlice';
// import { toast } from 'react-hot-toast';
// export default function QuestionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const appName = params.app as string;
//   // :white_check_mark: Redux category IDs
//   const categoryIds = useSelector((state: RootState) => state.global.categoryIds);
//   const categoryId = categoryIds?.[0];

//   // :white_check_mark: Fetch questions
//   const { data, isLoading, error } = useGetQuestionsByCategoryIdQuery(categoryId!, {
//     skip: !categoryId,
//   });
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const pathParts = pathname.split('/');
//   const questionNumber = Number(pathParts[pathParts.length - 1]) || 1;
//   useEffect(() => {
//     if (data?.data?.length) {
//       const index = Math.min(questionNumber - 1, data.data.length - 1);
//       setCurrentQuestionIndex(index);
//       setSelectedOption(null);
//     }
//   }, [pathname, data, questionNumber]);
//   // ========== Guard States ==========
//   if (!categoryId) return <p>No category selected</p>;
//   if (isLoading) return <p>Loading questions...</p>;
//   if (error) return <p>Failed to fetch questions</p>;
//   if (!data?.data?.length) return <p>No questions found</p>;
//   const question = data.data[currentQuestionIndex];
//   if (!question) return <p>Question not found</p>;
//   // ========== Handlers ==========
//   const handleOptionSelect = (opt: number) => {
//     setSelectedOption(opt);
//   };
//   const handleNext = () => {
//     if (selectedOption === null) {
//       toast.error('Please select an answer!');
//       return;
//     }
//     if (currentQuestionIndex < data.data.length - 1) {
//       const nextStep = currentQuestionIndex + 2; // 1-based
//       router.push(`/dynamicApps/${appName}/questions/${nextStep}`);
//     } else {
//       toast.success('You have completed all questions!');
//       router.push(`/dynamicApps/${appName}/completed`);
//     }
//   };
//   // ========== UI ==========
//   return (
//     <div className="min-h-screen flex flex-col gap-4 lg:gap-6  lg:flex-row items-center justify-between bg-gradient-to-br from-[#FEFEFE] to-[#F9F9F9] px-6 py-10">
//       {/* ===== Left Section (Text) ===== */}
//       <div className="flex-1 max-w-xl">
//         <h1 className="text-4xl md:text-2xl font-bold text-[#7F0000] mb-6">
//           Question {currentQuestionIndex + 1}
//         </h1>
//         <p className="text-lg text-gray-700 md:text-3xl mb-8">{question.Question}</p>
//         <div className="flex items-center gap-6 flex-wrap mb-10">
//           {question.Options.map((opt: number) => (
//             <label
//               key={opt}
//               className={`flex flex-col items-center cursor-pointer transition-all duration-300
//                 ${
//                   selectedOption === opt ? 'scale-105 text-white' : 'hover:scale-105 text-gray-700'
//                 }`}
//             >
//               <input
//                 type="radio"
//                 name={`question-${question._id}`}
//                 value={opt}
//                 checked={selectedOption === opt}
//                 onChange={() => handleOptionSelect(opt)}
//                 className="hidden"
//               />
//               <div
//                 className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold text-lg
//                   ${
//                     selectedOption === opt
//                       ? 'bg-[#7F0000] border-[#7F0000] text-white shadow-md'
//                       : 'bg-white border-gray-300 hover:border-[#7F0000]'
//                   }`}
//               >
//                 <span className="text-sm">{opt}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//         <button
//           onClick={handleNext}
//           disabled={selectedOption === null}
//           className={`w-full py-3 cursor-pointer text-lg font-semibold transition-all duration-300
//             ${
//               selectedOption === null
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-[#7F0000] hover:bg-[#7F0000] text-white shadow-md'
//             }`}
//         >
//           {currentQuestionIndex < data.data.length - 1 ? 'Next' : 'Finish'}
//         </button>
//       </div>
//       {/* ===== Right Section (Image) ===== */}
//       <div className="flex-1 flex justify-center mt-10 md:mt-0">
//         <Image
//           src="/inclusion/qusetionsScreenBg.png"
//           alt="Question Illustration"
//           width={400}
//           height={400}
//           className="w-full max-w-md h-auto"
//         />
//       </div>
//     </div>
//   );
// }

// 'use client';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useParams, useRouter, usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { toast } from 'react-hot-toast';

// export default function QuestionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const appName = params.app as string;

//   // ✅ Get all questions from Redux (fetched on Start Now click)
//   const questions = useSelector((state: RootState) => state.global.questions);
//   console.log(questions, '===== All Questions from Redux');

//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   const questionNumber = Number(pathname.split('/').pop()) || 1;
//   const currentQuestionIndex = questionNumber - 1; // 0-based index

//   const question = questions[currentQuestionIndex];

//   useEffect(() => {
//     // Reset selection when navigating to a new question
//     setSelectedOption(null);
//   }, [currentQuestionIndex]);

//   // ========== Guard States ==========
//   if (!questions?.length) return <p>No questions found. Please start the assessment first.</p>;
//   if (!question) return <p>Question not found</p>;

//   // ========== Handlers ==========
//   const handleOptionSelect = (opt: number) => setSelectedOption(opt);

//   const handleNext = () => {
//     if (selectedOption === null) {
//       toast.error('Please select an answer!');
//       return;
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       const nextStep = currentQuestionIndex + 2; // 1-based numbering
//       router.push(`/dynamicApps/${appName}/questions/${nextStep}`);
//     } else {
//       toast.success('You have completed all questions!');
//       router.push(`/dynamicApps/${appName}/completed`);
//     }
//   };

//   // ========== UI ==========
//   return (
//     <div className="min-h-screen flex flex-col gap-4 lg:gap-6 lg:flex-row items-center justify-between bg-gradient-to-br from-[#FEFEFE] to-[#F9F9F9] px-6 py-10">
//       {/* Left Section (Text) */}
//       <div className="flex-1 max-w-xl">
//         <h1 className="text-4xl md:text-2xl font-bold text-[#7F0000] mb-6">
//           Question {currentQuestionIndex + 1}
//         </h1>
//         <p className="text-lg text-gray-700 md:text-3xl mb-8">{question.Question}</p>

//         <div className="flex items-center gap-6 flex-wrap mb-10">
//           {question.Options.map((opt: number) => (
//             <label
//               key={opt}
//               className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
//                 selectedOption === opt ? 'scale-105 text-white' : 'hover:scale-105 text-gray-700'
//               }`}
//             >
//               <input
//                 type="radio"
//                 name={`question-${question._id}`}
//                 value={opt}
//                 checked={selectedOption === opt}
//                 onChange={() => handleOptionSelect(opt)}
//                 className="hidden"
//               />
//               <div
//                 className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold text-lg ${
//                   selectedOption === opt
//                     ? 'bg-[#7F0000] border-[#7F0000] text-white shadow-md'
//                     : 'bg-white border-gray-300 hover:border-[#7F0000]'
//                 }`}
//               >
//                 <span className="text-sm">{opt}</span>
//               </div>
//             </label>
//           ))}
//         </div>

//         <button
//           onClick={handleNext}
//           disabled={selectedOption === null}
//           className={`w-full py-3 cursor-pointer text-lg font-semibold transition-all duration-300 ${
//             selectedOption === null
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-[#7F0000] hover:bg-[#7F0000] text-white shadow-md'
//           }`}
//         >
//           {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
//         </button>
//       </div>

//       {/* Right Section (Image) */}
//       <div className="flex-1 flex justify-center mt-10 md:mt-0">
//         <Image
//           src="/inclusion/qusetionsScreenBg.png"
//           alt="Question Illustration"
//           width={400}
//           height={400}
//           className="w-full max-w-md h-auto"
//         />
//       </div>
//     </div>
//   );
// }
// ===================
// ===================
// ===================
// ===================
//path: app/(dashboard)/dynamicApps/[app]/questions/[questionnumbers]/page.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useParams, useRouter, usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { toast } from 'react-hot-toast';

// export default function QuestionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const appName = params.app as string;

//   const questions = useSelector((state: RootState) => state.global.questions);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   const questionNumber = Number(pathname.split('/').pop()) || 1;
//   const currentQuestionIndex = questionNumber - 1;
//   const question = questions[currentQuestionIndex];

//   useEffect(() => {
//     setSelectedOption(null);
//   }, [currentQuestionIndex]);

//   if (!questions?.length) return <p>No questions found. Please start the assessment first.</p>;
//   if (!question) return <p>Question not found</p>;

//   const handleOptionSelect = (opt: number) => setSelectedOption(opt);

//   const handleNext = () => {
//     if (selectedOption === null) {
//       toast.error('Please select an answer!');
//       return;
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       router.push(`/dynamicApps/${appName}/questions/${currentQuestionIndex + 2}`);
//     } else {
//       toast.success('You have completed all questions!');
//       router.push(`/dynamicApps/${appName}/completed`);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col gap-4 lg:gap-6 lg:flex-row items-center justify-between bg-gradient-to-br from-[#FEFEFE] to-[#F9F9F9] px-6 py-10">
//       <div className="flex-1 max-w-xl">
//         <h1 className="text-4xl md:text-2xl font-bold text-[#7F0000] mb-6">
//           Question {currentQuestionIndex + 1}
//         </h1>
//         <p className="text-lg text-gray-700 md:text-3xl mb-8">{question.Question}</p>
//         <div className="flex items-center gap-6 flex-wrap mb-10">
//           {question.Options.map((opt: number) => (
//             <label
//               key={opt}
//               className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
//                 selectedOption === opt ? 'scale-105 text-white' : 'hover:scale-105 text-gray-700'
//               }`}
//             >
//               <input
//                 type="radio"
//                 name={`question-${question._id}`}
//                 value={opt}
//                 checked={selectedOption === opt}
//                 onChange={() => handleOptionSelect(opt)}
//                 className="hidden"
//               />
//               <div
//                 className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold text-lg ${
//                   selectedOption === opt
//                     ? 'bg-[#7F0000] border-[#7F0000] text-white shadow-md'
//                     : 'bg-white border-gray-300 hover:border-[#7F0000]'
//                 }`}
//               >
//                 <span className="text-sm">{opt}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//         <button
//           onClick={handleNext}
//           disabled={selectedOption === null}
//           className={`w-full py-3 cursor-pointer text-lg font-semibold transition-all duration-300 ${
//             selectedOption === null
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-[#7F0000] hover:bg-[#7F0000] text-white shadow-md'
//           }`}
//         >
//           {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
//         </button>
//       </div>

//       <div className="flex-1 flex justify-center mt-10 md:mt-0">
//         <Image
//           src="/inclusion/qusetionsScreenBg.png"
//           alt="Question Illustration"
//           width={400}
//           height={400}
//           className="w-full max-w-md h-auto"
//         />
//       </div>
//     </div>
//   );
// }
// ==========================
// ==========================
// ========================== submit added
//path: app/(dashboard)/dynamicApps/[app]/questions/[questionnumbers]/page.tsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useParams, useRouter, usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { toast } from 'react-hot-toast';
// import { useSubmitStepMutation, SubmitStepRequest } from '@/redux/slices/assesment/assesmentSlice';
// import { getCookie } from '@/utils/cookies';

// export default function QuestionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const appName = params.app as string;

//   const questions = useSelector((state: RootState) => state.global.questions);
//   // const assessmentId = useSelector((state: RootState) => state.global.assessmentId);
//   const assessmentIdFromRedux = useSelector((state: RootState) => state.global.assessmentId);
//   const assessmentId = assessmentIdFromRedux || getCookie('assessmentId');
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   const questionNumber = Number(pathname.split('/').pop()) || 1;
//   const currentQuestionIndex = questionNumber - 1;
//   const question = questions[currentQuestionIndex];
//   console.log(question, '===== Current Question');

//   const [submitStep, { isLoading: isSubmitting }] = useSubmitStepMutation();

//   useEffect(() => {
//     setSelectedOption(null);
//   }, [currentQuestionIndex]);

//   if (!questions?.length) return <p>No questions found. Please start the assessment first.</p>;
//   if (!question) return <p>Question not found</p>;
//   if (!assessmentId) return <p>Assessment not started. Please start first.</p>;

//   const handleOptionSelect = (opt: number) => setSelectedOption(opt);

//   const handleNext = async () => {
//     if (selectedOption === null) {
//       toast.error('Please select an answer!');
//       return;
//     }

//     try {
//       const body: SubmitStepRequest = {
//         assessmentId,
//         StepNumber: questionNumber,
//         AssetId: question.CategoryId, // or use assetId from Redux
//         CategoryId: question.CategoryId,
//         QuestionId: question._id,
//         AnswerValue: selectedOption,
//       };

//       const res = await submitStep(body).unwrap();

//       // Check the returned answer
//       const lastAnswer = res?.data?.stepAnswers?.[res.data.stepAnswers.length - 1];
//       if (!lastAnswer) {
//         toast.error('Failed to save answer.');
//         return;
//       }

//       if (lastAnswer.AnswerValue > 0) {
//         // ✅ Proceed to next question
//         if (currentQuestionIndex < questions.length - 1) {
//           router.push(`/dynamicApps/${appName}/questions/${currentQuestionIndex + 2}`);
//         } else {
//           toast.success('You have completed all questions!');
//           router.push(`/dynamicApps/${appName}/completed`);
//         }
//       } else {
//         toast.error('Answer was not saved. Please try again.');
//       }
//     } catch (err) {
//       console.error('Failed to submit answer:', err);
//       toast.error('Something went wrong while submitting your answer.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col gap-4 lg:gap-6 lg:flex-row items-center justify-between bg-gradient-to-br from-[#FEFEFE] to-[#F9F9F9] px-6 py-10">
//       <div className="flex-1 max-w-xl">
//         <h1 className="text-4xl md:text-2xl font-bold text-[#7F0000] mb-6 capitalize">
//           {/* Question {currentQuestionIndex + 1}{' '} */}
//           {question.CategoryName && `${question.CategoryName}`}
//         </h1>
//         <p className="text-lg text-gray-700 md:text-3xl mb-8">{question.Question}</p>
//         <div className="flex items-center gap-6 flex-wrap mb-10">
//           {question.Options.map((opt: number) => (
//             <label
//               key={opt}
//               className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
//                 selectedOption === opt ? 'scale-105 text-white' : 'hover:scale-105 text-gray-700'
//               }`}
//             >
//               <input
//                 type="radio"
//                 name={`question-${question._id}`}
//                 value={opt}
//                 checked={selectedOption === opt}
//                 onChange={() => handleOptionSelect(opt)}
//                 className="hidden"
//               />
//               <div
//                 className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold text-lg ${
//                   selectedOption === opt
//                     ? 'bg-[#7F0000] border-[#7F0000] text-white shadow-md'
//                     : 'bg-white border-gray-300 hover:border-[#7F0000]'
//                 }`}
//               >
//                 <span className="text-sm">{opt}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//         <button
//           onClick={handleNext}
//           disabled={selectedOption === null || isSubmitting}
//           className={`w-full py-3 cursor-pointer text-lg font-semibold transition-all duration-300 ${
//             selectedOption === null || isSubmitting
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-[#7F0000] hover:bg-[#7F0000] text-white shadow-md'
//           }`}
//         >
//           {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
//         </button>
//       </div>

//       <div className="flex-1 flex justify-center mt-10 md:mt-0">
//         <Image
//           src="/inclusion/qusetionsScreenBg.png"
//           alt="Question Illustration"
//           width={400}
//           height={400}
//           className="w-full max-w-md h-auto"
//         />
//       </div>
//     </div>
//   );
// }
// ========================
// ========================
// ========================

//path : app/(dashboard)/dynamicApps/[app]/questions/[questionnumbers]/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-hot-toast';
import { useSubmitStepMutation, SubmitStepRequest } from '@/redux/slices/assesment/assesmentSlice';

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const appName = params.app as string;

  const questions = useSelector((state: RootState) => state.global.questions);
  const assessmentId = useSelector((state: RootState) => state.global.assessmentId);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questionNumber = Number(pathname.split('/').pop()) || 1;
  const currentQuestionIndex = questionNumber - 1;
  const question = questions[currentQuestionIndex];

  const [submitStep, { isLoading: isSubmitting }] = useSubmitStepMutation();

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestionIndex]);

  if (!questions?.length) return <p>No questions found. Please start the assessment first.</p>;
  if (!question) return <p>Question not found</p>;
  if (!assessmentId) return <p>Assessment not started. Please start first.</p>;

  const handleOptionSelect = (opt: number) => setSelectedOption(opt);

  const handleNext = async () => {
    if (selectedOption === null) {
      toast.error('Please select an answer!');
      return;
    }

    try {
      const body: SubmitStepRequest = {
        assessmentId,
        StepNumber: questionNumber,
        AssetId: question.CategoryId,
        CategoryId: question.CategoryId,
        QuestionId: question._id,
        AnswerValue: selectedOption,
      };

      const res = await submitStep(body).unwrap();
      const lastAnswer = res?.data?.stepAnswers?.[res.data.stepAnswers.length - 1];

      if (!lastAnswer) {
        // toast.error('Failed to save answer.');
        console.log('Failed to save answer.');
        return;
      }

      if (lastAnswer.AnswerValue > 0) {
        if (currentQuestionIndex < questions.length - 1) {
          router.push(`/dynamicApps/${appName}/questions/${currentQuestionIndex + 2}`);
        } else {
          toast.success('You have completed all questions!');
          router.push(`/dynamicApps/${appName}/completed`);
        }
      } else {
        toast.error('Answer was not saved. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
      toast.error('Something went wrong while submitting your answer.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 lg:gap-6 lg:flex-row items-center justify-between bg-gradient-to-br from-[#FEFEFE] to-[#F9F9F9] px-6 py-10">
      <div className="flex-1 max-w-xl">
        <h1 className="text-4xl md:text-2xl font-bold text-[#7F0000] mb-6 capitalize">
          {question.CategoryName && `${question.CategoryName}`}
        </h1>
        <p className="text-lg text-gray-700 md:text-3xl mb-8">{question.Question}</p>
        <div className="flex items-center gap-6 flex-wrap mb-10">
          {question.Options.map((opt: number) => (
            <label
              key={opt}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                selectedOption === opt ? 'scale-105 text-white' : 'hover:scale-105 text-gray-700'
              }`}
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={opt}
                checked={selectedOption === opt}
                onChange={() => handleOptionSelect(opt)}
                className="hidden"
              />
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold text-lg ${
                  selectedOption === opt
                    ? 'bg-[#7F0000] border-[#7F0000] text-white shadow-md'
                    : 'bg-white border-gray-300 hover:border-[#7F0000]'
                }`}
              >
                <span className="text-sm">{opt}</span>
              </div>
            </label>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={selectedOption === null || isSubmitting}
          className={`w-full py-3 cursor-pointer text-lg font-semibold transition-all duration-300 ${
            selectedOption === null || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#7F0000] hover:bg-[#7F0000] text-white shadow-md'
          }`}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>

      <div className="flex-1 flex justify-center mt-10 md:mt-0">
        <Image
          src="/inclusion/qusetionsScreenBg.png"
          alt="Question Illustration"
          width={400}
          height={400}
          className="w-full max-w-md h-auto"
        />
      </div>
    </div>
  );
}
