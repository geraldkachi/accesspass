import { useState, useCallback } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Link, 
  Building,
  DoorOpen,
  Plus,
  Wifi,
  Lock,
//   Globe,
//   MapPin
} from 'lucide-react';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal';

interface AccessPoint {
  id: number;
  name: string;
  location: string;
  status: 'Active' | 'Inactive';
  integration: 'Integrated' | 'Not integrated';
  type?: string;
  ipAddress?: string;
}

interface ModalData {
  type: 'add' | 'edit' | 'delete';
  accessPointId?: number;
  title: string;
  actionLabel: string;
  actionType?: 'primary' | 'danger';
}

const AccessControl = () => {
  const [hardwareProvider, setHardwareProvider] = useState('');
  const [enableIntegration, setEnableIntegration] = useState(true);
  const [apiKey, setApiKey] = useState('***************');
  
  const [accessPoints, setAccessPoints] = useState<AccessPoint[]>([
    { id: 1, name: 'Front Door', location: 'Main Floor', status: 'Active', integration: 'Integrated', type: 'Door', ipAddress: '192.168.1.101' },
    { id: 2, name: 'Back Door', location: 'Warehouse', status: 'Active', integration: 'Integrated', type: 'Door', ipAddress: '192.168.1.102' },
    { id: 3, name: 'Side Gate', location: 'Parking Area', status: 'Inactive', integration: 'Not integrated', type: 'Gate', ipAddress: '192.168.1.103' }
  ]);

  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Door',
    ipAddress: '',
    status: 'Active' as 'Active' | 'Inactive',
    integration: 'Integrated' as 'Integrated' | 'Not integrated'
  });

  // Define columns for the Table component
  const columns = [
    {
      header: 'NAME',
      view: (row: AccessPoint) => (
        <div className="flex items-center">
          {row.type === 'Door' ? (
            <DoorOpen className="w-4 h-4 mr-3 text-blue-500" />
          ) : row.type === 'Gate' ? (
            <Lock className="w-4 h-4 mr-3 text-green-500" />
          ) : (
            <Wifi className="w-4 h-4 mr-3 text-purple-500" />
          )}
          <div>
            <span className="font-medium text-gray-800 block">{row.name}</span>
            {row.ipAddress && (
              <span className="text-xs text-gray-500">{row.ipAddress}</span>
            )}
          </div>
        </div>
      )
    },
    {
      header: 'LOCATION',
      view: (row: AccessPoint) => (
        <div className="flex items-center">
          <Building className="w-4 h-4 mr-3 text-gray-500" />
          <span>{row.location}</span>
        </div>
      )
    },
    {
      header: 'STATUS',
      view: (row: AccessPoint) => (
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
      header: 'INTEGRATION',
      view: (row: AccessPoint) => (
        <div className="flex items-center">
          {row.integration === 'Integrated' ? (
            <>
              <Link className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-blue-600 font-medium">{row.integration}</span>
            </>
          ) : (
            <>
              <Link className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-gray-600 font-medium">{row.integration}</span>
            </>
          )}
        </div>
      )
    },
    {
      header: 'ACTIONS',
      view: (row: AccessPoint) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick(row);
          }}
          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          Manage
        </button>
      )
    }
  ];

  const rowActions = (row: AccessPoint) => [
    {
      name: 'view',
      action: () => console.log('View', row.name)
    },
    {
      name: 'edit',
      action: () => handleEditClick(row)
    },
    {
      name: 'delete',
      action: () => handleDeleteClick(row)
    }
  ];

  const handleAddClick = useCallback(() => {
    setFormData({
      name: '',
      location: '',
      type: 'Door',
      ipAddress: '',
      status: 'Active',
      integration: 'Integrated'
    });
    setModalData({
      type: 'add',
      title: 'Add New Access Point',
      actionLabel: 'Add Access Point',
      actionType: 'primary'
    });
  }, []);

  const handleEditClick = useCallback((accessPoint: AccessPoint) => {
    setFormData({
      name: accessPoint.name,
      location: accessPoint.location,
      type: accessPoint.type || 'Door',
      ipAddress: accessPoint.ipAddress || '',
      status: accessPoint.status,
      integration: accessPoint.integration
    });
    setModalData({
      type: 'edit',
      accessPointId: accessPoint.id,
      title: 'Edit Access Point',
      actionLabel: 'Save Changes',
      actionType: 'primary'
    });
  }, []);

  const handleDeleteClick = useCallback((accessPoint: AccessPoint) => {
    setFormData({
      name: accessPoint.name,
      location: accessPoint.location,
      type: accessPoint.type || 'Door',
      ipAddress: accessPoint.ipAddress || '',
      status: accessPoint.status,
      integration: accessPoint.integration
    });
    setModalData({
      type: 'delete',
      accessPointId: accessPoint.id,
      title: 'Delete Access Point',
      actionLabel: 'Delete',
      actionType: 'danger'
    });
  }, []);

  const handleAddAccessPoint = useCallback(() => {
    if (formData.name && formData.location) {
      const newAccessPoint: AccessPoint = {
        id: accessPoints.length > 0 ? Math.max(...accessPoints.map(ap => ap.id)) + 1 : 1,
        name: formData.name,
        location: formData.location,
        type: formData.type,
        ipAddress: formData.ipAddress,
        status: formData.status,
        integration: formData.integration
      };
      setAccessPoints(prev => [...prev, newAccessPoint]);
      closeModal();
    }
  }, [formData, accessPoints]);

  const handleUpdateAccessPoint = useCallback(() => {
    if (formData.name && formData.location && modalData?.accessPointId) {
      setAccessPoints(prev => prev.map(ap => 
        ap.id === modalData.accessPointId 
          ? { 
              ...ap, 
              name: formData.name,
              location: formData.location,
              type: formData.type,
              ipAddress: formData.ipAddress,
              status: formData.status,
              integration: formData.integration
            }
          : ap
      ));
      closeModal();
    }
  }, [formData, modalData?.accessPointId]);

  const handleDeleteAccessPoint = useCallback(() => {
    if (modalData?.accessPointId) {
      setAccessPoints(prev => prev.filter(ap => ap.id !== modalData.accessPointId));
      closeModal();
    }
  }, [modalData?.accessPointId]);

  const closeModal = useCallback(() => {
    setModalData(null);
    setFormData({
      name: '',
      location: '',
      type: 'Door',
      ipAddress: '',
      status: 'Active',
      integration: 'Integrated'
    });
  }, []);

  const handleModalAction = useCallback(() => {
    if (!modalData) return;

    switch (modalData.type) {
      case 'add':
        handleAddAccessPoint();
        break;
      case 'edit':
        handleUpdateAccessPoint();
        break;
      case 'delete':
        handleDeleteAccessPoint();
        break;
    }
  }, [modalData, handleAddAccessPoint, handleUpdateAccessPoint, handleDeleteAccessPoint]);

  const getSelectedAccessPoint = useCallback(() => {
    if (!modalData?.accessPointId) return null;
    return accessPoints.find(ap => ap.id === modalData.accessPointId) || null;
  }, [modalData?.accessPointId, accessPoints]);

  const renderModalContent = () => {
    if (!modalData) return null;

    switch (modalData.type) {
      case 'add':
      case 'edit':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Point Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                  placeholder="e.g., Front Door"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                  placeholder="e.g., Main Floor"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                >
                  <option value="Door">Door</option>
                  <option value="Gate">Gate</option>
                  <option value="Turnstile">Turnstile</option>
                  <option value="Elevator">Elevator</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IP Address
                </label>
                <input
                  type="text"
                  value={formData.ipAddress}
                  onChange={(e) => setFormData(prev => ({...prev, ipAddress: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                  placeholder="e.g., 192.168.1.100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Integration
                </label>
                <select
                  value={formData.integration}
                  onChange={(e) => setFormData(prev => ({...prev, integration: e.target.value as 'Integrated' | 'Not integrated'}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                >
                  <option value="Integrated">Integrated</option>
                  <option value="Not integrated">Not integrated</option>
                </select>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              * Required fields
            </p>
          </div>
        );

      case 'delete':
        { const accessPoint = getSelectedAccessPoint();
        if (!accessPoint) return null;
        
        return (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                {accessPoint.type === 'Door' ? (
                  <DoorOpen className="w-5 h-5 mr-3 text-red-600" />
                ) : accessPoint.type === 'Gate' ? (
                  <Lock className="w-5 h-5 mr-3 text-red-600" />
                ) : (
                  <Wifi className="w-5 h-5 mr-3 text-red-600" />
                )}
                <div>
                  <h4 className="font-medium text-red-800">{accessPoint.name}</h4>
                  <p className="text-sm text-red-600">{accessPoint.location}</p>
                  {accessPoint.ipAddress && (
                    <p className="text-sm text-red-600">{accessPoint.ipAddress}</p>
                  )}
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
                    <p>This action cannot be undone. This access point will be removed from the system.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this access point?
            </p>
          </div>
        ); }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-[#1F3C88]">Access Control</h1>
          <p className="text-xs md:text-sm font-semibold text-[#4C63A0] mt-1">
            Manage access points and integration with your hardware
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Left Column - Access Points Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Access Points</h2>
                <button 
                  onClick={handleAddClick}
                  className="px-6 py-2.5 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Access Point
                </button>
              </div>
              
              {/* Table Component */}
              <div className="bg-white rounded-lg">
                <Table
                  tableData={accessPoints}
                  columns={columns}
                  rowActions={rowActions}
                  showAction={true}
                  actionType="dropdown"
                  tableHeight="auto"
                  showPagination={false}
                  hideTableHeader={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Integration Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Integration Settings</h2>
              
              <div className="space-y-6">
                {/* Hardware Provider */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hardware Provider
                  </label>
                  <select
                    value={hardwareProvider}
                    onChange={(e) => setHardwareProvider(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                  >
                    <option value="">Select a provider</option>
                    <option value="acme">ACME Security</option>
                    <option value="securetech">SecureTech Systems</option>
                    <option value="bosch">Bosch Security</option>
                    <option value="honeywell">Honeywell</option>
                  </select>
                </div>

                {/* Enable Integration */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">Enable Integration</h3>
                      <p className="text-sm text-gray-600">Sync visitor data with your access control hardware</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableIntegration}
                        onChange={(e) => setEnableIntegration(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1F3C88]"></div>
                    </label>
                  </div>
                </div>

                {/* API Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                      placeholder="Enter API key"
                    />
                    <button 
                      onClick={() => setApiKey('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-[#1F3C88] hover:text-[#172b66]"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <button className="w-max px-4 py-3 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] font-medium">
                  Save Changes
                </button>
              </div>
            </div>
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

export default AccessControl;