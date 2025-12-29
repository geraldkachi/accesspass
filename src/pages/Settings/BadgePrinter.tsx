import React from 'react';

const BadgePrinter = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-[#1F3C88]">Badge Printer</h1>
          <p className="text-xs md:text-sm font-semibold text-[#4C63A0] mt-1">
            Manage your badge printer settings and connections
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Left Column - Connection Status & Available Printers */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connection Status Card */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#4C63A0] mb-6">Connection Status</h2>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium text-gray-900 text-lg">Brother QL-800</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-green-600 font-medium">Connected</span>
                    </div>
                  </div>
                  
                  <button className="px-6 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                    Disconnect
                  </button>
                </div>
              </div>
            </div>

            {/* Available Printers Card */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#4C63A0] mb-6">Available Printers</h2>
              
              <div className="space-y-4">
                {/* Printer 1 */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-medium text-gray-900">DYMO LabelWriter 450</h3>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-red-600">Not Connected</span>
                      </div>
                    </div>
                    
                    <button className="px-6 py-2.5 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors">
                      Connect
                    </button>
                  </div>
                </div>

                {/* Printer 2 */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-medium text-gray-900">Zebra ZD401</h3>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-red-600">Not Connected</span>
                      </div>
                    </div>
                    
                    <button className="px-6 py-2.5 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Print Settings & Test Connection */}
          <div className="space-y-6">
            {/* Print Settings Card */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-[#4C63A0] mb-6">Print Settings</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Printer</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-[#1F3C88]">
                  <option>Brother QL-800</option>
                  <option>DYMO LabelWriter 450</option>
                  <option>Zebra ZD401</option>
                </select>
              </div>
            </div>

            {/* Test Connection Card */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Test Connection</h2>
              
              <div className="space-y-6">
                <button className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 text-[#1F3C88] rounded-lg hover:bg-blue-100 transition-colors font-medium">
                  Test Printer Connection
                </button>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Troubleshoot Connection</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Having issues with your printer connection?
                  </p>
                  <button className="text-[#1F3C88] hover:text-[#172b66] font-medium">
                    View Troubleshooting Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgePrinter;