import React, { useState, useMemo } from 'react';
import { 
  Search,
  // Filter,
  Download,
  Plus,
  User,
  Users,
  Calendar,
  Clock,
  Building,
  Mail,
  Phone,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  ChevronRight,
  BarChart3,
  CalendarDays,
  UserCheck,
  UserMinus,
  QrCode
} from 'lucide-react';
import Table from '../../components/Table/Table';

interface Visitor {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  hostName: string;
  department: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'Checked-In' | 'Pre-Booked' | 'Checked-Out';
  purpose: string;
  visitDate: string;
  photo?: string;
}

type VisitorFilter = 'all' | 'checked-in' | 'pre-booked' | 'checked-out';

const VisitorPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<VisitorFilter>('all');
  const [selectedDate, setSelectedDate] = useState<string>('today');

  // Sample visitor data
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      hostName: 'Kijabi M.',
      department: 'HR',
      checkInTime: '09:30 AM',
      checkOutTime: '11:45 AM',
      status: 'Checked-Out',
      purpose: 'Business Meeting',
      visitDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
      company: 'Design Studio',
      hostName: 'Mohammed L.',
      department: 'Admin',
      checkInTime: '10:15 AM',
      status: 'Checked-In',
      purpose: 'Interview',
      visitDate: '2024-01-15'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.c@tech.io',
      phone: '+1 (555) 456-7890',
      company: 'Innovate Labs',
      hostName: 'Kusimo F.',
      department: 'IT',
      status: 'Pre-Booked',
      purpose: 'Product Demo',
      visitDate: '2024-01-16',
      checkInTime: '02:00 PM'
    },
    {
      id: 4,
      name: 'Emily Williams',
      email: 'emily.w@creative.com',
      phone: '+1 (555) 234-5678',
      company: 'Creative Agency',
      hostName: 'Iheanacho H.',
      department: 'Engineering',
      checkInTime: '11:00 AM',
      checkOutTime: '12:30 PM',
      status: 'Checked-Out',
      purpose: 'Client Review',
      visitDate: '2024-01-15'
    },
    {
      id: 5,
      name: 'Robert Davis',
      email: 'robert.d@business.net',
      phone: '+1 (555) 876-5432',
      company: 'Business Solutions',
      hostName: 'Ogunnowo F.',
      department: 'Finance',
      checkInTime: '01:45 PM',
      status: 'Checked-In',
      purpose: 'Financial Review',
      visitDate: '2024-01-15'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.a@consult.com',
      phone: '+1 (555) 345-6789',
      company: 'Consulting Group',
      hostName: 'Adeleye G.',
      department: 'HR',
      status: 'Pre-Booked',
      purpose: 'Training Session',
      visitDate: '2024-01-17',
      checkInTime: '10:00 AM'
    },
    {
      id: 7,
      name: 'David Wilson',
      email: 'david.w@digital.co',
      phone: '+1 (555) 765-4321',
      company: 'Digital Ventures',
      hostName: 'Talabi F.',
      department: 'HR',
      checkInTime: '09:00 AM',
      checkOutTime: '10:30 AM',
      status: 'Checked-Out',
      purpose: 'Partnership Meeting',
      visitDate: '2024-01-15'
    },
    {
      id: 8,
      name: 'Jennifer Brown',
      email: 'jennifer.b@startup.io',
      phone: '+1 (555) 432-1098',
      company: 'Startup Foundry',
      hostName: 'Sadiq V.',
      department: 'Finance',
      checkInTime: '03:30 PM',
      status: 'Checked-In',
      purpose: 'Investment Pitch',
      visitDate: '2024-01-15'
    }
  ]);

  // Filter tabs configuration
  const filterTabs = [
    { id: 'all' as VisitorFilter, label: 'All Visitors', icon: Users, count: visitors.length },
    { id: 'checked-in' as VisitorFilter, label: 'Checked-In', icon: UserCheck, count: visitors.filter(v => v.status === 'Checked-In').length },
    { id: 'pre-booked' as VisitorFilter, label: 'Pre-Booked', icon: CalendarDays, count: visitors.filter(v => v.status === 'Pre-Booked').length },
    { id: 'checked-out' as VisitorFilter, label: 'Checked-Out', icon: UserMinus, count: visitors.filter(v => v.status === 'Checked-Out').length },
  ];

  // Statistics data
  const statistics = [
    { 
      label: 'Total Visitors Today', 
      value: visitors.filter(v => v.visitDate === '2024-01-15').length.toString(),
      icon: Users,
      color: 'blue'
    },
    { 
      label: 'Currently Checked-In', 
      value: visitors.filter(v => v.status === 'Checked-In').length.toString(),
      icon: UserCheck,
      color: 'green'
    },
    { 
      label: 'Expected Today', 
      value: visitors.filter(v => v.status === 'Pre-Booked' && v.visitDate === '2024-01-15').length.toString(),
      icon: Calendar,
      color: 'orange'
    },
    { 
      label: 'Avg. Visit Duration', 
      value: '45m',
      icon: Clock,
      color: 'purple'
    }
  ];

  console.log(statistics, 'statistics')

  // Filter visitors based on active filter and search
  const filteredVisitors = useMemo(() => {
    let result = visitors;

    // Apply status filter
    if (activeFilter !== 'all') {
      const statusMap = {
        'checked-in': 'Checked-In',
        'pre-booked': 'Pre-Booked',
        'checked-out': 'Checked-Out'
      };
      result = result.filter(v => v.status === statusMap[activeFilter]);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(searchLower) ||
        v.company.toLowerCase().includes(searchLower) ||
        v.hostName.toLowerCase().includes(searchLower) ||
        v.email.toLowerCase().includes(searchLower) ||
        v.purpose.toLowerCase().includes(searchLower)
      );
    }

    // Apply date filter (simplified - would be more complex in real app)
    if (selectedDate === 'today') {
      result = result.filter(v => v.visitDate === '2024-01-15');
    } else if (selectedDate === 'week') {
      // Filter for this week (simplified)
      // result = result;
    }

    return result;
  }, [visitors, activeFilter, searchTerm, selectedDate]);

  // Table columns configuration
  const columns = [
    {
      header: 'VISITOR',
      view: (row: Visitor) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span className="font-medium text-gray-800 block">{row.name}</span>
            <span className="text-xs text-gray-500">{row.company}</span>
          </div>
        </div>
      )
    },
    {
      header: 'HOST',
      view: (row: Visitor) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
            <User className="w-3 h-3 text-gray-600" />
          </div>
          <div>
            <span className="font-medium text-gray-700 block">{row.hostName}</span>
            <span className="text-xs text-gray-500">{row.department}</span>
          </div>
        </div>
      )
    },
    {
      header: 'CONTACT',
      view: (row: Visitor) => (
        <div className="space-y-1">
          <div className="flex items-center">
            <Mail className="w-3 h-3 mr-1 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{row.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-3 h-3 mr-1 text-gray-400" />
            <span className="text-sm text-gray-600">{row.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: 'PURPOSE',
      view: (row: Visitor) => (
        <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm inline-block">
          {row.purpose}
        </div>
      )
    },
    {
      header: 'TIME',
      view: (row: Visitor) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-3 h-3 mr-1" />
            {row.checkInTime}
          </div>
          {row.checkOutTime && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-xs mr-1">Out:</span>
              {row.checkOutTime}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'STATUS',
      view: (row: Visitor) => (
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center justify-center ${
          row.status === 'Checked-In' 
            ? 'bg-green-100 text-green-700' 
            : row.status === 'Pre-Booked'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {row.status === 'Checked-In' && <CheckCircle className="w-3 h-3 mr-1" />}
          {row.status === 'Pre-Booked' && <Calendar className="w-3 h-3 mr-1" />}
          {row.status === 'Checked-Out' && <XCircle className="w-3 h-3 mr-1" />}
          {row.status}
        </div>
      )
    },
    {
      header: 'ACTIONS',
      view: (row: Visitor) => (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleViewVisitor(row)}
            className="px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors flex items-center"
          >
            <Eye className="w-3 h-3 mr-1" />
            View
          </button>
          <button 
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )
    }
  ];

  // Row actions for dropdown
  const rowActions = (row: Visitor) => [
    { name: 'view', action: () => handleViewVisitor(row) },
    { name: 'check-in', action: () => handleCheckIn(row), hide: row.status !== 'Pre-Booked' },
    { name: 'check-out', action: () => handleCheckOut(row), hide: row.status !== 'Checked-In' },
    { name: 'edit', action: () => handleEditVisitor(row) },
    { name: 'cancel', action: () => handleCancelVisit(row), hide: row.status === 'Checked-Out' }
  ];

  // Event handlers
  const handleViewVisitor = (visitor: Visitor) => {
    console.log('View visitor:', visitor);
    // Implement detailed view modal
  };

  const handleCheckIn = (visitor: Visitor) => {
    setVisitors(prev => prev.map(v => 
      v.id === visitor.id ? { ...v, status: 'Checked-In' } : v
    ));
  };

  const handleCheckOut = (visitor: Visitor) => {
    setVisitors(prev => prev.map(v => 
      v.id === visitor.id 
        ? { ...v, status: 'Checked-Out', checkOutTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        : v
    ));
  };

  const handleEditVisitor = (visitor: Visitor) => {
    console.log('Edit visitor:', visitor);
    // Implement edit modal
  };

  const handleCancelVisit = (visitor: Visitor) => {
    setVisitors(prev => prev.filter(v => v.id !== visitor.id));
  };

  const handleRegisterVisitor = () => {
    console.log('Register new visitor');
    // Implement registration modal
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w- mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-[#1F3C88]">Visitor Management</h1>
          <p className="text-xs md:text-sm font-semibold text-[#4C63A0] mt-1">
            Once a visitor checks in, you'll see their details here.
          </p>
        </div>

        {/* Statistics Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statistics.map((stat, index) => (
            <div 
              key={index}
              className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <span className={`w-2 h-2 rounded-full bg-${stat.color}-500 mr-2`}></span>
                  <span>Updated just now</span>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
        <div className="grid grid-cols-1 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`px-4 py-2.5 rounded-lg flex items-center transition-colors ${
                        activeFilter === tab.id
                          ? 'bg-[#1F3C88] text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      <span className="font-medium">{tab.label}</span>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        activeFilter === tab.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search and Actions Bar */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search visitors by name, company, host..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                    >
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="all">All Time</option>
                    </select>
                    <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                    <button 
                      onClick={handleRegisterVisitor}
                      className="px-4 py-2.5 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Register Visitor
                    </button>
                  </div>
                </div>
              </div>

              {/* Visitors Table */}
              {filteredVisitors.length > 0 ? (
                <div className="p-6">
                  <Table
                    tableData={filteredVisitors}
                    columns={columns}
                    rowActions={rowActions}
                    showAction={true}
                    actionType="dropdown"
                    tableHeight="auto"
                    showPagination={true}
                    hideTableHeader={false}
                    totalPages={Math.ceil(filteredVisitors.length / 10)}
                  />
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Visitors Found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm 
                      ? 'No visitors match your search criteria'
                      : `No visitors in the "${activeFilter}" category`}
                  </p>
                  <button 
                    onClick={handleRegisterVisitor}
                    className="px-6 py-3 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors inline-flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Register First Visitor
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-between transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <QrCode className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800">Generate QR Code</h3>
                      <p className="text-sm text-gray-600">For visitor check-in</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-between transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800">Schedule Visit</h3>
                      <p className="text-sm text-gray-600">Pre-book appointments</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex items-center justify-between transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800">Host Dashboard</h3>
                      <p className="text-sm text-gray-600">View host schedules</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Today's Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <UserCheck className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Checked In</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {visitors.filter(v => v.status === 'Checked-In').length}
                      </p>
                    </div>
                  </div>
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Expected</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {visitors.filter(v => v.status === 'Pre-Booked' && v.visitDate === '2024-01-15').length}
                      </p>
                    </div>
                  </div>
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <UserMinus className="w-5 h-5 mr-3 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Checked Out</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {visitors.filter(v => v.status === 'Checked-Out').length}
                      </p>
                    </div>
                  </div>
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <UserCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">Sarah Johnson checked in</p>
                    <p className="text-xs text-gray-500">10:15 AM • Meeting Mohammed L.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                    <CalendarDays className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">Michael Chen pre-booked visit</p>
                    <p className="text-xs text-gray-500">Yesterday • Product demo with IT</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                    <UserMinus className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">Emily Williams checked out</p>
                    <p className="text-xs text-gray-500">12:30 PM • Client review completed</p>
                  </div>
                </div>
                <button className="w-full text-center text-sm text-[#1F3C88] font-medium hover:text-[#172b66] pt-4 border-t border-gray-100">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorPage;