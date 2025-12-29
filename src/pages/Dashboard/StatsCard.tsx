// components/StatsCard.tsx
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-between bg-#E9ECF3 rounded-xl p-3 shadow-sm border border-gray-100" style={{ borderRadius: '12px' }}>
      <div className="flex justify-between items-center mb-1 gap-2">
        <img src={icon} alt="chart icon" className="w-[90px]" />
      </div>

      <div className="flex items-center justify-center mt-5">
        <div>
          <p className="text-lg font-bold text-gray-900 mb-2">{title}</p>
        </div>
      </div>
    </div>
  );
};




interface StatsCardPropsList {
  title: string;
  value?: string;
  change?: string;
  changePercentage?: string;
  icon?: string;
  trend?: 'up' | 'down';
}

export const StatsCardList: React.FC<StatsCardPropsList> = ({
  title,
  value,
  change,
  //   changePercentage,
  icon,
  trend
}) => {
  return (
    <div className="bg-white rounded-xl p-3 flex items-center justify-between gap-2 shadow-sm border border-gray-100" style={{ borderRadius: '12px' }}>
      <div className='flex items-center gap-2'>
        <img src={icon} alt="chart icon" className="w-14 text-gray-400" />
        <div className="flex flex-col justify-between items-start gap-2">
          <h3 className="text-xs font-medium text-gray-600">{title}</h3>
          <p className="text-sm font-bold text-gray-900">{value}</p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-end my-auto h-full">
        <div>
          <div className={`flex items-center justify- space-x-1 rounded-3xl p-0.5 text-xs font-medium ${trend === 'up' ? 'bg-[#EDF6FA]' : 'bg-[#FFC5C5]'}`}>
            <span className={`text-xs font-medium ${trend === 'up' ? 'text-[#C40404]' : 'text-[#3C4346]'}`}>
              {change}
            </span>
            <svg className={`w-4 h-4 ${trend === 'up' ? 'text-[#FD1212]' : 'text-[#3C4346]'}`} fill="currentColor" viewBox="0 0 20 20">
              {trend === 'up' ? (
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};