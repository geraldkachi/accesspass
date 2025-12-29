import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface PageConfig {
  text: string;
  testId: string;
  route: string;
}

const pages: PageConfig[] = [
  {
    text: 'General Settings',
    testId: 'GeneralSetting',
    route: 'general-setting',
  },
  {
    text: 'Badge Printer',
    testId: 'Badge-Printer',
    route: 'badge-printer',
  },
  {
    text: 'Access Control',
    testId: 'access-control',
    route: 'access-control',
  },
  {
    text: 'Roles & Permission',
    testId: 'Roles-&-Permission',
    route: 'roles-permission',
  },
];

const Settings: React.FC = () => {
  return (
    <>
      <h1 className="text-xl font-semibold text-[#1F3C88]">
        Account & Settings
      </h1>
      <div className="md:flex md:h-full bg-[#F3F4F7] dark:bg-kiwishade rounded">
        <div className="md:w-[301px] md:h-full relative px-3">
          <div className="flex items-center py-2 pl-4 space-x-3">
            <div className="w-14 h-14 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-900">
              {/* {business.logo && (
                <img
                  alt={business.name}
                  className="w-14 h-14 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-900"
                />
              )} */}
            </div>
          </div>

          {pages.map(({ text, testId, route }) => (
            <NavLink
              key={testId}
              to={route}
              end={route === 'general-setting'} // Make first route active by default
              className={({ isActive }) => 
                `profileBtn block mb-1 text-10px w-full py-3 font-semibold rounded-[4px] p-4 text-lightnavyblue text-left mx-auto focus:outline-none ${isActive ? 'active text-white bg-[#697CAF]' : ''}`
              }
              data-testid={testId}
            >
              {text}
            </NavLink>
          ))}
        </div>
        <div className="w-full">
          <div className="tab-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;