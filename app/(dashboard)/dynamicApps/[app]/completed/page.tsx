// // //path: app/(dashboard)/dynamicApps/[app]/completed/page.tsx
// 'use client';

// import ResultPage from '@/components/results/ResultPage';
// import { useState, useRef, useEffect } from 'react';
// import { FaStar, FaRegClock } from 'react-icons/fa';

// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useGetResultByAssessmentIdQuery } from '@/redux/slices/result/resultSlice';

// const tabs = [
//   { id: 'results', label: 'Results' },
//   { id: 'suggestedCourses', label: 'Suggested Courses' },
//   { id: 'advice', label: 'Advice' },
// ];

// const courses = [
//   { id: 1, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
//   { id: 2, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
//   { id: 3, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
//   { id: 4, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
//   { id: 5, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
// ];

// export default function SuggestedCourses() {
//   const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

//   // Fetch result data only if assessmentId exists
//   const {
//     data: resultData,
//     error,
//     isLoading,
//   } = useGetResultByAssessmentIdQuery(assessmentId || '', { skip: !assessmentId });

//   console.log('Fetched Result Data:', resultData, 'Loading:', isLoading, 'Error:', error);

//   const [activeTab, setActiveTab] = useState('results');
//   const [highlightStyle, setHighlightStyle] = useState<{ left: number; width: number }>({
//     left: 0,
//     width: 0,
//   });

//   const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

//   // Update highlight position on tab change
//   useEffect(() => {
//     const index = tabs.findIndex((t) => t.id === activeTab);
//     const el = tabRefs.current[index];
//     if (el) {
//       setHighlightStyle({
//         left: el.offsetLeft,
//         width: el.offsetWidth,
//       });
//     }
//   }, [activeTab]);

//   return (
//     <div className="w-full min-h-screen bg-white md:px-4 sm:px-8 py-6">
//       {/* Tabs */}
//       <div className="relative flex rounded-full border border-gray-300 bg-gray-100 p-1 mb-6 max-w-fit">
//         {/* Moving Highlight */}
//         <div
//           className="absolute top-1 bottom-1 rounded-full bg-[#5A0C0C] transition-all duration-300 ease-in-out"
//           style={{
//             left: highlightStyle.left,
//             width: highlightStyle.width,
//           }}
//         />
//         {tabs.map((tab, index) => (
//           <button
//             key={tab.id}
//             ref={(el) => {
//               tabRefs.current[index] = el;
//             }}
//             onClick={() => setActiveTab(tab.id)}
//             className={`cursor-pointer relative z-1 rounded-full px-4 py-2 text-sm md:text-base font-medium transition-colors duration-300 ${
//               activeTab === tab.id ? 'text-white' : 'text-gray-600'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Grid of Courses */}
//       {activeTab === 'suggestedCourses' && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="p-3 max-h-[302px] h-[302px] border border-[#D0D5DD] rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col"
//             >
//               {/* Thumbnail */}
//               <div className="bg-[#542E2E] h-[180px] w-full rounded-lg flex items-center justify-center text-white">
//                 <span className="text-sm">▶</span>
//               </div>

//               {/* Content */}
//               <div className="py-3 space-y-2 flex flex-col gap-2 flex-1 justify-between">
//                 <p className="font-bold text-sm text-gray-800 w-[70%]">{course.title}</p>

//                 {/* Duration + Rating */}
//                 <div className="flex items-center justify-between text-xs text-gray-600">
//                   <span className="flex items-center gap-1 bg-[#543434] text-white px-2 py-2 rounded-[5px]">
//                     <FaRegClock className="text-[12px]" /> {course.duration}
//                   </span>
//                   <span className="flex items-center gap-1 text-yellow-500">
//                     <FaStar className="text-[12px]" />
//                     <span className="text-black text-base">{course.rating}</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeTab === 'results' && (
//         // <div className="text-gray-600 text-center mt-10">📊 Results content goes here</div>
//         <div className="text-gray-600 text-center ">
//           <ResultPage />
//         </div>
//       )}

//       {activeTab === 'advice' && (
//         <div className="text-gray-600 text-center mt-10">💡 Advice content goes here</div>
//       )}
//     </div>
//   );
// }
// ==================================
// ==================================
// ==================================
// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { FaStar, FaRegClock } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { useGetResultByAssessmentIdQuery } from '@/redux/slices/result/resultSlice';

// const tabs = [
//   { id: 'results', label: 'Results' },
//   { id: 'suggestedCourses', label: 'Suggested Courses' },
//   { id: 'advice', label: 'Advice' },
// ];

// // Placeholder courses (used as fallback if no recommended courses are provided)
// const placeholderCourses = [
//   { id: 1, title: 'UX Design Process Best Practice', duration: '10 min', rating: 4.3 },
//   { id: 2, title: 'Advanced UI Design Techniques', duration: '15 min', rating: 4.5 },
//   { id: 3, title: 'User Research Fundamentals', duration: '12 min', rating: 4.2 },
//   { id: 4, title: 'Prototyping for UX Designers', duration: '8 min', rating: 4.4 },
//   { id: 5, title: 'Accessibility in Web Design', duration: '10 min', rating: 4.3 },
// ];

// export default function SuggestedCourses() {
//   const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

//   // Fetch result data only if assessmentId exists
//   const {
//     data: resultData,
//     error,
//     isLoading,
//   } = useGetResultByAssessmentIdQuery(assessmentId || '', { skip: !assessmentId });

//   console.log('Fetched Result Data:', resultData, 'Loading:', isLoading, 'Error:', error);

//   const [activeTab, setActiveTab] = useState('results');
//   const [highlightStyle, setHighlightStyle] = useState<{ left: number; width: number }>({
//     left: 0,
//     width: 0,
//   });

//   const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

//   // Update highlight position on tab change
//   useEffect(() => {
//     const index = tabs.findIndex((t) => t.id === activeTab);
//     const el = tabRefs.current[index];
//     if (el) {
//       setHighlightStyle({
//         left: el.offsetLeft,
//         width: el.offsetWidth,
//       });
//     }
//   }, [activeTab]);

//   // Render loading state
//   if (isLoading) {
//     return <div className="text-gray-600 text-center mt-10">Loading assessment results...</div>;
//   }

//   // Render error state
//   if (error) {
//     return <div className="text-red-600 text-center mt-10">Error loading assessment results.</div>;
//   }

