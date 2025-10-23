// =========================== backup

// 'use client';

// import * as am5 from '@amcharts/amcharts5';
// import * as am5radar from '@amcharts/amcharts5/radar';
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import * as am5xy from '@amcharts/amcharts5/xy';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useLayoutEffect, useMemo, useRef, useState } from 'react';

// export default function ResultPage({ resultData }: { resultData?: any }) {
//   console.log(resultData, 'resultData props');

//   const chartRef = useRef(null);
//   const [selectedCategory, setSelectedCategory] = useState<CategoryName>('Respect');

//   // Sample data - in real app, this would come from API
//   // const resultsData = [
//   //   { category: 'Respect', value: 90 },
//   //   { category: 'Diversity', value: 70 },
//   //   { category: 'Equality', value: 65 },
//   //   { category: 'Accessibility', value: 60 },
//   //   { category: 'Transparency', value: 55 },
//   //   { category: 'Participation', value: 75 },
//   //   { category: 'Collaboration', value: 85 },
//   //   { category: 'Development', value: 40 },
//   //   { category: 'Fairness', value: 68 },
//   //   { category: 'Safety', value: 80 },
//   //   [],
//   // ];

//   const resultsData = useMemo(
//     () => [
//       { category: 'Respect', value: 90 },
//       { category: 'Diversity', value: 70 },
//       { category: 'Equality', value: 65 },
//       { category: 'Accessibility', value: 60 },
//       { category: 'Transparency', value: 55 },
//       { category: 'Participation', value: 75 },
//       { category: 'Collaboration', value: 85 },
//       { category: 'Development', value: 40 },
//       { category: 'Fairness', value: 68 },
//       { category: 'Safety', value: 80 },
//     ],
//     [],
//   );

//   type CategoryItem = {
//     question: string;
//     score: number;
//     status: string;
//     color: string;
//   };

//   type CategoryName = 'Respect' | 'Diversity';

//   const categoryDetails: Record<CategoryName, CategoryItem[]> = {
//     Respect: [
//       {
//         question: 'How inclusive are you in your daily interactions?',
//         score: 68,
//         status: 'Average',
//         color: 'bg-blue-500',
//       },
//       {
//         question: 'Do you actively listen to different perspectives?',
//         score: 82,
//         status: 'Good',
//         color: 'bg-green-500',
//       },
//       {
//         question: 'Are all team members treated with equal respect?',
//         score: 75,
//         status: 'Good',
//         color: 'bg-green-500',
//       },
//     ],
//     Diversity: [
//       {
//         question: 'Does your team represent diverse backgrounds?',
//         score: 34,
//         status: 'Below Average',
//         color: 'bg-orange-500',
//       },
//       {
//         question: 'Are diverse perspectives valued in decision making?',
//         score: 65,
//         status: 'Average',
//         color: 'bg-blue-500',
//       },
//       {
//         question: 'Is there equal representation at all levels?',
//         score: 45,
//         status: 'Below Average',
//         color: 'bg-orange-500',
//       },
//     ],
//   };

//   // Initialize radar chart
//   useLayoutEffect(() => {
//     if (!chartRef.current) return;

//     const root = am5.Root.new(chartRef.current);
//     root.setThemes([am5themes_Animated.new(root)]);

//     const chart = root.container.children.push(
//       am5radar.RadarChart.new(root, {
//         startAngle: 0,
//         endAngle: 360,
//         innerRadius: am5.percent(20),
//       }),
//     );

//     const xAxis = chart.xAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         categoryField: 'category',
//         renderer: am5radar.AxisRendererCircular.new(root, {}),
//       }),
//     );

//     xAxis.get('renderer').labels.template.setAll({
//       fontSize: window.innerWidth < 768 ? 10 : 12,
//       fontWeight: '500',
//       fill: am5.color(0x374151),
//       textAlign: 'center',
//     });

//     const yAxis = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: am5radar.AxisRendererRadial.new(root, {}),
//         min: 0,
//         max: 100,
//       }),
//     );

//     yAxis.get('renderer').labels.template.setAll({
//       fontSize: window.innerWidth < 768 ? 8 : 10,
//       fill: am5.color(0x6b7280),
//     });

//     xAxis.data.setAll(resultsData);

//     const series = chart.series.push(
//       am5radar.RadarLineSeries.new(root, {
//         name: 'DEI Scores',
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: 'value',
//         categoryXField: 'category',
//         fill: am5.color(0x3b82f6),
//       }),
//     );

//     series.data.setAll(resultsData);

//     series.strokes.template.setAll({
//       strokeWidth: 3,
//       stroke: am5.color(0x3b82f6),
//     });

//     series.fills.template.setAll({
//       fill: am5.color(0x3b82f6),
//       fillOpacity: 0.1,
//     });

//     series.bullets.push(() =>
//       am5.Bullet.new(root, {
//         sprite: am5.Circle.new(root, {
//           radius: 6,
//           fill: am5.color(0x3b82f6),
//           stroke: am5.color(0xffffff),
//           strokeWidth: 2,
//         }),
//       }),
//     );

//     chart.appear(1000, 100);
//     series.appear(1000);

//     return () => {
//       root.dispose();
//     };
//   }, [resultsData]);

//   const getScoreColor = (score: number): string => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-blue-600';
//     if (score >= 40) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   const getProgressColor = (score: number): string => {
//     if (score >= 80) return 'bg-green-500';
//     if (score >= 60) return 'bg-blue-500';
//     if (score >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   const overallScore = Math.round(
//     resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length,
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center space-y-4">
//             <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//               <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//               Assessment Complete
//             </div>
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
//               Your D&I Assessment Results
//             </h1>
//             <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
//               Thank you for completing the DEI Self-Assessment. Here how your organisation scored
//               across different dimensions.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-0 py-8  lg:px-0">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Chart and Overview */}
//           <div className="space-y-6">
//             {/* Overall Score Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//               <div className="space-y-4">
//                 <div>
//                   <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
//                     {overallScore}%
//                   </div>
//                   <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//                   <div className="text-sm text-gray-500">
//                     Based on {resultsData.length} assessment categories
//                   </div>
//                 </div>

