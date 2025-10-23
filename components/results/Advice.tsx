'use client';
import React, { useState } from 'react';

interface AdviceItem {
  category: string;
  score: 'low' | 'average' | 'good';
  advice: string;
  percentage: string;
}

const Advice = () => {
  const [data, setData] = useState<AdviceItem[]>([
    {
      category: 'Recognition and appreciation',
      score: 'low',
      advice:
        'Share best practices across teams, embed recognition into performance reviews and onboarding, and track appreciation through pulse surveys.',
      percentage: '25%',
    },
    {
      category: 'Equal',
      score: 'good',
      advice:
        'Use equality practices in employer branding, conduct regular paygap analyses, and benchmark against sector standards.',
      percentage: '75%',
    },
    {
      category: 'Respect for diversity',
      score: 'average',
      advice:
        'Leverage diversity for innovation, integrate diversity goals into strategy, and position the organization as a leader in D&I.',
      percentage: '50%',
    },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortOrder, setSortOrder] = useState('none');

  const handleSort = (order: 'asc' | 'desc') => {
    const newData = [...data];
    if (order === 'asc') {
      newData.sort((a, b) => parseInt(a.percentage) - parseInt(b.percentage));
    } else if (order === 'desc') {
      newData.sort((a, b) => parseInt(b.percentage) - parseInt(a.percentage));
    }
    setData(newData);
    setSortOrder(order);
  };

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Performance Review Dashboard
      </h1>

      <div className="bg-white  shadow-lg ">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center bg-[#490000] text-white p-4 rounded-t-lg">
            <div className="md:text-lg  flex-1 text-xs font-bold uppercase tracking-wider">
              Category
            </div>
            <div className="md:text-lg  flex-1 text-xs font-bold uppercase tracking-wider">
              Score
            </div>
            <div className="md:text-lg  flex-1 text-xs font-bold uppercase tracking-wider">
              Advice for You
            </div>
            <div className="md:text-lg flex-1 text-xs font-bold uppercase tracking-wider flex items-center justify-center">
              Percentage
              <button
                onClick={() => handleSort('asc')}
                className="ml-4 text-xl font-bold cursor-pointer text-white hover:text-gray-200"
              >
                ↑
              </button>
              <button
                onClick={() => handleSort('desc')}
                className="ml-2 text-xl font-bold cursor-pointer text-white hover:text-gray-200"
              >
                ↓
              </button>
            </div>
          </div>

          {/* Table Rows */}
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0"
            >
              <div className="flex-1  md:text-lg  text-sm font-medium text-gray-900  ">
                {item.category}
              </div>
              <div className="flex-1 px-6 text-sm  ">
                <span
                  className={`md:text-[15px] capitalize inline-flex px-5 py-1 rounded-full text-xs font-semibold ${
                    item.score === 'low'
                      ? 'bg-red-100 text-red-800'
                      : item.score === 'good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {item.score}
                </span>
              </div>
              <div className="flex-1 text-md text-gray-500">{item.advice}</div>
              <div
                className={`font-bold md:text-lg flex-1  text-sm ${
                  item.score === 'low'
                    ? 'text-red-800'
                    : item.score === 'good'
                      ? ' text-green-800'
                      : ' text-yellow-800'
                }`}
              >
                {item.percentage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advice;