//   return (
//     <div className="w-full min-h-screen bg-white md:px-4 sm:px-8 py-6">
//       {/* Tabs */}
//       <div className="relative flex rounded-full border border-gray-300 bg-gray-100 p-1 mb-6 max-w-fit">
//         <div
//           className="absolute top-1 bottom-1 rounded-full bg-[#5A0C0C] transition-all duration-300 ease-in-out"
//           style={{
//             left: highlightStyle.left,
//             width: highlightStyle.width,
//           }}
//         />
//         {tabs.map((tab, index) => (
//           <button
//             key={tab.id}
//             ref={(el) => {
//               tabRefs.current[index] = el;
//             }}
//             onClick={() => setActiveTab(tab.id)}
//             className={`cursor-pointer relative z-10 rounded-full px-4 py-2 text-sm md:text-base font-medium transition-colors duration-300 ${
//               activeTab === tab.id ? 'text-white' : 'text-gray-600'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Results Tab */}
//       {activeTab === 'results' && resultData && (
//         <div className="text-gray-600">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Assessment Results</h2>
//             <p className="text-lg mb-2">
//               <strong>Total Score:</strong> {resultData.data.TotalScore} /{' '}
//               {resultData.data.MaxScore} ({resultData.data.Percentage.toFixed(2)}%)
//             </p>
//             <p className="text-sm mb-4">
//               <strong>Completed At:</strong>{' '}
//               {new Date(resultData.data.CompletedAt).toLocaleString()}
//             </p>
//             <h3 className="text-xl font-semibold mb-3">Category Scores</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {resultData.data.CategoryScores.map((category: any) => (
//                 <div key={category._id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
//                   <p className="font-medium">Category ID: {category.CategoryId}</p>
//                   <p>
//                     <strong>Score:</strong> {category.Score} / {category.MaxScore}
//                   </p>
//                   <p>
//                     <strong>Percentage:</strong> {category.Percentage.toFixed(2)}%
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Suggested Courses Tab */}
//       {activeTab === 'suggestedCourses' && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
//           {resultData?.data.RecommendedCourseId ? (
//             // If RecommendedCourseId exists, fetch and display course details (mocked here)
//             <div className="p-3 max-h-[302px] h-[302px] border border-[#D0D5DD] rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col">
//               <div className="bg-[#542E2E] h-[180px] w-full rounded-lg flex items-center justify-center text-white">
//                 <span className="text-sm">▶</span>
//               </div>
//               <div className="py-3 space-y-2 flex flex-col gap-2 flex-1 justify-between">
//                 <p className="font-bold text-sm text-gray-800 w-[70%]">
//                   Recommended Course (ID: {resultData.data.RecommendedCourseId})
//                 </p>
//                 <div className="flex items-center justify-between text-xs text-gray-600">
//                   <span className="flex items-center gap-1 bg-[#543434] text-white px-2 py-2 rounded-[5px]">
//                     <FaRegClock className="text-[12px]" /> 10 min
//                   </span>
//                   <span className="flex items-center gap-1 text-yellow-500">
//                     <FaStar className="text-[12px]" />
//                     <span className="text-black text-base">4.5</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // Fallback to placeholder courses if no recommended course
//             placeholderCourses.map((course) => (
//               <div
//                 key={course.id}
//                 className="p-3 max-h-[302px] h-[302px] border border-[#D0D5DD] rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col"
//               >
//                 <div className="bg-[#542E2E] h-[180px] w-full rounded-lg flex items-center justify-center text-white">
//                   <span className="text-sm">▶</span>
//                 </div>
//                 <div className="py-3 space-y-2 flex flex-col gap-2 flex-1 justify-between">
//                   <p className="font-bold text-sm text-gray-800 w-[70%]">{course.title}</p>
//                   <div className="flex items-center justify-between text-xs text-gray-600">
//                     <span className="flex items-center gap-1 bg-[#543434] text-white px-2 py-2 rounded-[5px]">
//                       <FaRegClock className="text-[12px]" /> {course.duration}
//                     </span>
//                     <span className="flex items-center gap-1 text-yellow-500">
//                       <FaStar className="text-[12px]" />
//                       <span className="text-black text-base">{course.rating}</span>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* Advice Tab */}
//       {activeTab === 'advice' && (
//         <div className="text-gray-600 text-center mt-10">
//           {resultData?.data.AdviceMessage ? (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold mb-4">Advice</h2>
//               <p>{resultData.data.AdviceMessage}</p>
//             </div>
//           ) : (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold mb-4">Advice</h2>
//               <p>No specific advice provided for this assessment.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import ResultPage from '@/components/results/ResultPage';
import { useState, useRef, useEffect } from 'react';
import { FaStar, FaRegClock } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetResultByAssessmentIdQuery } from '@/redux/slices/result/resultSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
import { setResultData } from '@/redux/slices/global/globalSlice';
// import { useEffect } from 'react';
import Advice from '@/components/results/Advice';

const tabs = [
  { id: 'results', label: 'Results' },
  { id: 'suggestedCourses', label: 'Suggested Courses' },
  { id: 'advice', label: 'Advice' },
];

