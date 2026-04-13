
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { useAuthStore } from "../store/authStore";

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "sidebar/dashboard.svg" },
    { path: "/visitor", label: "Visitor", icon: "sidebar/visitor.svg" },
    { path: "/hosts", label: "Hosts", icon: "sidebar/hosts.svg" },
    { path: "/schedule", label: "Schedule", icon: "sidebar/schedule.svg" },
    { path: "/messages", label: "Messages", icon: "sidebar/messages.svg" },
    { path: "/reports", label: "Reports", icon: "sidebar/reports.svg" },
    { path: "/resource-hub", label: "Resource Hub", icon: "sidebar/resource-hub.svg" },
    { path: "/settings", label: "Settings", icon: "sidebar/settings.svg" },
  ];

  return (
    <div 
      className={`bg-[#F3F4F7] relative h-screen border-r border-[#BAC3DA] shadow hidden md:flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[70px]' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="w-full flex items-center justify-between py-2 px-4 border-b border-[#BAC3DA]">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img src="/vite.svg" className="w-10 object-cover" alt="access pass" />
            <p className="text-lg font-bold">AccessPass</p>
          </div>
        )}
        
        {isCollapsed && (
          <div className="mx-auto">
            <img src="/vite.svg" className="w-10 object-cover" alt="access pass" />
          </div>
        )}
        
      </div>
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-5 bg-white hover:bg-gray-100 p-1.5 rounded-lg transition-colors z-10 border border-[#BAC3DA] shadow-md ${
            isCollapsed ? '' : ''
          }`}
        >
          {isCollapsed ? (
            <FiChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <FiChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>

      {/* Profile Section - Only shown when expanded */}
      {!isCollapsed && (
        <div className="rounded-[14px] border border-[#BAC3DA] mx-4 my-4">
          <div className="flex items-center justify-between p-1.5">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-[#E9ECF3] flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" rx="24" fill="#E9ECF3" />
                  <g clipPath="url(#clip0_629_8204)">
                    <path d="M48.4531 50.7227V70.6093" stroke="#4C63A0" strokeWidth="3.09278" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30.0312 40.6367L48.4526 50.7192L66.874 40.6367" stroke="#4C63A0" strokeWidth="3.09278" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M66.2038 61.122L49.1935 70.4351C48.9659 70.5596 48.7107 70.6249 48.4512 70.6249C48.1918 70.6249 47.9365 70.5596 47.709 70.4351L30.6987 61.122C30.4558 60.9891 30.253 60.7934 30.1116 60.5554C29.9701 60.3174 29.8952 60.0458 29.8945 59.7689V41.2779C29.8952 41.001 29.9701 40.7294 30.1116 40.4914C30.253 40.2534 30.4558 40.0577 30.6987 39.9248L47.709 30.6117C47.9365 30.4871 48.1918 30.4219 48.4512 30.4219C48.7107 30.4219 48.9659 30.4871 49.1935 30.6117L66.2038 39.9248C66.4467 40.0577 66.6495 40.2534 66.7909 40.4914C66.9324 40.7294 67.0073 41.001 67.0079 41.2779V59.765C67.008 60.0425 66.9334 60.315 66.7919 60.5537C66.6504 60.7925 66.4473 60.9888 66.2038 61.122Z" stroke="#4C63A0" strokeWidth="3.09278" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M39.4766 35.1133L57.7317 45.1049V55.1565" stroke="#4C63A0" strokeWidth="3.09278" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_629_8204">
                      <rect width="49.4845" height="49.4845" fill="white" transform="translate(23.7109 25.7734)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500 truncate max-w-[140px]">
                  Position
                </p>
                <p className="text-sm font-semibold text-gray-700 truncate max-w-[140px]">
                  {user?.name?.substring(0, 16) || 'User'}
                </p>
              </div>
            </div>
            <FiChevronDown className="text-gray-500" />
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center py-3 text-sm rounded-lg transition-colors duration-200 ${
                  isCollapsed ? 'justify-center px-3' : 'px-4'
                } ${
                  isActive
                    ? 'bg-[#D7E0F7] text-[#1F3C88]'
                    : 'text-[#222222] hover:bg-[#E9ECF3] hover:text-[#1F3C88]'
                }`
              }
              title={isCollapsed ? item.label : ''}
            >
              <img
                src={`/${item.icon}`}
                alt={item.label}
                className="w-5 h-5"
              />
              {!isCollapsed && (
                <span className="ml-3">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile & Logout Section */}
      <div className="mt-auto py-3 border-t border-[#BAC3DA]">
        <div className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'justify-between px-4'}`}>
          {/* User Info - Only show when expanded */}
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600 font-medium text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="max-w-[140px]">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          )}

          {/* User Avatar - When collapsed */}
          {isCollapsed && (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
                 title={`${user?.name || 'User'}\n${user?.email || ''}`}>
              <span className="text-blue-600 font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className={`text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'p-2 absolute bottom-3' : 'p-2'
            }`}
            title="Logout"
          >
            <img src="/logout.svg" className="w-4 h-4" alt="logout" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;