import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TimeRange {
  today: 'today';
  week: 'week';
  month: 'month';
  custom: 'custom';
}

type TimeRangeType = keyof TimeRange;

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRangeType>('today');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Line chart data for visitor statistics
  const visitorStatisticsData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'],
    datasets: [
      {
        label: 'Visitors',
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1243, 1100],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // const visitorStatisticsOptions: ChartOptions<'line'> = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       mode: 'index',
  //       intersect: false,
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       grid: {
  //         drawBorder: false,
  //       },
  //       ticks: {
  //         callback: function (value) {
  //           if (typeof value === 'number') {
  //             return value.toLocaleString();
  //           }
  //           return value;
  //         }
  //       }
  //     },
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  //   interaction: {
  //     intersect: false,
  //     mode: 'nearest',
  //   },
  // };
  const visitorStatisticsOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          callback: function (value) {
            if (typeof value === 'number') {
              return value.toLocaleString();
            }
            return value;
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
  };

  // Pie chart data for visitor department
  const visitorDepartmentData = {
    labels: ['Sales', 'Marketing', 'Others'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const visitorDepartmentOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
  };

  // Bar chart data for visitor demography
  const visitorDemographyData = {
    labels: ['Contractor', 'Interviewee', 'Client', 'Vendor', 'Guest'],
    datasets: [
      {
        label: 'Number of Visits',
        data: [450, 320, 280, 150, 43],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  // const visitorDemographyOptions: ChartOptions<'bar'> = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       grid: {
  //         drawBorder: false,
  //       },
  //     },
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  // };

  const visitorDemographyOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          stepSize: 100,
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
     {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Report</h1>

        <div className="flex items-center gap-4">
          <button
            // onClick={() => setIsNewMessageModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Generate Report
          </button>
          
          {/* Three dots menu for navigation sidebar */}
          <div className="relative" 
          // ref={dropdownRef}
          >
            <button
              // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg xl:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {/* {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-6">Navigation</h3>
                  <nav className="space-y-4">
                    {['Hosts', 'Schedule', 'Messages', 'Reports', 'Resource Hub', 'Settings', 'Remote Status'].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className={`block py-2 text-sm font-medium transition-colors ${
                          item === 'Messages'
                            ? 'text-blue-600'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {(['Today', 'This Week', 'This Month', 'Custom'] as const).map((filter) => {
                  const filterValue = filter.toLowerCase().replace(' ', '') as TimeRangeType;
                  return (
                    <button
                      key={filter}
                      onClick={() => setTimeRange(filterValue)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === filterValue
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-2">Status</label> */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-2">Type</label> */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="interview">Interview</option>
                  <option value="meeting">Meeting</option>
                  <option value="delivery">Delivery</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            </div>
          </div>

          {/* Visitor Statistics Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Visitor Statistic</h2>
              <div className="text-sm text-gray-500">Last 30 Days ↑ 12%</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">

              {/* Total Visitors Card */}
<div 
  className="rounded-xl shadow p-6 col-span-2 relative overflow-hidden"
  style={{
    background: 'linear-gradient(135deg, #AD06BF80, #B800B880, #3F00CC80, #35234D80)'
  }}
>
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-white">Total Visitors</h3>
    <span className="text-sm text-white/80">This month</span>
  </div>
  <div className="text-4xl font-bold text-white mb-2">1,243</div>
  <div className="flex items-center text-white text-sm mb-8">
    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
    ↑ 12% from last month
  </div>

  {/* SVG at the bottom */}
  <div className="absolute bottom-0 left-0 right-0 h-24">
    <svg width="100%" height="100%" viewBox="0 0 493 308" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 307.131C0 307.131 28.7293 183.536 85.684 223.086C142.639 262.636 115.925 72.7944 197.073 128.165C278.221 183.536 272.173 184.524 316.527 128.165C360.881 71.8056 364.913 -5.44416 420.86 44.1203C452.727 72.3524 475.911 46.6375 486.331 24.2972V4.16533C494.791 -7.53692 494.205 7.41675 486.331 24.2972V307.131H0Z" fill="url(#paint0_linear_703_8759)" fillOpacity="0.57" />
      <defs>
        <linearGradient id="paint0_linear_703_8759" x1="490.545" y1="36.6259" x2="-54.2016" y2="343.144" gradientUnits="userSpaceOnUse">
          <stop offset="0.0950909" stopColor="#C495FB" stopOpacity="0.5" />
          <stop offset="0.508939" stopColor="#8D48DC" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</div>

              <div className="h-60 col-span-5">
                <Line data={visitorStatisticsData} options={visitorStatisticsOptions} />
              </div>
            </div>


          </div>

          {/* Bottom Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visitor Demography Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Visitor Demography</h2>
              <div className="h-64">
                <Bar data={visitorDemographyData} options={visitorDemographyOptions} />
              </div>
            </div>

            {/* Visitor Department Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Visitor Department</h2>
              <div className="h-64 w-max mx-auto">
                <Pie data={visitorDepartmentData} options={visitorDepartmentOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats Cards */}
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-4 gap-3">

          {/* Top Stats Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Approved Visits</span>
                  <span className="text-2xl font-bold text-gray-900">230</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Rejected Visits</span>
                  <span className="text-2xl font-bold text-gray-900">15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Avg. Checked-In Time</span>
                  <span className="text-2xl font-bold text-gray-900">3:20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Visits Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Visits</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">1,243</div>
            <div className="text-sm text-gray-500 mb-4">Last 30 Days ↑ 12%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="space-y-6">
            {/* Average Visit Duration */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Average Visit Duration</h3>
                <span className="text-red-600 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ↓ 5%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">35 mins</div>
              <div className="mt-4 text-sm text-gray-500">Average time spent per visit</div>
            </div>

            {/* Peak Visit Time */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Peak Visit Time</h3>
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  ↑ 10%
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">10:00 AM</div>
              <div className="mt-4 text-sm text-gray-500">Most frequent check-in time</div>
            </div>
          </div>

          {/* Most Frequent Visitor */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Most Frequent Visitor</h3>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                ↑ 15%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">Sales Dept</div>
            <div className="text-sm text-gray-500 mb-4">↑ 15% of total visits</div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-4">
                SD
              </div>
              <div>
                <p className="font-medium text-gray-900">Highest number of visits</p>
                <p className="text-sm text-gray-500">Average 45 visits per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;