//                 <div className="w-full bg-gray-200 rounded-full h-3">
//                   <div
//                     className={`h-3 rounded-full ${getProgressColor(
//                       overallScore,
//                     )} transition-all duration-1000 ease-out`}
//                     style={{ width: `${overallScore}%` }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Radar Chart */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//                 D&I Assessment Radar
//               </h3>
//               <div ref={chartRef} className="w-full h-64 md:h-80 lg:h-96" />
//             </div>
//           </div>

//           {/* Right Column - Detailed Results */}
//           <div className="space-y-6">
//             {/* Category Selection */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Details</h3>

//               {/* Category Tabs */}
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {(Object.keys(categoryDetails) as CategoryName[]).map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       selectedCategory === category
//                         ? 'bg-blue-500 text-white shadow-md'
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Category Score Cards */}
//               <div className="space-y-4">
//                 {(categoryDetails[selectedCategory] || []).map(
//                   (item: CategoryItem, index: number) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4">
//                       <p className="text-sm text-gray-700 mb-3">{item.question}</p>
//                       <div className="w-full bg-gray-200 h-2 rounded mb-2">
//                         <div
//                           className={`h-2 rounded transition-all duration-500 ${getProgressColor(
//                             item.score,
//                           )}`}
//                           style={{ width: `${item.score}%` }}
//                         />
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
//                           {item.score}%
//                         </span>
//                         <span className="text-sm text-gray-500">{item.status}</span>
//                       </div>
//                     </div>
//                   ),
//                 )}
//               </div>
//             </div>

//             {/* Recommended Course */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Learning</h3>

//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex flex-col sm:flex-row items-start gap-4">
//                   <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                     <Image
//                       src="/results/recommendedBg.png"
//                       alt="Recommended Course"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 space-y-2">
//                     <h4 className="font-semibold text-gray-800">Building Inclusive Leadership</h4>
//                     <p className="text-sm text-gray-600">
//                       Learn practical strategies to create more inclusive environments and improve
//                       your organizations D&I outcomes.
//                     </p>
//                     <div className="flex items-center space-x-4 text-xs text-gray-500">
//                       <span>⏱️ 2 hours</span>
//                       <span>📚 4 modules</span>
//                       <span>🎯 Beginner friendly</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-blue-200">
//                   <Link
//                     href="/inclusion/outcome"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
//                   >
//                     Start Learning Path
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// ====================
// ====================
// ====================
// 'use client';
// import { RootState } from '@/redux/store';
// import * as am5 from '@amcharts/amcharts5';
// import * as am5radar from '@amcharts/amcharts5/radar';
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import * as am5xy from '@amcharts/amcharts5/xy';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useLayoutEffect, useMemo, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// export default function ResultPage() {
//   const resultData = useSelector((state: RootState) => state.global.resultData);

//   console.log(resultData, 'resultData from store');

//   if (!resultData) {
//     return <div className="text-center text-gray-600 mt-10">No result data available</div>;
//   }

//   // console.log(resultData, 'resultData props');

//   const chartRef = useRef(null);
//   const [selectedCategory, setSelectedCategory] = useState<CategoryName>('Respect');

//   // Move color functions before useMemo
//   const getScoreColor = (score: number): string => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-blue-600';
//     if (score >= 40) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   const getProgressColor = (score: number): string => {
//     if (score >= 80) return 'bg-green-500';
//     if (score >= 60) return 'bg-blue-500';
//     if (score >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   // Map CategoryScores to named categories, aligning with the original 10 categories
//   const resultsData = useMemo(() => {
//     const categoryNames = [
//       'Respect',
//       'Diversity',
//       'Equality',
//       'Accessibility',
//       'Transparency',
//       'Participation',
//       'Collaboration',
//       'Development',
//       'Fairness',
//       'Safety',
//     ];

//     // Use CategoryScores from resultData if available, otherwise fallback to default values
//     return categoryNames.map((category, index) => ({
//       category,
//       value:
//         resultData?.CategoryScores[index]?.Percentage ??
//         [90, 70, 65, 60, 55, 75, 85, 40, 68, 80][index],
//     }));
//   }, [resultData]);

//   type CategoryItem = {
//     question: string;
//     score: number;
//     status: string;
//     color: string;
//   };

//   type CategoryName = 'Respect' | 'Diversity';

//   // Dynamic category details based on resultData
//   const categoryDetails: Record<CategoryName, CategoryItem[]> = useMemo(() => {
//     const respectScore = resultData?.CategoryScores[0]?.Percentage ?? 90;
//     const diversityScore = resultData?.CategoryScores[1]?.Percentage ?? 70;

//     const getStatus = (score: number): string => {
//       if (score >= 80) return 'Good';
//       if (score >= 60) return 'Average';
//       return 'Below Average';
//     };

//     return {
//       Respect: [
//         {
//           question: 'How inclusive are you in your daily interactions?',
//           score: Math.round(respectScore * 0.9), // Simulate question-level score
//           status: getStatus(Math.round(respectScore * 0.9)),
//           color: getProgressColor(Math.round(respectScore * 0.9)),
//         },
//         {
//           question: 'Do you actively listen to different perspectives?',
//           score: Math.round(respectScore * 1.1), // Simulate variation
//           status: getStatus(Math.round(respectScore * 1.1)),
//           color: getProgressColor(Math.round(respectScore * 1.1)),
//         },
//         {
//           question: 'Are all team members treated with equal respect?',
//           score: respectScore,
//           status: getStatus(respectScore),
//           color: getProgressColor(respectScore),
//         },
//       ],
//       Diversity: [
//         {
//           question: 'Does your team represent diverse backgrounds?',
//           score: Math.round(diversityScore * 0.8),
//           status: getStatus(Math.round(diversityScore * 0.8)),
//           color: getProgressColor(Math.round(diversityScore * 0.8)),
//         },
//         {
//           question: 'Are diverse perspectives valued in decision making?',
//           score: diversityScore,
//           status: getStatus(diversityScore),
//           color: getProgressColor(diversityScore),
//         },
//         {
//           question: 'Is there equal representation at all levels?',
//           score: Math.round(diversityScore * 0.9),
//           status: getStatus(Math.round(diversityScore * 0.9)),
//           color: getProgressColor(Math.round(diversityScore * 0.9)),
//         },
//       ],
//     };
//   }, [resultData]);

//   // Initialize radar chart
//   useLayoutEffect(() => {
//     if (!chartRef.current) return;

//     const root = am5.Root.new(chartRef.current);
//     root.setThemes([am5themes_Animated.new(root)]);

//     const chart = root.container.children.push(
//       am5radar.RadarChart.new(root, {
//         startAngle: 0,
//         endAngle: 360,
//         innerRadius: am5.percent(20),
//       }),
//     );

//     const xAxis = chart.xAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         categoryField: 'category',
//         renderer: am5radar.AxisRendererCircular.new(root, {}),
//       }),
//     );

//     xAxis.get('renderer').labels.template.setAll({
//       fontSize: window.innerWidth < 768 ? 10 : 12,
//       fontWeight: '500',
//       fill: am5.color(0x374151),
//       textAlign: 'center',
//     });

//     const yAxis = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: am5radar.AxisRendererRadial.new(root, {}),
//         min: 0,
//         max: 100,
//       }),
//     );

//     yAxis.get('renderer').labels.template.setAll({
//       fontSize: window.innerWidth < 768 ? 8 : 10,
//       fill: am5.color(0x6b7280),
//     });

//     xAxis.data.setAll(resultsData);

//     const series = chart.series.push(
//       am5radar.RadarLineSeries.new(root, {
//         name: 'DEI Scores',
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: 'value',
//         categoryXField: 'category',
//         fill: am5.color(0x3b82f6),
//       }),
//     );

//     series.data.setAll(resultsData);

//     series.strokes.template.setAll({
//       strokeWidth: 3,
//       stroke: am5.color(0x3b82f6),
//     });

//     series.fills.template.setAll({
//       fill: am5.color(0x3b82f6),
//       fillOpacity: 0.1,
//     });

//     series.bullets.push(() =>
//       am5.Bullet.new(root, {
//         sprite: am5.Circle.new(root, {
//           radius: 6,
//           fill: am5.color(0x3b82f6),
//           stroke: am5.color(0xffffff),
//           strokeWidth: 2,
//         }),
//       }),
//     );

//     chart.appear(1000, 100);
//     series.appear(1000);

//     return () => {
//       root.dispose();
//     };
//   }, [resultsData]);

//   const overallScore = resultData?.Percentage
//     ? Math.round(resultData.Percentage)
//     : Math.round(resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center space-y-4">
//             <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//               <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//               Assessment Complete
//             </div>
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
//               Your D&I Assessment Results
//             </h1>
//             <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
//               Thank you for completing the DEI Self-Assessment. Here how your organisation scored
//               across different dimensions.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-0 py-8  lg:px-0">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Chart and Overview */}
//           <div className="space-y-6">
//             {/* Overall Score Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//               <div className="space-y-4">
//                 <div>
//                   <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
//                     {overallScore}%
//                   </div>
//                   <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//                   <div className="text-sm text-gray-500">
//                     Based on {resultsData.length} assessment categories
//                   </div>
//                 </div>

//                 <div className="w-full bg-gray-200 rounded-full h-3">
//                   <div
//                     className={`h-3 rounded-full ${getProgressColor(
//                       overallScore,
//                     )} transition-all duration-1000 ease-out`}
//                     style={{ width: `${overallScore}%` }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Radar Chart */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//                 D&I Assessment Radar
//               </h3>
//               <div ref={chartRef} className="w-full h-64 md:h-80 lg:h-96" />
//             </div>
//           </div>

//           {/* Right Column - Detailed Results */}
//           <div className="space-y-6">
//             {/* Category Selection */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Details</h3>

//               {/* Category Tabs */}
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {(Object.keys(categoryDetails) as CategoryName[]).map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       selectedCategory === category
//                         ? 'bg-blue-500 text-white shadow-md'
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Category Score Cards */}
//               <div className="space-y-4">
//                 {(categoryDetails[selectedCategory] || []).map(
//                   (item: CategoryItem, index: number) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4">
//                       <p className="text-sm text-gray-700 mb-3">{item.question}</p>
//                       <div className="w-full bg-gray-200 h-2 rounded mb-2">
//                         <div
//                           className={`h-2 rounded transition-all duration-500 ${getProgressColor(
//                             item.score,
//                           )}`}
//                           style={{ width: `${item.score}%` }}
//                         />
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
//                           {item.score}%
//                         </span>
//                         <span className="text-sm text-gray-500">{item.status}</span>
//                       </div>
//                     </div>
//                   ),
//                 )}
//               </div>
//             </div>

//             {/* Recommended Course */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Learning</h3>

//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex flex-col sm:flex-row items-start gap-4">
//                   <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                     <Image
//                       src="/results/recommendedBg.png"
//                       alt="Recommended Course"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 space-y-2">
//                     <h4 className="font-semibold text-gray-800">Building Inclusive Leadership</h4>
//                     <p className="text-sm text-gray-600">
//                       Learn practical strategies to create more inclusive environments and improve
//                       your organizations D&I outcomes.
//                     </p>
//                     <div className="flex items-center space-x-4 text-xs text-gray-500">
//                       <span>⏱️ 2 hours</span>
//                       <span>📚 4 modules</span>
//                       <span>🎯 Beginner friendly</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-blue-200">
//                   <Link
//                     href="/inclusion/outcome"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
//                   >
//                     Start Learning Path
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// ================
// ================
// ================
// 'use client';

// import { RootState } from '@/redux/store';
// import * as am5 from '@amcharts/amcharts5';
// import * as am5radar from '@amcharts/amcharts5/radar';
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import * as am5xy from '@amcharts/amcharts5/xy';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useLayoutEffect, useMemo, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';