const courses = [
  { id: 1, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 2, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 3, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 4, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
  { id: 5, title: 'Ux Design Process Best practice', duration: '10 min', rating: 4.3 },
];

export default function SuggestedCourses() {
  const dispatch = useDispatch();
  const assessmentId = useSelector((state: RootState) => state.global.assessmentId);

  // Fetch result data only if assessmentId exists
  const {
    data: resultData,
    error,
    isLoading,
  } = useGetResultByAssessmentIdQuery(assessmentId || '', { skip: !assessmentId });

  // Store result data in global Redux when fetched
  useEffect(() => {
    if (resultData?.data) {
      dispatch(setResultData(resultData.data));
    }
  }, [resultData, dispatch]);
  // console.log('Fetched Result Data:', resultData, 'Loading:', isLoading, 'Error:', error);
  // let finalPecentage = resultData?.data.Percentage;

  const [activeTab, setActiveTab] = useState('results');
  const [highlightStyle, setHighlightStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update highlight position on tab change
  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === activeTab);
    const el = tabRefs.current[index];
    if (el) {
      setHighlightStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab]);

  // Render loading state
  if (isLoading) {
    return <div className="text-gray-600 text-center mt-10">Loading assessment results...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-red-600 text-center mt-10">Error loading assessment results.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white md:px-4 sm:px-8 py-6">
      {/* Tabs */}
      <div className="relative flex rounded-full border border-gray-300 bg-gray-100 p-1 mb-6 max-w-fit">
        <div
          className="absolute top-1 bottom-1 rounded-full bg-[#5A0C0C] transition-all duration-300 ease-in-out"
          style={{
            left: highlightStyle.left,
            width: highlightStyle.width,
          }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer relative z-1 rounded-full px-4 py-2 text-sm md:text-base font-medium transition-colors duration-300 ${
              activeTab === tab.id ? 'text-white' : 'text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Suggested Courses Tab */}
      {activeTab === 'suggestedCourses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {resultData?.data.RecommendedCourseId ? (
            // Display a single recommended course card if RecommendedCourseId exists
            <div className="p-3 max-h-[302px] h-[302px] border border-[#D0D5DD] rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col">
              <div className="bg-[#542E2E] h-[180px] w-full rounded-lg flex items-center justify-center text-white">
                <span className="text-sm">▶</span>
              </div>
              <div className="py-3 space-y-2 flex flex-col gap-2 flex-1 justify-between">
                <p className="font-bold text-sm text-gray-800 w-[70%]">
                  Recommended Course (ID: {resultData.data.RecommendedCourseId})
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1 bg-[#543434] text-white px-2 py-2 rounded-[5px]">
                    <FaRegClock className="text-[12px]" /> 10 min
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <FaStar className="text-[12px]" />
                    <span className="text-black text-base">4.5</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Fallback to placeholder courses if no recommended course
            courses.map((course) => (
              <div
                key={course.id}
                className="p-3 max-h-[302px] h-[302px] border border-[#D0D5DD] rounded-lg shadow-sm hover:shadow-md transition bg-white flex flex-col"
              >
                <div className="bg-[#542E2E] h-[180px] w-full rounded-lg flex items-center justify-center text-white">
                  <span className="text-sm">▶</span>
                </div>
                <div className="py-3 space-y-2 flex flex-col gap-2 flex-1 justify-between">
                  <p className="font-bold text-sm text-gray-800 w-[70%]">{course.title}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1 bg-[#543434] text-white px-2 py-2 rounded-[5px]">
                      <FaRegClock className="text-[12px]" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="text-[12px]" />
                      <span className="text-black text-base">{course.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="text-gray-600 text-center">
          {/* <ResultPage resultData={resultData?.data} /> */}
          <ResultPage />
        </div>
      )}

      {/* Advice Tab */}
      {activeTab === 'advice' && (
        <div className="text-gray-600 text-center mt-10">
          {resultData?.data.AdviceMessage ? (
            // <p>{resultData.data.AdviceMessage}</p>
            <Advice />
          ) : (
            // <p>💡 No specific advice provided for this assessment.</p>
            <Advice />
          )}
        </div>
      )}
    </div>
  );
}
