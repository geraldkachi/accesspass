import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// Types
interface Schedule {
  id: string;
  title: string;
  description: string;
  visitorName: string;
  visitorEmail: string;
  hostName: string;
  hostDepartment: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  purpose: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
}

// interface DaySchedule {
//   day: number;
//   month: number;
//   year: number;
//   schedules: Schedule[];
// }

// Modal Component
const CreateScheduleModal = ({ 
  isOpen, 
  onClose, 
  onScheduleCreated 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onScheduleCreated: (schedule: Schedule) => void;
}) => {
  const [step, setStep] = useState(1);
  const [visitorType, setVisitorType] = useState('existing');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  
  // Form state
  const [formData, setFormData] = useState<Partial<Schedule>>({
    visitorName: '',
    visitorEmail: '',
    hostName: '',
    hostDepartment: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    status: 'pending',
    color: '#3b82f6', // Default blue
  });

  // Sample data
  const departments = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'IT', 'Operations'];
  const hosts = [
    { id: 1, name: 'John Smith', department: 'Engineering', email: 'john@company.com' },
    { id: 2, name: 'Sarah Johnson', department: 'HR', email: 'sarah@company.com' },
    { id: 3, name: 'Mike Chen', department: 'Sales', email: 'mike@company.com' },
    { id: 4, name: 'Lisa Wong', department: 'Marketing', email: 'lisa@company.com' },
    { id: 5, name: 'David Brown', department: 'IT', email: 'david@company.com' },
  ];

  // Time slots
  const timeSlots = [
    '8:00', '9:00', '10:00', '11:00', 
    '12:00', '13:00', '14:00', '15:00', 
    '16:00', '17:00'
  ];

  // Color options for schedule
  const colorOptions = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#10b981', label: 'Green' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#ef4444', label: 'Red' },
    { value: '#8b5cf6', label: 'Purple' },
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setStep(1);
      setFormData({
        visitorName: '',
        visitorEmail: '',
        hostName: '',
        hostDepartment: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        purpose: '',
        status: 'pending',
        color: '#3b82f6',
      });
    }
  }, [isOpen]);

  const handleInputChange = (field: keyof Schedule, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateSchedule = () => {
    const newSchedule: Schedule = {
      id: `schedule-${Date.now()}`,
      title: `Meeting with ${formData.hostName}`,
      description: formData.purpose || '',
      visitorName: formData.visitorName || '',
      visitorEmail: formData.visitorEmail || '',
      hostName: formData.hostName || '',
      hostDepartment: formData.hostDepartment || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      startTime: formData.startTime || '',
      endTime: formData.endTime || '',
      purpose: formData.purpose || '',
      status: 'pending',
      color: formData.color || '#3b82f6',
    };
    
    onScheduleCreated(newSchedule);
    onClose();
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">1 Select Visitor</h3>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Type visitor name or email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.visitorName}
                onChange={(e) => handleInputChange('visitorName', e.target.value)}
              />
            </div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
            
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setVisitorType('new')}
            >
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-blue-500 font-medium">Add New Visitor</span>
            </button>
            
            {visitorType === 'new' && (
              <div className="mt-4 space-y-3 p-3 border border-gray-200 rounded-md">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.visitorName}
                  onChange={(e) => handleInputChange('visitorName', e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.visitorEmail}
                  onChange={(e) => handleInputChange('visitorEmail', e.target.value)}
                />
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">2 Select Host</h3>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search host by name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.hostName}
                onChange={(e) => handleInputChange('hostName', e.target.value)}
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Filter by Department</p>
              <div className="flex flex-wrap gap-2">
                {departments.map(dept => (
                  <button
                    key={dept}
                    type="button"
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedDepartment === dept
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md divide-y divide-gray-200 max-h-48 overflow-y-auto">
              {hosts
                .filter(host => selectedDepartment === 'All' || host.department === selectedDepartment)
                .filter(host => (formData.hostName ?? '') === '' || 
                  host.name.toLowerCase().includes((formData.hostName ?? '').toLowerCase()))
                .map(host => (
                  <div 
                    key={host.id} 
                    className="p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      handleInputChange('hostName', host.name);
                      handleInputChange('hostDepartment', host.department);
                    }}
                  >
                    <p className="font-medium text-gray-900">{host.name}</p>
                    <p className="text-sm text-gray-500">{host.department}</p>
                  </div>
                ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">3 Pick Date & Time</h3>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Date</p>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Start Time</p>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={`start-${time}`} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">End Time</p>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={`end-${time}`} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.slice(0, 4).map(time => (
                <button
                  key={time}
                  type="button"
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => {
                    handleInputChange('startTime', time);
                    // Auto-set end time to 1 hour later
                    const [hours] = time.split(':');
                    const endHour = parseInt(hours) + 1;
                    handleInputChange('endTime', `${endHour}:00`);
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">4 Purpose of Visit</h3>
            
            <textarea
              placeholder="e.g. Interview, Meeting, Delivery"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              rows={4}
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
            />
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Schedule Color</p>
              <div className="flex gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${formData.color === color.value ? 'border-gray-800' : 'border-transparent'}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleInputChange('color', color.value)}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">5 Notification</h3>
            
            <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Send email notification</p>
                  <p className="text-xs text-gray-500">Visitor and host will receive email confirmation</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            {/* Summary */}
            <div className="p-3 border border-gray-200 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Schedule Summary</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Visitor:</span> {formData.visitorName}</p>
                <p><span className="text-gray-500">Host:</span> {formData.hostName}</p>
                <p><span className="text-gray-500">Date:</span> {formData.date}</p>
                <p><span className="text-gray-500">Time:</span> {formData.startTime} - {formData.endTime}</p>
                <p><span className="text-gray-500">Purpose:</span> {formData.purpose}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Create New Schedule</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              {[1, 2, 3, 4, 5].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    stepNum === step 
                      ? 'bg-blue-600 text-white' 
                      : stepNum < step 
                        ? 'bg-gray-300 text-gray-700'
                        : 'border border-gray-300 text-gray-400'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 5 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      stepNum < step ? 'bg-gray-400' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="px-6 py-4">
            {renderStepContent()}
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              
              <div className="flex gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCreateSchedule}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                  >
                    Save & Confirm
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Details Modal
const ScheduleDetailsModal = ({ 
  schedule, 
  onClose 
}: { 
  schedule: Schedule | null; 
  onClose: () => void 
}) => {
  if (!schedule) return null;

  const getStatusColor = (status: Schedule['status']) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Schedule Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 text-xl"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 text-lg">{schedule.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(schedule.status)}`}>
                {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: schedule.color }}
              />
              <p className="text-gray-600">{schedule.purpose}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{schedule.date} • {schedule.startTime} - {schedule.endTime}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Visitor</p>
                <p className="font-medium">{schedule.visitorName}</p>
                <p className="text-sm text-gray-500">{schedule.visitorEmail}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Host</p>
                <p className="font-medium">{schedule.hostName}</p>
                <p className="text-sm text-gray-500">{schedule.hostDepartment} Department</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-700">{schedule.description || 'No description provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Schedule Page Component
const SchedulePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly team sync',
      visitorName: 'Alice Johnson',
      visitorEmail: 'alice@example.com',
      hostName: 'John Smith',
      hostDepartment: 'Engineering',
      date: '2025-08-26',
      startTime: '10:00',
      endTime: '11:00',
      purpose: 'Team Sync',
      status: 'confirmed',
      color: '#10b981',
    },
    {
      id: '2',
      title: 'Client Presentation',
      description: 'Quarterly review with ABC Corp',
      visitorName: 'Bob Wilson',
      visitorEmail: 'bob@abccorp.com',
      hostName: 'Sarah Johnson',
      hostDepartment: 'Sales',
      date: '2025-08-28',
      startTime: '14:00',
      endTime: '15:30',
      purpose: 'Client Meeting',
      status: 'pending',
      color: '#3b82f6',
    },
    {
      id: '3',
      title: 'Project Deadline',
      description: 'Final project review',
      visitorName: 'Carol Davis',
      visitorEmail: 'carol@example.com',
      hostName: 'Mike Chen',
      hostDepartment: 'Engineering',
      date: '2025-08-30',
      startTime: '17:00',
      endTime: '18:00',
      purpose: 'Project Review',
      status: 'confirmed',
      color: '#f59e0b',
    },
  ]);

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  // Handle schedule creation
  const handleScheduleCreated = (newSchedule: Schedule) => {
    setSchedules(prev => [...prev, newSchedule]);
  };

  // Get schedules for a specific day
  const getSchedulesForDay = (day: number) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return schedules.filter(schedule => schedule.date === dateStr);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = firstDay === 0 ? 6 : firstDay;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonthDaysCount = getDaysInMonth(prevMonthYear, prevMonth);
    
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDaysCount - i,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false,
        schedules: [],
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const daySchedules = getSchedulesForDay(day);
      days.push({
        day,
        month,
        year,
        isCurrentMonth: true,
        schedules: daySchedules,
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false,
        schedules: [],
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
            <p className="text-gray-600 mt-2">{formatDate(selectedDate)}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Create Schedule
          </button>
        </div>
        
        {/* Calendar Section */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h2>
            </div>
              <div className="flex gap-2">
              <button 
                onClick={() => setSelectedDate(new Date())}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Today
              </button>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
          </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {calendarDays.map((dayData, index) => {
              const today = new Date();
              const isToday = dayData.isCurrentMonth && 
                dayData.day === today.getDate() && 
                dayData.month === today.getMonth() && 
                dayData.year === today.getFullYear();
              
              return (
                <div 
                  key={index}
                  className={`min-h-[80px] md:min-h-[100px] p-1 md:p-2 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                    isToday 
                      ? 'border-blue-500 bg-blue-50' 
                      : dayData.isCurrentMonth
                      ? 'border-gray-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => {
                    if (dayData.isCurrentMonth && dayData.schedules.length > 0) {
                      setSelectedSchedule(dayData.schedules[0]);
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-medium text-sm md:text-base ${
                      dayData.isCurrentMonth 
                        ? isToday ? 'text-blue-600' : 'text-gray-900'
                        : 'text-gray-400'
                    }`}>
                      {dayData.day}
                    </span>
                    {dayData.schedules.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {dayData.schedules.length} event{dayData.schedules.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  
                  {/* Schedule indicators */}
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {dayData.schedules.slice(0, 3).map(schedule => (
                      <div 
                        key={schedule.id}
                        className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-90"
                        style={{ backgroundColor: schedule.color + '20' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSchedule(schedule);
                        }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full inline-block mr-1"
                          style={{ backgroundColor: schedule.color }}
                        />
                        <span className="font-medium" style={{ color: schedule.color }}>
                          {schedule.startTime}
                        </span>
                        <span className="text-gray-600 ml-1 truncate">{schedule.visitorName}</span>
                      </div>
                    ))}
                    {dayData.schedules.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayData.schedules.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {schedules
              .filter(schedule => new Date(schedule.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map(schedule => (
                <div 
                  key={schedule.id} 
                  className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => setSelectedSchedule(schedule)}
                >
                  <div 
                    className="text-center bg-white px-3 py-2 rounded-lg min-w-[70px]"
                    style={{ borderLeft: `4px solid ${schedule.color}` }}
                  >
                    <p className="font-bold text-gray-900">
                      {new Date(schedule.date).getDate()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(schedule.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{schedule.title}</p>
                    <p className="text-sm text-gray-500">
                      {schedule.startTime} - {schedule.endTime} • {schedule.visitorName}
                    </p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                      schedule.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      schedule.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: schedule.color }}
                    />
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSchedule(schedule);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <CreateScheduleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onScheduleCreated={handleScheduleCreated}
      />
      
      <ScheduleDetailsModal 
        schedule={selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
      />
    </div>
  );
};

export default SchedulePage;
export { CreateScheduleModal, ScheduleDetailsModal };