// import React from 'react';
// import { useAuthStore } from '../../store/authStore';
// import { StatsCard, StatsCardList } from './StatsCard';
// // import Chart from 'react-apexcharts';

// export const Dashboard: React.FC = () => {
//   const { user, isAdmin } = useAuthStore();

//   const cardDataList = [
//     {
//       title: "Visitors Today",
//       value: "34",
//       change: "50%",
//       changePercentage: "50%",
//       icon: "/card1.svg",
//       trend: "up" as const
//     },
//     {
//       title: "Checked Out",
//       value: "25",
//       change: "40%",
//       changePercentage: "40%",
//       icon: "/card2.svg",
//       trend: "up" as const
//     },
//     {
//       title: "Pending Approvals",
//       value: "8",
//       change: "20%",
//       changePercentage: "20%",
//       icon: "/card3.svg",
//       trend: "down" as const
//     },
//     {
//       title: "Badge Print",
//       value: "2",
//       change: "10%",
//       changePercentage: "10%",
//       icon: "/card4.svg",
//       trend: "up" as const
//     }
//   ];

//   // Sample data for the four cards
  const cardData = [
    {
      title: "Visitors",
      value: "109,826",
      icon: "/admin-visitor.svg",
    },
    {
      title: "Add Hosts",
      value: "84,512",
      icon: "/admin-add-host.svg",
    },
    {
      title: "Invite Staff",
      value: "12,347",
      icon: "/admin-invite-staff.svg",
    },
    {
      title: "Pending Approval",
      value: "2.4h",
      icon: "/admin-pending-approval.svg",
    }
  ];

//   // ApexCharts configuration
//   const chartOptions: ApexCharts.ApexOptions = {
//     chart: {
//       height: 350,
//       type: 'line',
//       zoom: {
//         enabled: false
//       },
//       toolbar: {
//         show: true,
//         tools: {
//           download: true,
//           selection: false,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: false,
//           reset: false
//         }
//       },
//       fontFamily: 'Inter, sans-serif'
//     },
//     colors: ['#EF4444', '#22C55E', '#3B82F6'], // red, green, blue
//     series: [
//       {
//         name: 'Emergency',
//         data: [65, 78, 60, 71, 82, 65, 70, 75, 68, 72, 80, 85]
//       },
//       {
//         name: 'Normal',
//         data: [28, 35, 40, 45, 38, 42, 50, 48, 52, 55, 58, 60]
//       },
//       {
//         name: 'Standard',
//         data: [45, 52, 48, 55, 58, 52, 60, 65, 62, 68, 70, 75]
//       }
//     ],
//     stroke: {
//       curve: 'smooth', // This creates the curved lines
//       width: 3,
//       lineCap: 'round'
//     },
//     title: {
//       text: 'Change Request By Status',
//       align: 'left',
//       style: {
//         fontSize: '18px',
//         fontWeight: 'bold',
//         color: '#1f2937'
//       },
//       margin: 10,
//       offsetX: 0,
//       offsetY: 0
//     },
//     grid: {
//       borderColor: '#e5e7eb',
//       strokeDashArray: 4,
//       padding: {
//         top: 20,
//         right: 20,
//         bottom: 0,
//         left: 20
//       }
//     },
//     markers: {
//       size: 5,
//       strokeWidth: 0,
//       hover: {
//         size: 7
//       }
//     },
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       axisBorder: {
//         show: false
//       },
//       axisTicks: {
//         show: false
//       },
//       labels: {
//         style: {
//           colors: '#6b7280',
//           fontSize: '12px'
//         }
//       }
//     },
//     yaxis: {
//       min: 0,
//       labels: {
//         style: {
//           colors: '#6b7280',
//           fontSize: '12px'
//         }
//       }
//     },
//     legend: {
//       position: 'top',
//       horizontalAlign: 'right',
//       offsetY: -30,
//       markers: {
//         size: 12,
//         strokeWidth: 0,
//         shape: 'square'
//       },
//       itemMargin: {
//         horizontal: 16,
//         vertical: 8
//       },
//       fontSize: '14px',
//       fontFamily: 'Inter, sans-serif'
//     },
//     tooltip: {
//       theme: 'light',
//       x: {
//         show: true
//       },
//       y: {
//         formatter: function (value: number) {
//           return value.toString();
//         }
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <div>
//         <h2 className='text-2xl'>Good Morning, <span className='font-bold text-3xl'>{user?.name}</span>!</h2>
//         <p style={{
//           background: 'linear-gradient(90deg, #779BF9, #015D46, #0840D3)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//           backgroundClip: 'text'
//         }}>Welcome to your visitor dashboard hub</p>

//       </div>
//       <main className="max-w-[1440px mx-auto py-6 sm:px lg:px-">
//         {/* Cards Grid */}
//         <div className="px-4 my-6 bg-[#F9F9FB] rounded-lg p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-[49px]">
//             {isAdmin() ? (
//               cardData.map((card, index) => (
//                 <StatsCard
//                   key={index}
//                   title={card.title}
//                   value={card.value}
//                   icon={card.icon}
//                 />
//               ))
//             ) : (
//               cardData.map((card, index) => (
//                 <StatsCardList
//                   key={index}
//                   title={card.title}
//                   value={card.value}
//                   icon={card.icon}
//                 />
//               ))
//             )}
//           </div>
//         </div>

//         <div className="my-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-2 ">
//             {cardDataList.map((card, index) => (
//               <StatsCardList
//                 key={index}
//                 title={card.title}
//                 value={card.value}
//                 change={card.change}
//                 changePercentage={card.changePercentage}
//                 icon={card.icon}
//                 trend={card.trend}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Chart Section */}
//         {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
//           <div className="h-96">
//             <Chart
//               options={chartOptions}
//               series={chartOptions.series}
//               type="line"
//               height="100%"
//             />
//           </div>
//         </div> */}

//         {/* Additional dashboard content */}
//         <div className="grid grid-cols-9 gap-8">

//         <div className="bg-white rounded-lg h-96 p-8 col-span-4">
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold text-gray-600 mb-1">
//               Analytics Dashboard Content
//             </h2>
//             <p className="text-gray-500">
//               This is where your additional analytics cards and charts will be displayed.
//             </p>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg h-96 p-8 col-span-5">
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold text-gray-600 mb-4">
//               Analytics Dashboard Content
//             </h2>
//             <p className="text-gray-500">
//               This is where your additional analytics cards and charts will be displayed.
//             </p>
//           </div>
//         </div>
//         </div>
//         {/* </div> */}

//       </main>
//     </div>
//   );
// };


import React from 'react';
import { TrendingUp, ArrowRight, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { StatsCardList } from './StatsCard';


const QuickLinkCard = ({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void }) => (
  <div 
    className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
    onClick={onClick}
  >
    <div className="mb-4">{icon}</div>
    <p className="text-gray-800 font-medium text-center">{title}</p>
  </div>
);

const StatCard = ({ title, value, percentage, trend, color }: { title: string; value: string; percentage: string; trend: string; color: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-gray-600 text-sm">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-500' : 'text-gray-400'}`}>
          <span className="text-sm font-medium">{percentage}</span>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </div>
      </div>
    </div>
  </div>
);

const ResourceCard = ({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) => (
  <div className={`${color} rounded-xl p-6 flex items-start justify-between cursor-pointer hover:opacity-90 transition-opacity`}>
    <div className="flex gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <ArrowRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
  </div>
);

const Dashboard = () => {
  const { user, isAdmin } = useAuthStore();

  const quickLinks = [
    { 
      title: 'Visitor Log',
      icon: (
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs">👨</span>
          </div>
          <div className="absolute top-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xs">👩</span>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-xs">👨‍⚕️</span>
          </div>
        </div>
      )
    },
    { 
      title: 'Add Hosts',
      icon: (
        <div className="w-20 h-20 flex items-center justify-center">
          <div className="relative">
            <svg className="w-16 h-16 text-gray-400" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              <circle cx="32" cy="32" r="30" strokeWidth="2"/>
              <circle cx="32" cy="28" r="8" strokeWidth="2"/>
              <path d="M20 48c0-6.627 5.373-12 12-12s12 5.373 12 12" strokeWidth="2"/>
            </svg>
            <svg className="absolute bottom-0 right-0 w-8 h-8 text-gray-400" viewBox="0 0 32 32" fill="none" stroke="currentColor">
              <circle cx="16" cy="16" r="14" strokeWidth="2"/>
              <path d="M10 16h12M16 10v12" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      )
    },
    { 
      title: 'Invite Staff',
      icon: (
        <div className="w-20 h-20 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 24h24M16 32h16" stroke="currentColor" strokeWidth="2"/>
            <circle cx="48" cy="32" r="12" fill="#F59E0B"/>
            <path d="M44 32h8M48 28v8" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
      )
    },
    { 
      title: 'Pending Approvals',
      icon: (
        <div className="w-20 h-20 flex items-center justify-center">
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            <rect x="12" y="8" width="40" height="48" rx="2" fill="#EF4444" fillOpacity="0.1" stroke="#EF4444" strokeWidth="2"/>
            <path d="M20 20h24M20 28h20M20 36h16" stroke="#EF4444" strokeWidth="2"/>
            <circle cx="48" cy="48" r="12" fill="#F59E0B"/>
            <path d="M48 52l-4-4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )
    }
  ];

  const stats = [
    { title: 'Visitors Today', value: '34', percentage: '50%', trend: 'up', color: 'bg-cyan-50 text-cyan-500' },
    { title: 'Checked Out', value: '25', percentage: '40%', trend: 'up', color: 'bg-red-50 text-red-500' },
    { title: 'Pending Approvals', value: '8', percentage: '20%', trend: 'down', color: 'bg-purple-50 text-purple-500' },
    { title: 'Badge Print Errors', value: '2', percentage: '10%', trend: 'down', color: 'bg-blue-50 text-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Good Morning, <span className="bg-gradient-to-r from-blue-500 via-green-600 to-blue-700 bg-clip-text text-transparent">{user?.name}</span> !
        </h1>
        <p className="text-gray-600">Welcome to your visitor dashboard hub</p>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <QuickLinkCard key={index} icon={link.icon} title={link.title} onClick={() => null} />
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
       {/* Cards Grid */}
         <div className="mb-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-[49px]">
             {
             isAdmin() ? (
              cardData.map((card, index) => (
                <StatsCardList
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card?.icon}
                />
              ))
            ) :
             (
              cardData.map((card, index) => (
                <StatsCardList 
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                />
              ))
            )}
          </div>
        </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Posting */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">Latest Posting</h2>
            <button className="text-blue-600 text-sm flex items-center gap-1 hover:gap-2 transition-all">
              See more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6">
              <svg className="w-32 h-32 text-gray-300" viewBox="0 0 128 128" fill="none">
                <rect x="20" y="30" width="88" height="4" rx="2" fill="currentColor"/>
                <rect x="20" y="45" width="70" height="4" rx="2" fill="currentColor"/>
                <rect x="20" y="60" width="88" height="4" rx="2" fill="currentColor"/>
                <rect x="20" y="75" width="60" height="4" rx="2" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">It Starts With One Visitor!</h3>
            <p className="text-gray-500 text-center text-sm mb-6">
              No activity yet. Start by adding your first visitor or host
            </p>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors">
              Add a Visitor
            </button>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-8">Pending Tasks</h2>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6">
              <svg className="w-32 h-32 text-gray-300" viewBox="0 0 128 128" fill="none">
                <rect x="30" y="30" width="68" height="4" rx="2" fill="currentColor"/>
                <rect x="30" y="45" width="55" height="4" rx="2" fill="currentColor"/>
                <rect x="30" y="60" width="68" height="4" rx="2" fill="currentColor"/>
                <rect x="30" y="75" width="45" height="4" rx="2" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pending Tasks</h3>
            <p className="text-gray-500 text-sm">No Pending Task</p>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Resources</h2>
            <button className="text-blue-600 text-sm flex items-center gap-1 hover:gap-2 transition-all">
              See more <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <ResourceCard
              icon={
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              }
              title="Getting Started Guides"
              description="Help you quickly understand system setup"
              color="bg-green-50"
            />
            <ResourceCard
              icon={
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              }
              title="Visitor Management Tips"
              description="Understand best practices for smooth visitor flow"
              color="bg-blue-50"
            />
            <ResourceCard
              icon={
                <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="9" x2="12" y2="13" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              }
              title="Troubleshooting & FAQs"
              description="Help you quickly understand system setup"
              color="bg-red-50"
            />
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Pipeline Summary</h2>
          <p className="text-gray-500 text-sm mb-8">Showing summary of all visitors in the past month</p>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="#E5E7EB"
                  strokeWidth="18"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="#D1D5DB"
                  strokeWidth="18"
                  fill="none"
                  strokeDasharray="534"
                  strokeDashoffset="534"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-5xl font-bold text-gray-900">0</p>
                <p className="text-gray-500 text-sm">Total Visitors</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span>No Visitors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;