// export default function ResultPage() {
//   const resultData = useSelector((state: RootState) => state.global.resultData);
//   console.log(resultData, 'resultData from store');

//   const chartRef = useRef(null);
//   const [selectedCategory, setSelectedCategory] = useState<CategoryName>('Respect');

//   // Move color functions before useMemo
//   const getScoreColor = (score: number): string => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-blue-600';
//     if (score >= 40) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   const getProgressColor = (score: number): string => {
//     if (score >= 80) return 'bg-green-500';
//     if (score >= 60) return 'bg-blue-500';
//     if (score >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   // Map CategoryScores to named categories, aligning with the original 10 categories
//   const resultsData = useMemo(() => {
//     const categoryNames = [
//       'Respect',
//       'Diversity',
//       'Equality',
//       'Accessibility',
//       'Transparency',
//       'Participation',
//       'Collaboration',
//       'Development',
//       'Fairness',
//       'Safety',
//     ];

//     return categoryNames.map((category, index) => ({
//       category,
//       value:
//         resultData?.CategoryScores[index]?.Percentage ??
//         [90, 70, 65, 60, 55, 75, 85, 40, 68, 80][index],
//     }));
//   }, [resultData]);

//   type CategoryItem = {
//     question: string;
//     score: number;
//     status: string;
//     color: string;
//   };

//   type CategoryName = 'Respect' | 'Diversity';

//   // Dynamic category details based on resultData
//   const categoryDetails: Record<CategoryName, CategoryItem[]> = useMemo(() => {
//     const respectScore = resultData?.CategoryScores[0]?.Percentage ?? 90;
//     const diversityScore = resultData?.CategoryScores[1]?.Percentage ?? 70;

//     const getStatus = (score: number): string => {
//       if (score >= 80) return 'Good';
//       if (score >= 60) return 'Average';
//       return 'Below Average';
//     };

//     return {
//       Respect: [
//         {
//           question: 'How inclusive are you in your daily interactions?',
//           score: Math.round(respectScore * 0.9),
//           status: getStatus(Math.round(respectScore * 0.9)),
//           color: getProgressColor(Math.round(respectScore * 0.9)),
//         },
//         {
//           question: 'Do you actively listen to different perspectives?',
//           score: Math.round(respectScore * 1.1),
//           status: getStatus(Math.round(respectScore * 1.1)),
//           color: getProgressColor(Math.round(respectScore * 1.1)),
//         },
//         {
//           question: 'Are all team members treated with equal respect?',
//           score: respectScore,
//           status: getStatus(respectScore),
//           color: getProgressColor(respectScore),
//         },
//       ],
//       Diversity: [
//         {
//           question: 'Does your team represent diverse backgrounds?',
//           score: Math.round(diversityScore * 0.8),
//           status: getStatus(Math.round(diversityScore * 0.8)),
//           color: getProgressColor(Math.round(diversityScore * 0.8)),
//         },
//         {
//           question: 'Are diverse perspectives valued in decision making?',
//           score: diversityScore,
//           status: getStatus(diversityScore),
//           color: getProgressColor(diversityScore),
//         },
//         {
//           question: 'Is there equal representation at all levels?',
//           score: Math.round(diversityScore * 0.9),
//           status: getStatus(Math.round(diversityScore * 0.9)),
//           color: getProgressColor(Math.round(diversityScore * 0.9)),
//         },
//       ],
//     };
//   }, [resultData]);

//   // Initialize radar chart
//   useLayoutEffect(() => {
//     if (!chartRef.current || !resultData) return; // Early return for chart initialization

//     const root = am5.Root.new(chartRef.current);
//     root.setThemes([am5themes_Animated.new(root)]);

//     const chart = root.container.children.push(
//       am5radar.RadarChart.new(root, {
//         startAngle: 0,
//         endAngle: 360,
//         innerRadius: am5.percent(20),
//       }),
//     );

//     const xAxis = chart.xAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         categoryField: 'category',
//         renderer: am5radar.AxisRendererCircular.new(root, {}),
//       }),
//     );

//     xAxis.get('renderer').labels.template.setAll({
//       fontSize: window.innerWidth < 768 ? 10 : 12,
//       fontWeight: '500',
//       fill: am5.color(0x374151),
//       textAlign: 'center',
//     });

//     const yAxis = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: am5radar.AxisRendererRadial.new(root, {}),
//         min: 0,
//         max: 100,
//       }),
//     );

//     yAxis.get('renderer').labels.template.setAll({
//       fontSize: window.innerWidth < 768 ? 8 : 10,
//       fill: am5.color(0x6b7280),
//     });

//     xAxis.data.setAll(resultsData);

//     const series = chart.series.push(
//       am5radar.RadarLineSeries.new(root, {
//         name: 'DEI Scores',
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: 'value',
//         categoryXField: 'category',
//         fill: am5.color(0x3b82f6),
//       }),
//     );

//     series.data.setAll(resultsData);

//     series.strokes.template.setAll({
//       strokeWidth: 3,
//       stroke: am5.color(0x3b82f6),
//     });

//     series.fills.template.setAll({
//       fill: am5.color(0x3b82f6),
//       fillOpacity: 0.1,
//     });

//     series.bullets.push(() =>
//       am5.Bullet.new(root, {
//         sprite: am5.Circle.new(root, {
//           radius: 6,
//           fill: am5.color(0x3b82f6),
//           stroke: am5.color(0xffffff),
//           strokeWidth: 2,
//         }),
//       }),
//     );

//     chart.appear(1000, 100);
//     series.appear(1000);

//     return () => {
//       root.dispose();
//     };
//   }, [resultsData, resultData]); // Added resultData to dependencies

//   // Early return for no data
//   if (!resultData) {
//     return <div className="text-center text-gray-600 mt-10">No result data available</div>;
//   }

//   const overallScore = resultData?.Percentage
//     ? Math.round(resultData.Percentage)
//     : Math.round(resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length);

