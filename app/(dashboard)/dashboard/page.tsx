// //path : app/(dashboard)/dashboard/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';

// import DepartmentBarChart from '@/components/dashboard/DepartmentBarChart';
// import MultiRadialChart from '@/components/dashboard/MultiRadialChart';

// export default function Dashboard() {
//   const [windowWidth, setWindowWidth] = useState(0);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setWindowWidth(window.innerWidth);
//       const resizeHandler = () => setWindowWidth(window.innerWidth);
//       window.addEventListener('resize', resizeHandler);
//       return () => window.removeEventListener('resize', resizeHandler);
//     }
//   }, []);
//   void windowWidth;
//   // const _isDesktop = windowWidth >= 768;

//   const cards = [
//     { title: 'Inclusion', score: '1/10', bgColor: 'bg-green-500' },
//     { title: 'Diversity', score: '3/10', bgColor: 'bg-orange-400' },
//     { title: 'SWOT Analysis', score: '5/10', bgColor: 'bg-cyan-500' },
//     { title: 'Equity App', score: '2/10', bgColor: 'bg-indigo-500' },
//     { title: 'Culture', score: '6/10', bgColor: 'bg-purple-500' },
//     { title: 'Leadership', score: '4/10', bgColor: 'bg-red-400' },
//     { title: 'Talent Development', score: '2/10', bgColor: 'bg-yellow-400' },
//     { title: 'Belongings', score: '8/10', bgColor: 'bg-blue-900' },

//   ];

//   return (
//     <div>
//       <h2 className="text-lg font-semibold text-gray-500">Welcome</h2>
//       <h1 className="text-3xl font-bold text-maroon-700 mb-6">Olivia Rhye</h1>

//       <section className="mb-6">
//         <h3 className="font-semibold text-md text-gray-700 mb-2">Quick Overview</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <MultiRadialChart />
//           <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
//             {cards.map((card, idx) => (
//               <div
//                 key={idx}
//                 className={`rounded-xl text-white p-4 flex flex-col justify-between ${card.bgColor}`}
//               >
//                 <h4 className="text-lg font-semibold">{card.title}</h4>
//                 <p className="text-2xl font-bold">{card.score}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="mb-6">
//         <h3 className="font-semibold text-md text-gray-700 mb-2">Departmental Results</h3>
//         <DepartmentBarChart />
//       </section>
//     </div>
//   );
// }

// 'use client';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// import DepartmentBarChart from '@/components/dashboard/DepartmentBarChart';
// import MultiRadialChart from '@/components/dashboard/MultiRadialChart';

// export default function Dashboard() {
//   const [windowWidth, setWindowWidth] = useState(0);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setWindowWidth(window.innerWidth);
//       const resizeHandler = () => setWindowWidth(window.innerWidth);
//       window.addEventListener('resize', resizeHandler);
//       return () => window.removeEventListener('resize', resizeHandler);
//     }
//   }, []);
//   void windowWidth;

//   const appIcons: Record<string, string> = {
//     leadership: '/sidebar/leadershipIcon.svg',
//     culture: '/sidebar/cultureIcon.svg',
//     diversity: '/sidebar/diversityIcon.svg',
//     equity: '/sidebar/equityIcon.svg',
//     inclusion: '/sidebar/inclusionIcon.svg',
//     organization: '/sidebar/organizationIcon.svg',
//     swot: '/sidebar/swotIcon.svg',
//     talentdevelopment: '/sidebar/talentIcon.svg',
//     belongings: '/sidebar/BelongingsIcon (1).svg',
//   };

//   const cards = [
//     { title: 'Inclusion', score: '1/10', bgColor: 'bg-green-500', icon: appIcons.inclusion },
//     { title: 'Diversity', score: '3/10', bgColor: 'bg-orange-400', icon: appIcons.diversity },
//     { title: 'SWOT Analysis', score: '5/10', bgColor: 'bg-cyan-500', icon: appIcons.swot },
//     { title: 'Equity App', score: '2/10', bgColor: 'bg-indigo-500', icon: appIcons.equity },
//     { title: 'Culture', score: '6/10', bgColor: 'bg-purple-500', icon: appIcons.culture },
//     { title: 'Leadership', score: '4/10', bgColor: 'bg-red-400', icon: appIcons.leadership },
//     {
//       title: 'Talent Development',
//       score: '2/10',
//       bgColor: 'bg-yellow-400',
//       icon: appIcons.talentdevelopment,
//     },
//     { title: 'Belongings', score: '8/10', bgColor: 'bg-blue-900', icon: appIcons.belongings },
//   ];

//   return (
//     <div>
//       <h2 className="text-lg font-semibold text-gray-500">Welcome</h2>
//       <h1 className="text-3xl font-bold text-maroon-700 mb-6">Olivia Rhye</h1>

