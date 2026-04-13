import { useState, useCallback } from 'react';
import { 
  Plus, 
  // Filter,
  Download,
  Search,
  Users,
  Building,
  User,
  Mail,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  UserPlus,
  Activity,
  BarChart3
} from 'lucide-react';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal';

interface Host {
  id: number;
  name: string;
  department: string;
  email: string;
  status: 'Active' | 'Inactive';
  photo?: string;
}

interface Department {
  id: number;
  name: string;
  hostCount: number;
  status: 'Active' | 'Inactive';
}

interface ModalData {
  type: 'add' | 'edit' | 'delete' | 'addDepartment' | 'editDepartment';
  title: string;
  actionLabel: string;
  actionType?: 'primary' | 'danger';
  hostId?: number;
  departmentId?: number;
}

const Hosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const [hosts, setHosts] = useState<Host[]>([
    { id: 1, name: 'Kijabi M.', department: 'HR', email: 'kijabi@gmail.com', status: 'Active' },
    { id: 2, name: 'Mohammed L.', department: 'Admin', email: 'Layemi@gmail.com', status: 'Active' },
    { id: 3, name: 'Kusimo F.', department: 'IT', email: 'kus009@gmail.com', status: 'Active' },
    { id: 4, name: 'Iheanacho H.', department: 'Engineering', email: 'henry876@gmail.com', status: 'Active' },
    { id: 5, name: 'Ogunnowo F.', department: 'Finance', email: 'felicity@gmail.com', status: 'Active' },
    { id: 6, name: 'Adeleye G.', department: 'HR', email: 'ginka@gmail.com', status: 'Inactive' },
    { id: 7, name: 'Talabi F.', department: 'HR', email: 'tallestf@gmail.com', status: 'Inactive' },
    { id: 8, name: 'Sadiq V.', department: 'Finance', email: 'sanviv@gmail.com', status: 'Inactive' },
    { id: 9, name: 'Goke J.', department: 'Sales', email: 'joan@gmail.com', status: 'Inactive' },
    { id: 10, name: 'Humphrey V.', department: 'IT', email: 'humpv@gmail.com', status: 'Inactive' },
    { id: 11, name: 'Kehinde D.', department: 'Engineering', email: 'kennyd@gmail.com', status: 'Active' },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: 'HR', hostCount: 3, status: 'Active' },
    { id: 2, name: 'Admin', hostCount: 1, status: 'Active' },
    { id: 3, name: 'IT', hostCount: 2, status: 'Active' },
    { id: 4, name: 'Engineering', hostCount: 2, status: 'Active' },
    { id: 5, name: 'Finance', hostCount: 2, status: 'Active' },
    { id: 6, name: 'Sales', hostCount: 1, status: 'Active' },
  ]);

  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    email: '',
    status: 'Active' as 'Active' | 'Inactive',
  });
  const [departmentFormData, setDepartmentFormData] = useState({
    name: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  // Define columns for the Table component
  const columns = [
    {
      header: 'NAME',
      view: (row: Host) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <span className="font-medium text-gray-800 block">{row.name}</span>
            <span className="text-xs text-gray-500">{row.department}</span>
          </div>
        </div>
      )
    },
    {
      header: 'DEPARTMENT',
      view: (row: Host) => (
        <div className="flex items-center">
          <Building className="w-4 h-4 mr-2 text-gray-400" />
          <span>{row.department}</span>
        </div>
      )
    },
    {
      header: 'EMAIL',
      view: (row: Host) => (
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-gray-600">{row.email}</span>
        </div>
      )
    },
    {
      header: 'STATUS',
      view: (row: Host) => (
        <div className="flex items-center">
          {row.status === 'Active' ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-green-600 font-medium">{row.status}</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 mr-2 text-red-500" />
              <span className="text-red-600 font-medium">{row.status}</span>
            </>
          )}
        </div>
      )
    },
    {
      header: 'ACTIONS',
      view: (row: Host) => (
        <div className="flex items-center space-x-2">
          <button 
             onClick={() => {
              handleViewHost(row)
              handleEditHost(row)
            }}
            className="px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors flex items-center"
          >
            <Eye className="w-3 h-3 mr-1" />
            View
          </button>
          {/* <button 
            onClick={() => handleEditHost(row)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button> */}
        </div>
      )
    }
  ];

  const rowActions = (row: Host) => [
    {
      name: 'view',
      action: () => handleViewHost(row)
    },
    {
      name: 'edit',
      action: () => handleEditHost(row)
    },
    {
      name: 'delete',
      action: () => handleDeleteHost(row)
    }
  ];

  // Filter hosts based on search and filters
  const filteredHosts = hosts.filter(host => {
    const matchesSearch = host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         host.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         host.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || host.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || host.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddHost = () => {
    setFormData({ name: '', department: '', email: '', status: 'Active' });
    setModalData({
      type: 'add',
      title: 'Add New Host',
      actionLabel: 'Add Host',
      actionType: 'primary'
    });
  };

  const handleEditHost = (host: Host) => {
    setFormData({
      name: host.name,
      department: host.department,
      email: host.email,
      status: host.status
    });
    setModalData({
      type: 'edit',
      hostId: host.id,
      title: 'Edit Host',
      actionLabel: 'Save Changes',
      actionType: 'primary'
    });
  };

  const handleViewHost = (host: Host) => {
    console.log('View host:', host);
    // You can implement a detailed view modal here
  };

  const handleDeleteHost = (host: Host) => {
    setFormData({
      name: host.name,
      department: host.department,
      email: host.email,
      status: host.status
    });
    setModalData({
      type: 'delete',
      hostId: host.id,
      title: 'Delete Host',
      actionLabel: 'Delete Host',
      actionType: 'danger'
    });
  };

  const handleAddDepartment = () => {
    setDepartmentFormData({ name: '', status: 'Active' });
    setModalData({
      type: 'addDepartment',
      title: 'Add New Department',
      actionLabel: 'Add Department',
      actionType: 'primary'
    });
  };

  const handleEditDepartment = (department: Department) => {
    setDepartmentFormData({
      name: department.name,
      status: department.status
    });
    setModalData({
      type: 'editDepartment',
      departmentId: department.id,
      title: 'Edit Department',
      actionLabel: 'Save Changes',
      actionType: 'primary'
    });
  };

  const handleAddHostSubmit = useCallback(() => {
    if (formData.name && formData.department && formData.email) {
      const newHost: Host = {
        id: hosts.length > 0 ? Math.max(...hosts.map(h => h.id)) + 1 : 1,
        name: formData.name,
        department: formData.department,
        email: formData.email,
        status: formData.status
      };
      setHosts(prev => [...prev, newHost]);
      closeModal();
    }
  }, [formData, hosts]);

  const handleEditHostSubmit = useCallback(() => {
    if (formData.name && formData.department && formData.email && modalData?.hostId) {
      setHosts(prev => prev.map(host => 
        host.id === modalData.hostId 
          ? { ...host, ...formData }
          : host
      ));
      closeModal();
    }
  }, [formData, modalData?.hostId]);

  const handleDeleteHostSubmit = useCallback(() => {
    if (modalData?.hostId) {
      setHosts(prev => prev.filter(host => host.id !== modalData.hostId));
      closeModal();
    }
  }, [modalData?.hostId]);

  const handleAddDepartmentSubmit = useCallback(() => {
    if (departmentFormData.name) {
      const newDepartment: Department = {
        id: departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1,
        name: departmentFormData.name,
        hostCount: 0,
        status: departmentFormData.status
      };
      setDepartments(prev => [...prev, newDepartment]);
      closeModal();
    }
  }, [departmentFormData, departments]);

  const handleEditDepartmentSubmit = useCallback(() => {
    if (departmentFormData.name && modalData?.departmentId) {
      setDepartments(prev => prev.map(dept => 
        dept.id === modalData.departmentId 
          ? { ...dept, ...departmentFormData }
          : dept
      ));
      closeModal();
    }
  }, [departmentFormData, modalData?.departmentId]);

  const closeModal = useCallback(() => {
    setModalData(null);
    setFormData({ name: '', department: '', email: '', status: 'Active' });
    setDepartmentFormData({ name: '', status: 'Active' });
  }, []);

  const handleModalAction = useCallback(() => {
    if (!modalData) return;

    switch (modalData.type) {
      case 'add':
        handleAddHostSubmit();
        break;
      case 'edit':
        handleEditHostSubmit();
        break;
      case 'delete':
        handleDeleteHostSubmit();
        break;
      case 'addDepartment':
        handleAddDepartmentSubmit();
        break;
      case 'editDepartment':
        handleEditDepartmentSubmit();
        break;
    }
  }, [modalData, handleAddHostSubmit, handleEditHostSubmit, handleDeleteHostSubmit, handleAddDepartmentSubmit, handleEditDepartmentSubmit]);

  const renderModalContent = () => {
    if (!modalData) return null;

    switch (modalData.type) {
      case 'add':
      case 'edit':
        { const departmentsList = departments.map(d => d.name);
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                placeholder="e.g., John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData(prev => ({...prev, department: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
              >
                <option value="">Select Department</option>
                {departmentsList.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                placeholder="e.g., john.doe@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({...prev, status: e.target.value as 'Active' | 'Inactive'}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">
              * Required fields
            </p>
          </div>
        ); }

      case 'delete':
        { const host = modalData.hostId ? hosts.find(h => h.id === modalData.hostId) : null;
        if (!host) return null;
        
        return (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-red-800">{host.name}</h4>
                  <p className="text-sm text-red-600">{host.department} • {host.email}</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>This action cannot be undone. All visitor appointments with this host will need to be reassigned.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this host?
            </p>
          </div>
        ); }

      case 'addDepartment':
      case 'editDepartment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Name *
              </label>
              <input
                type="text"
                value={departmentFormData.name}
                onChange={(e) => setDepartmentFormData(prev => ({...prev, name: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                placeholder="e.g., Human Resources"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={departmentFormData.status}
                onChange={(e) => setDepartmentFormData(prev => ({...prev, status: e.target.value as 'Active' | 'Inactive'}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">
              * Required fields
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Get unique departments for filter
  const uniqueDepartments = Array.from(new Set(hosts.map(host => host.department)));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w- mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-[#1F3C88]">Host Management</h1>
          <p className="text-xs md:text-sm font-semibold text-[#4C63A0] mt-1">
            Manage hosts, departments, and view activity logs
          </p>
        </div>
         {/* Statistics Section */}
            <div className="bg-white rounded-2xl shadow p-6 mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Hosts</p>
                      <p className="text-xl font-semibold text-gray-800">{hosts.length}</p>
                    </div>
                  </div>
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Active Hosts</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {hosts.filter(h => h.status === 'Active').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 mr-3 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Inactive Hosts</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {hosts.filter(h => h.status === 'Inactive').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hosts Table Section */}
            <div className="bg-white rounded-2xl shadow">
              {/* Table Header with Search and Actions */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Hosts</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage all company hosts</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                    <button 
                      onClick={handleAddHost}
                      className="px-4 py-2.5 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors flex items-center"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Host
                    </button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search hosts..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                    />
                  </div>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                  >
                    <option value="all">All Departments</option>
                    {uniqueDepartments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Hosts Table */}
              <div className="p-6">
                <Table
                  tableData={filteredHosts}
                  columns={columns}
                  rowActions={rowActions}
                  showAction={true}
                  actionType="dropdown"
                  tableHeight="auto"
                  showPagination={true}
                  hideTableHeader={false}
                  totalPages={Math.ceil(filteredHosts.length / 10)}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Departments Section */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Departments</h2>
                <button 
                  onClick={handleAddDepartment}
                  className="px-3 py-1.5 text-sm bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors flex items-center"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </button>
              </div>
              
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div 
                    key={dept.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          <h3 className="font-medium text-gray-800">{dept.name}</h3>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            dept.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {dept.status}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{dept.hostCount} hosts</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleEditDepartment(dept)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           

            {/* Activity Log Button */}
            <button className="w-full p-4 bg-white rounded-2xl shadow hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-5 h-5 mr-3 text-[#1F3C88]" />
                <div className="text-left">
                  <h3 className="font-medium text-gray-800">Activity Log</h3>
                  <p className="text-sm text-gray-600">View recent activities</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal */}
        {modalData && (
          <Modal
            isOpen={!!modalData}
            onClose={closeModal}
            title={modalData.title}
            actionLabel={modalData.actionLabel}
            onAction={handleModalAction}
            actionType={modalData.actionType}
          >
            {renderModalContent()}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Hosts;