//     const getAverageLabel = (percentage: number) => {
//       if (percentage >= 80) return 'Good';
//       if (percentage >= 60) return 'Average';

//       return 'Below Average';
//     };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center space-y-4">
//             <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//               <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//               Assessment Complete
//             </div>
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
//               Your D&I Assessment Results
//             </h1>
//             <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
//               Thank you for completing the DEI Self-Assessment. Here’s how your organization scored
//               across different dimensions.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-0 py-8 lg:px-0">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Chart and Overview */}
//           <div className="space-y-6">
//             {/* Overall Score Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//               <div className="space-y-4">
//                 <div>
//                   <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
//                     {overallScore}%
//                   </div>
//                   <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//                   <div className="text-sm text-gray-500">
//                     Based on {resultsData.length} assessment categories
//                   </div>
//                 </div>

//                 <div className="w-full bg-gray-200 rounded-full h-3">
//                   <div
//                     className={`h-3 rounded-full ${getProgressColor(
//                       overallScore,
//                     )} transition-all duration-1000 ease-out`}
//                     style={{ width: `${overallScore}%` }}
//                   />
//                 </div>
//               </div>

//             </div>

//             {/* Radar Chart */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//                 D&I Assessment Radar
//               </h3>
//               <div ref={chartRef} className="w-full h-64 md:h-80 lg:h-96" />
//             </div>
//           </div>

//           {/* Right Column - Detailed Results */}
//           <div className="space-y-6">
//             {/* Category Selection */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Details</h3>

//               {/* Category Tabs */}
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {(Object.keys(categoryDetails) as CategoryName[]).map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                       selectedCategory === category
//                         ? 'bg-blue-500 text-white shadow-md'
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>

//               {/* Category Score Cards */}
//               {/* <div className="space-y-4">
//                 {(categoryDetails[selectedCategory] || []).map(
//                   (item: CategoryItem, index: number) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4">

//                       <p className="text-sm text-gray-700 mb-3">{item.question}</p>
//                       <div className="w-full bg-gray-200 h-2 rounded mb-2">
//                         <div
//                           className={`h-2 rounded transition-all duration-500 ${getProgressColor(
//                             item.score,
//                           )}`}
//                           style={{ width: `${item.score}%` }}
//                         />
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
//                           {item.score}%
//                         </span>
//                         <span className="text-sm text-gray-500">{item.status}</span>
//                       </div>
//                     </div>
//                   ),
//                 )}
//               </div> */}
//               {/* Category Scores (Dynamic CategoryName + Percentage only) */}
//               <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-5">
//                 {resultData?.CategoryScores?.map((item: any, index: number) => (
//                   <div
//                     key={index}
//                     className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
//                   >
//                     {/* Category Name */}
//                     <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                       {item.CategoryName.replace(/-/g, ' ')}
//                     </span>

//                     {/* Progress Bar */}
//                     <div className="w-full mb-1">
//                       <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                         <div
//                           className={`h-3 ${getProgressColor(item.Percentage)} transition-all duration-500`}
//                           style={{ width: `${item.Percentage}%` }}
//                         />
//                       </div>
//                     </div>

//                     {/* Percentage on left, Average on right */}
//                     <div className="flex justify-between items-center mt-2">
//                       <span className={`text-base font-bold ${getScoreColor(item.Percentage)}`}>
//                         {Math.round(item.Percentage)}%
//                       </span>
//                       <span className="text-base text-gray-500">
//                         {getAverageLabel(item.Percentage)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recommended Course */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Learning</h3>

//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex flex-col sm:flex-row items-start gap-4">
//                   <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                     <Image
//                       src="/results/recommendedBg.png"
//                       alt="Recommended Course"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 space-y-2">
//                     <h4 className="font-semibold text-gray-800">Building Inclusive Leadership</h4>
//                     <p className="text-sm text-gray-600">
//                       Learn practical strategies to create more inclusive environments and improve
//                       your organization’s D&I outcomes.
//                     </p>
//                     <div className="flex items-center space-x-4 text-xs text-gray-500">
//                       <span>⏱️ 2 hours</span>
//                       <span>📚 4 modules</span>
//                       <span>🎯 Beginner friendly</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-blue-200">
//                   <Link
//                     href="/inclusion/outcome"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
//                   >
//                     Start Learning Path
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// radar

// 'use client';

// import { RootState } from '@/redux/store';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Chart,
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
//   ChartConfiguration,
//   ChartItem,
// } from 'chart.js';

// Chart.register(
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// export default function ResultPage() {
//   const resultData = useSelector((state: RootState) => state.global.resultData);
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstanceRef = useRef<Chart | null>(null);

//   const [selectedCategory, setSelectedCategory] = useState<'Respect' | 'Diversity'>('Respect');

//   const getScoreColor = (score: number): string => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-blue-600';
//     if (score >= 40) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   const getProgressColor = (score: number): string => {
//     if (score >= 80) return 'bg-green-500';
//     if (score >= 60) return 'bg-blue-500';
//     if (score >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   const resultsData = useMemo(() => {
//     const categoryNames = [
//       'Respect',
//       'Diversity',
//       'Equality',
//       'Accessibility',
//       'Transparency',
//       'Participation',
//       'Collaboration',
//       'Development',
//       'Fairness',
//       'Safety',
//     ];

//     return categoryNames.map((category, index) => ({
//       category,
//       value:
//         resultData?.CategoryScores?.[index]?.Percentage ??
//         [90, 70, 65, 60, 55, 75, 85, 40, 68, 80][index],
//     }));
//   }, [resultData]);

//   // 🔹 Chart.js Radar Chart initialization
//   useEffect(() => {
//     if (!chartRef.current || resultsData.length === 0) return;

//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;

//     // Destroy previous instance
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     const data = {
//       labels: resultsData.map((item) => item.category),
//       datasets: [
//         {
//           label: 'DEI Category Scores (%)',
//           data: resultsData.map((item) => item.value),
//           fill: true,
//           backgroundColor: 'rgba(59, 130, 246, 0.2)',
//           borderColor: 'rgb(59, 130, 246)',
//           pointBackgroundColor: 'rgb(59, 130, 246)',
//           pointBorderColor: '#fff',
//           pointHoverBackgroundColor: '#fff',
//           pointHoverBorderColor: 'rgb(59, 130, 246)',
//           borderWidth: 3,
//         },
//       ],
//     };

//     const config: ChartConfiguration<'radar'> = {
//       type: 'radar',
//       data,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         animation: {
//           duration: 1500,
//           easing: 'easeInOutQuart',
//         },
//         scales: {
//           r: {
//             min: 0,
//             max: 100,
//             ticks: {
//               stepSize: 20,
//               color: '#6b7280',
//               backdropColor: 'transparent',
//             },
//             grid: { color: '#e5e7eb' },
//             angleLines: { color: '#d1d5db' },
//             pointLabels: {
//               font: { size: 12, family: 'Inter, sans-serif',  },
//               color: '#374151',
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             display: true,
//             labels: {
//               color: '#374151',
//               font: { size: 13, family: 'Inter, sans-serif' },
//             },
//           },
//           tooltip: {
//             enabled: true,
//             backgroundColor: '#1f2937',
//             titleColor: '#fff',
//             bodyColor: '#fff',
//             callbacks: {
//               label: (context) => `${context.label}: ${context.raw}%`,
//             },
//           },
//         },
//       },
//     };

//     // ✅ Safe Chart.js instantiation with type inference
//     chartInstanceRef.current = new Chart(ctx as ChartItem, config);

//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//         chartInstanceRef.current = null;
//       }
//     };
//   }, [resultsData]);

//   const overallScore = resultData?.Percentage
//     ? Math.round(resultData.Percentage)
//     : Math.round(resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length);

//   const getAverageLabel = (percentage: number) => {
//     if (percentage >= 80) return 'Good';
//     if (percentage >= 60) return 'Average';
//     return 'Below Average';
//   };

//   if (!resultData) {
//     return <div className="text-center text-gray-600 mt-10">No result data available</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center space-y-4">
//           <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             Assessment Complete
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Your D&I Assessment Results</h1>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Here’s how your organization scored across different DEI dimensions.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Overall Score Card */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//             <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}%</div>
//             <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//             <div className="text-sm text-gray-500 mb-4">
//               Based on {resultsData.length} assessment categories
//             </div>
//             <div className="w-full bg-gray-200 h-3 rounded-full">
//               <div
//                 className={`h-3 rounded-full ${getProgressColor(overallScore)} transition-all`}
//                 style={{ width: `${overallScore}%` }}
//               />
//             </div>
//           </div>

//           {/* Chart.js Radar Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//               D&I Assessment Radar
//             </h3>
//             <div className="relative w-full h-80">
//               <canvas ref={chartRef}></canvas>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Category Scores */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
//             <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-5">
//               {resultData?.CategoryScores?.map((item: any, index: number) => (
//                 <div
//                   key={index}
//                   className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
//                 >
//                   <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                     {item.CategoryName.replace(/-/g, ' ')}
//                   </span>
//                   <div className="w-full mb-1">
//                     <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                       <div
//                         className={`h-2 ${getProgressColor(item.Percentage)} transition-all duration-500`}
//                         style={{ width: `${item.Percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className={`text-base font-bold ${getScoreColor(item.Percentage)}`}>
//                       {Math.round(item.Percentage)}%
//                     </span>
//                     <span className="text-base text-gray-500">
//                       {getAverageLabel(item.Percentage)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recommended Course */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Learning</h3>
//             <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
//               <div className="flex flex-col sm:flex-row items-start gap-4">
//                 <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                   <Image src="/results/recommendedBg.png" alt="Recommended Course" fill className="object-cover" />
//                 </div>
//                 <div className="flex-1 space-y-2">
//                   <h4 className="font-semibold text-gray-800">Building Inclusive Leadership</h4>
//                   <p className="text-sm text-gray-600">
//                     Learn strategies to create inclusive environments and improve your organization’s DEI outcomes.
//                   </p>
//                   <div className="flex items-center space-x-4 text-xs text-gray-500">
//                     <span>⏱️ 2 hours</span>
//                     <span>📚 4 modules</span>
//                     <span>🎯 Beginner friendly</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t border-blue-200">
//                 <Link
//                   href="/inclusion/outcome"
//                   className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
//                 >
//                   Start Learning Path
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//  correct code
// 'use client';

// import { RootState } from '@/redux/store';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Chart,
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
//   ChartConfiguration,
//   ChartItem,
// } from 'chart.js';

// Chart.register(
//   RadarController,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// );

// export default function ResultPage() {
//   const resultData = useSelector((state: RootState) => state.global.resultData);
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstanceRef = useRef<Chart | null>(null);

//   const [selectedCategory, setSelectedCategory] = useState<'Respect' | 'Diversity'>('Respect');

//   const getScoreColor = (score: number): string => {
//     if (score >= 80) return 'text-green-600';
//     if (score >= 60) return 'text-blue-600';
//     if (score >= 40) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   const getProgressColor = (score: number): string => {
//     if (score >= 80) return 'bg-green-500';
//     if (score >= 60) return 'bg-blue-500';
//     if (score >= 40) return 'bg-orange-500';
//     return 'bg-red-500';
//   };

//   const resultsData = useMemo(() => {
//     if (!resultData?.CategoryScores) return [];

//     return resultData.CategoryScores.map((item: any) => ({
//       category: item.CategoryName.replace(/-/g, ' '), // clean name
//       value: Math.round(item.Percentage), // actual percentage
//     }));
//   }, [resultData]);

//   // 🔹 Chart.js Radar Chart initialization
//   // 🔹 Chart.js Radar Chart initialization
// useEffect(() => {
//   if (!chartRef.current || resultsData.length === 0) return;

//   const ctx = chartRef.current.getContext('2d');
//   if (!ctx) return;

//   if (chartInstanceRef.current) {
//     chartInstanceRef.current.destroy();
//   }

//   const data = {
//     labels: resultsData.map((item) => item.category),
//     datasets: [
//       {
//         label: 'DEI Category Scores (%)',
//         data: resultsData.map((item) => item.value),
//         fill: true,
//         backgroundColor: 'rgba(59,130,246,0.25)',
//         borderColor: 'rgba(59,130,246,1)',
//         pointBackgroundColor: 'rgba(59,130,246,1)',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: 'rgba(59,130,246,1)',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const config: ChartConfiguration<'radar'> = {
//     type: 'radar',
//     data,
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       animation: { duration: 1200, easing: 'easeInOutQuart' },
//       plugins: {
//         legend: { display: false },
//         tooltip: {
//           enabled: true,
//           backgroundColor: '#1f2937',
//           titleColor: '#fff',
//           bodyColor: '#fff',
//           callbacks: {
//             label: (context) => `${context.label}: ${context.raw}%`,
//           },
//         },
//       },
//       scales: {
//         r: {
//           min: 0,
//           max: 100,
//           ticks: {
//             stepSize: 20,
//             color: '#9ca3af',
//             font: { size: 10, family: 'Inter, sans-serif' },
//             padding:1,

//           },
//           grid: { circular: false, color: '#e5e7eb' },
//           angleLines: { color: '#e5e7eb' },
//           pointLabels: {
//             color: '#6b7280',
//             font: { size: 10, family: 'Inter, sans-serif',weight:600 },
//             callback: function (label: string) {
//               const maxChars = 19; // max characters per line
//               if (label.length > maxChars) {
//                 const words = label.split(' ');
//                 let lines: string[] = [];
//                 let currentLine = '';
//                 words.forEach((word) => {
//                   if ((currentLine + ' ' + word).trim().length > maxChars) {
//                     lines.push(currentLine);
//                     currentLine = word;
//                   } else {
//                     currentLine = (currentLine + ' ' + word).trim();
//                   }
//                 });
//                 lines.push(currentLine);
//                 return lines;
//               } else {
//                 return label;
//               }
//             },
//           },
//         },
//       },

//       elements: {
//         line: { borderWidth: 2 },
//         point: { radius: 6, hoverRadius: 6 }, // smaller points
//       },
//     },
//   };

//   chartInstanceRef.current = new Chart(ctx as ChartItem, config);

//   return () => {
//     chartInstanceRef.current?.destroy();
//   };
// }, [resultsData]);

//   const overallScore = resultData?.Percentage
//     ? Math.round(resultData.Percentage)
//     : Math.round(resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length);

//   const getAverageLabel = (percentage: number) => {
//     if (percentage >= 80) return 'Good';
//     if (percentage >= 60) return 'Average';
//     return 'Below Average';
//   };

//   if (!resultData) {
//     return <div className="text-center text-gray-600 mt-10">No result data available</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center space-y-4">
//           <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             Assessment Complete
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Your D&I Assessment Results</h1>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Here’s how your organization scored across different DEI dimensions.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Overall Score Card */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
//             <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}%</div>
//             <div className="text-lg font-semibold text-gray-800">Overall Score</div>
//             <div className="text-sm text-gray-500 mb-4">
//               Based on {resultsData.length} assessment categories
//             </div>
//             <div className="w-full bg-gray-200 h-3 rounded-full">
//               <div
//                 className={`h-3 rounded-full ${getProgressColor(overallScore)} transition-all`}
//                 style={{ width: `${overallScore}%` }}
//               />
//             </div>
//           </div>

//           {/* Chart.js Radar Chart */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//               D&I Assessment Radar
//             </h3>
//             <div className="w-full aspect-square max-w-full">
//               <canvas ref={chartRef} className="w-full h-full" />
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Category Scores */}
//           {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
//             <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-5">
//               {resultData?.CategoryScores?.map((item: any, index: number) => (
//                 <div
//                   key={index}
//                   className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
//                 >
//                   <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                     {item.CategoryName.replace(/-/g, ' ')}
//                   </span>
//                   <div className="w-full mb-1">
//                     <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                       <div
//                         className={`h-2 ${getProgressColor(item.Percentage)} transition-all duration-500`}
//                         style={{ width: `${item.Percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className={`text-base font-bold ${getScoreColor(item.Percentage)}`}>
//                       {Math.round(item.Percentage)}%
//                     </span>
//                     <span className="text-base text-gray-500">
//                       {getAverageLabel(item.Percentage)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div> */}

//           {/* Category Scores scroll bar witout colour */}
//           {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
//             <div className="max-h-[750px] overflow-y-auto grid sm:grid-cols-1 md:grid-cols-1 gap-5">
//               {resultData?.CategoryScores?.map((item: any, index: number) => (
//                 <div
//                   key={index}
//                   className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
//                 >
//                   <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                     {item.CategoryName.replace(/-/g, ' ')}
//                   </span>
//                   <div className="w-full mb-1">
//                     <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                       <div
//                         className={`h-2 ${getProgressColor(item.Percentage)} transition-all duration-500`}
//                         style={{ width: `${item.Percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className={`text-base font-bold ${getScoreColor(item.Percentage)}`}>
//                       {Math.round(item.Percentage)}%
//                     </span>
//                     <span className="text-base text-gray-500">
//                       {getAverageLabel(item.Percentage)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div> */}

//           {/* Category Scores  scroll correct code*/}
//           <div className="category-scores-box bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
//             <div className="category-scores-content lg:h-[750px] overflow-y-auto grid sm:grid-cols-1 md:grid-cols-1 gap-5">
//               {resultData?.CategoryScores?.map((item: any, index: number) => (
//                 <div
//                   key={index}
//                   className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
//                 >
//                   <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
//                     {item.CategoryName.replace(/-/g, ' ')}
//                   </span>
//                   <div className="w-full mb-1">
//                     <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//                       <div
//                         className={`h-2 ${getProgressColor(item.Percentage)} transition-all duration-500`}
//                         style={{ width: `${item.Percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className={`text-base font-bold ${getScoreColor(item.Percentage)}`}>
//                       {Math.round(item.Percentage)}%
//                     </span>
//                     <span className="text-base text-gray-500">
//                       {getAverageLabel(item.Percentage)}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recommended Course */}
//           {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Learning</h3>
//             <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
//               <div className="flex flex-col sm:flex-row items-start gap-4">
//                 <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                   <Image
//                     src="/results/recommendedBg.png"
//                     alt="Recommended Course"
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="flex-1 space-y-2">
//                   <h4 className="font-semibold text-gray-800">Building Inclusive Leadership</h4>
//                   <p className="text-sm text-gray-600">
//                     Learn strategies to create inclusive environments and improve your
//                     organization’s DEI outcomes.
//                   </p>
//                   <div className="flex items-center space-x-4 text-xs text-gray-500">
//                     <span>⏱️ 2 hours</span>
//                     <span>📚 4 modules</span>
//                     <span>🎯 Beginner friendly</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t border-blue-200">
//                 <Link
//                   href="/inclusion/outcome"
//                   className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
//                 >
//                   Start Learning Path
//                 </Link>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import { RootState } from '@/redux/store';

import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartConfiguration,
  ChartItem,
} from 'chart.js';
Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

import { ResultData, CategoryScore } from '@/redux/slices/global/globalSlice';

export default function ResultPage() {
  // const resultData = useSelector((state: RootState) => state.global.resultData);
  const resultData = useSelector(
    (state: RootState) => state.global.resultData,
  ) as ResultData | null;

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };
  const getProgressColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  const resultsData = useMemo(() => {
    if (!resultData?.CategoryScores) return [];
    return resultData.CategoryScores.map((item: CategoryScore) => ({
      category: item.CategoryName.replace(/-/g, ' '), // clean name
      value: Math.round(item.Percentage), // actual percentage
    }));
  }, [resultData]);
  useEffect(() => {
    if (!chartRef.current || resultsData.length === 0) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const data = {
      labels: resultsData.map((item) => item.category),
      datasets: [
        {
          label: 'DEI Category Scores (%)',
          data: resultsData.map((item) => item.value),
          fill: true,
          backgroundColor: 'rgba(59,130,246,0.25)',
          borderColor: 'rgba(59,130,246,1)',
          pointBackgroundColor: 'rgba(59,130,246,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(59,130,246,1)',
          borderWidth: 2,
        },
      ],
    };
    const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1200, easing: 'easeInOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
            },
          },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20, // tick sequence 10,20,30,... visually spaced
              color: '#9CA3AF',
              font: { size: 10, family: 'Inter, sans-serif' },
              padding: 1,
            },
            grid: { circular: false, color: '#E5E7EB' },
            angleLines: { color: '#E5E7EB' },
            pointLabels: {
              color: '#6B7280',
              font: { size: 10, family: 'Inter, sans-serif', weight: 600 },
              callback: function (label: string) {
                const maxChars = 19;
                if (label.length > maxChars) {
                  const words = label.split(' ');
                  const lines: string[] = [];
                  let currentLine = '';
                  words.forEach((word) => {
                    if ((currentLine + ' ' + word).trim().length > maxChars) {
                      lines.push(currentLine);
                      currentLine = word;
                    } else {
                      currentLine = (currentLine + ' ' + word).trim();
                    }
                  });
                  lines.push(currentLine);
                  return lines;
                } else {
                  return label;
                }
              },
            },
          },
        },
        elements: {
          line: { borderWidth: 2 },
          point: { radius: 6, hoverRadius: 6 },
        },
      },
    };
    chartInstanceRef.current = new Chart(ctx as ChartItem, config);
    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [resultsData]);
  const overallScore = resultData?.Percentage
    ? Math.round(resultData.Percentage)
    : Math.round(resultsData.reduce((sum, item) => sum + item.value, 0) / resultsData.length);
  const getAverageLabel = (percentage: number) => {
    if (percentage >= 80) return 'Good';
    if (percentage >= 60) return 'Average';
    return 'Below Average';
  };
  if (!resultData) {
    return <div className="text-center text-gray-600 mt-10">No result data available</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Assessment Complete
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your D&I Assessment Results</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Here’s how your organization scored across different DEI dimensions.
          </p>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
        {/* Left Column */}
        <div className="space-y-6 flex flex-col">
          {/* Overall Score Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}%</div>
            <div className="text-lg font-semibold text-gray-800">Overall Score</div>
            <div className="text-sm text-gray-500 mb-4">
              Based on {resultsData.length} assessment categories
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className={`h-3 rounded-full ${getProgressColor(overallScore)} transition-all`}
                style={{ width: `${overallScore}%` }}
              />
            </div>
            <button className="bg-red-950 text-white py-2 mt-4 px-3 rounded-xl text-lg cursor-pointer">
              view advice as per your score
            </button>
          </div>
          {/* Chart.js Radar Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              D&I Assessment Radar
            </h3>
            <div className="w-full aspect-square max-w-full flex-1">
              <canvas ref={chartRef} className="w-full h-full" />
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="space-y-6 flex flex-col">
          {/* Category Scores */}
          <div className="category-scores-box bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Scores</h3>
            <div
              className="category-scores-content overflow-y-auto grid sm:grid-cols-1 md:grid-cols-1 gap-5"
              style={{ maxHeight: '100vh' }}
            >
              {resultData?.CategoryScores?.map((item: CategoryScore, index: number) => (
                <div
                  key={index}
                  className="flex flex-col justify-between border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <span className="text-[16px] font-medium text-gray-500 capitalize mb-4 text-center">
                    {item.CategoryName.replace(/-/g, ' ')}
                  </span>
                  <div className="w-full mb-1">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 ${getProgressColor(item.Percentage)} transition-all duration-500`}
                        style={{ width: `${item.Percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-base font-bold ${getScoreColor(item.Percentage)}`}>
                      {Math.round(item.Percentage)}%
                    </span>
                    <span className="text-base text-gray-500">
                      {getAverageLabel(item.Percentage)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