//       {/* Quick Overview */}
//       <section className="mb-6">
//         <h3 className="font-semibold text-md text-gray-700 mb-2">Quick Overview</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <MultiRadialChart />
//           <div className="md:col-span-2 space-y-4">
//             {/* First row - 2 cards */}
//             <div className="grid grid-cols-2 gap-4">
//               {cards.slice(0, 2).map((card, idx) => (
//                 <div
//                   key={idx}
//                   className={`relative rounded-xl text-white p-4 flex flex-col justify-between ${card.bgColor}`}
//                 >
//                   <h4 className="text-lg font-semibold">{card.title}</h4>
//                   <p className="text-2xl font-bold">{card.score}</p>
//                   {card.icon && (
//                     <div className="absolute bottom-3 right-3 opacity-80">
//                       <Image
//                         src={card.icon}
//                         alt={`${card.title} icon`}
//                         width={32}
//                         height={32}
//                         className="object-contain"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Second row - next 3 cards */}
//             <div className="grid grid-cols-3 gap-4">
//               {cards.slice(2, 5).map((card, idx) => (
//                 <div
//                   key={idx}
//                   className={`relative rounded-xl text-white p-4 flex flex-col justify-between ${card.bgColor}`}
//                 >
//                   <h4 className="text-lg font-semibold">{card.title}</h4>
//                   <p className="text-2xl font-bold">{card.score}</p>
//                   {card.icon && (
//                     <div className="absolute bottom-3 right-3 opacity-80">
//                       <Image
//                         src={card.icon}
//                         alt={`${card.title} icon`}
//                         width={32}
//                         height={32}
//                         className="object-contain"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Third row - remaining 3 cards */}
//             <div className="grid grid-cols-3 gap-4">
//               {cards.slice(5).map((card, idx) => (
//                 <div
//                   key={idx}
//                   className={`relative rounded-xl text-white p-4 flex flex-col justify-between ${card.bgColor}`}
//                 >
//                   <h4 className="text-lg font-semibold">{card.title}</h4>
//                   <p className="text-2xl font-bold">{card.score}</p>
//                   {card.icon && (
//                     <div className="absolute bottom-3 right-3 opacity-80">
//                       <Image
//                         src={card.icon}
//                         alt={`${card.title} icon`}
//                         width={32}
//                         height={32}
//                         className="object-contain"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Departmental Results */}
//       <section className="mb-6">
//         <h3 className="font-semibold text-md text-gray-700 mb-2">Departmental Results</h3>
//         <DepartmentBarChart />
//       </section>
//     </div>
//   );
// }

// final only icon update
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import DepartmentBarChart from '@/components/dashboard/DepartmentBarChart';
import MultiRadialChart from '@/components/dashboard/MultiRadialChart';

export default function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const resizeHandler = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
    }
  }, []);
  void windowWidth;

  const appIcons: Record<string, string> = {
    leadership: '/dashboard/leadership (2).svg',
    culture: '/dashboard/culture.svg',
    diversity: '/dashboard/diversity.svg',
    equity: '/dashboard/equity.svg',
    inclusion: '/dashboard/inclusion.svg',
    organization: '/dashboard/diversity.svg',
    swot: '/dashboard/swot.svg',
    talentdevelopment: '/dashboard/teamdev.svg',
    belongings: '/dashboard/belonging.svg',
  };

  const cards = [
    { title: 'Diversity', score: '3/10', bgColor: 'bg-[#E68A5C]', icon: appIcons.diversity },
    { title: 'Inclusion', score: '1/10', bgColor: 'bg-[#6DC7A6]', icon: appIcons.inclusion },
    { title: 'SWOT Analysis', score: '5/10', bgColor: 'bg-[#4F8885]', icon: appIcons.swot },
    { title: 'Equity App', score: '2/10', bgColor: 'bg-[#9FAF75]', icon: appIcons.equity },
    { title: 'Culture', score: '6/10', bgColor: 'bg-[#6B7FB2]', icon: appIcons.culture },
    { title: 'Leadership', score: '4/10', bgColor: 'bg-[#8E4B3E]', icon: appIcons.leadership },
    {
      title: 'Talent Development',
      score: '2/10',
      bgColor: 'bg-[#56B8C9]',
      icon: appIcons.talentdevelopment,
    },
    { title: 'Belongings', score: '8/10', bgColor: 'bg-[#9B8FBF]', icon: appIcons.belongings },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-500">Welcome</h2>
      <h1 className="text-3xl font-bold text-maroon-700 mb-6">Olivia Rhye</h1>

      {/* Quick Overview */}
      <section className="mb-6">
        <h3 className="font-semibold text-md text-gray-700 mb-2">Quick Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 md:gap-3">
          <MultiRadialChart />
          <div className="md:col-span-2 space-y-4">
            {/* First row */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5 pb-[11px]">
              {cards.slice(0, 2).map((card, idx) => (
                <div
                  key={idx}
                  className={` h-[120px]  relative rounded-xl text-white p-4 flex flex-col justify-between ${card.bgColor}`}
                >
                  <h4 className="lg:text-[18px] md:text-[11px] font-semibold">{card.title}</h4>
                  <p className="lg:text-[20px] md:text-[13px] font-bold">{card.score}</p>

                  {card.icon && (
                    <div className="absolute bottom-3 right-3  w-10 h-10 lg:w-16 lg:h-16 md:w-10 md:h-10">
                      <Image
                        src={card.icon}
                        alt={`${card.title} icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Second row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
              {cards.slice(2).map((card, idx) => (
                <div
                  key={idx}
                  className={` h-[120px]  relative rounded-xl text-white p-4 flex flex-col justify-between ${card.bgColor}`}
                >
                  <h4 className="lg:text-[18px] md:text-[11px] font-semibold">{card.title}</h4>
                  <p className="lg:text-[20px] md:text-[13px] font-bold">{card.score}</p>

                  {card.icon && (
                    <div className="absolute bottom-3 right-3 w-10 h-10 lg:w-15 lg:h-15 md:w-10 md:h-10">
                      <Image
                        src={card.icon}
                        alt={`${card.title} icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departmental Results */}
      <section className="mb-6">
        <h3 className="font-semibold text-md text-gray-700 mb-2">Departmental Results</h3>
        <DepartmentBarChart />
      </section>
    </div>
  );
}
