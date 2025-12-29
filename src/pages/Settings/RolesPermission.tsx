import React, { useState, useCallback } from 'react';
import { 
  Plus, 
  Edit2,
  Users,
  Shield,
  UserCheck,
  UserPlus
} from 'lucide-react';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal';

interface Role {
  id: number;
  name: string;
  description: string;
  members: number;
  icon: React.ReactNode;
}

interface ModalData {
  type: 'add' | 'edit' | 'delete';
  roleId?: number;
  title: string;
  actionLabel: string;
  actionType?: 'primary' | 'danger';
}

const RolesPermission = () => {
  const [roles, setRoles] = useState<Role[]>([
    { 
      id: 1, 
      name: 'Administrator', 
      description: 'Full access to all features & settings', 
      members: 10,
      icon: <Shield className="w-5 h-5 text-blue-600" />
    },
    { 
      id: 2, 
      name: 'Receptionist', 
      description: 'Manage visitors check-ins', 
      members: 5,
      icon: <UserCheck className="w-5 h-5 text-green-600" />
    },
    { 
      id: 3, 
      name: 'Staff', 
      description: 'Access to visitors and approvals', 
      members: 20,
      icon: <Users className="w-5 h-5 text-purple-600" />
    }
  ]);

  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '' 
  });

  // Define columns for the Table component
  const columns = [
    {
      header: 'ROLE',
      view: (row: Role) => (
        <div className="flex items-center">
          {row.icon}
          <span className="font-semibold text-gray-800 ml-3">{row.name}</span>
        </div>
      )
    },
    {
      header: 'DESCRIPTION',
      view: (row: Role) => (
        <span className="text-gray-600">{row.description}</span>
      )
    },
    {
      header: 'MEMBERS',
      view: (row: Role) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">{row.members}</span>
        </div>
      )
    },
    {
      header: 'ACTION',
      view: (row: Role) => (
        <button 
          onClick={() => handleEditClick(row)}
          className="px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors flex items-center"
        >
          <Edit2 className="w-3 h-3 mr-1" />
          Edit
        </button>
      )
    }
  ];

  const rowActions = (row: Role) => [
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
    setFormData({ name: '', description: '' });
    setModalData({
      type: 'add',
      title: 'Add New Role',
      actionLabel: 'Add Role',
      actionType: 'primary'
    });
  }, []);

  const handleEditClick = useCallback((role: Role) => {
    setFormData({ 
      name: role.name, 
      description: role.description 
    });
    setModalData({
      type: 'edit',
      roleId: role.id,
      title: 'Edit Role',
      actionLabel: 'Save Changes',
      actionType: 'primary'
    });
  }, []);

  const handleDeleteClick = useCallback((role: Role) => {
    setFormData({ 
      name: role.name, 
      description: role.description 
    });
    setModalData({
      type: 'delete',
      roleId: role.id,
      title: 'Delete Role',
      actionLabel: 'Delete Role',
      actionType: 'danger'
    });
  }, []);

  const handleAddRole = useCallback(() => {
    if (formData.name && formData.description) {
      const newRole: Role = {
        id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1,
        name: formData.name,
        description: formData.description,
        members: 0,
        icon: <UserPlus className="w-5 h-5 text-orange-600" />
      };
      setRoles(prev => [...prev, newRole]);
      closeModal();
    }
  }, [formData, roles]);

  const handleUpdateRole = useCallback(() => {
    if (formData.name && formData.description && modalData?.roleId) {
      setRoles(prev => prev.map(role => 
        role.id === modalData.roleId 
          ? { ...role, name: formData.name, description: formData.description }
          : role
      ));
      closeModal();
    }
  }, [formData, modalData?.roleId]);

  const handleDeleteRole = useCallback(() => {
    if (modalData?.roleId) {
      setRoles(prev => prev.filter(role => role.id !== modalData.roleId));
      closeModal();
    }
  }, [modalData?.roleId]);

  const closeModal = useCallback(() => {
    setModalData(null);
    setFormData({ name: '', description: '' });
  }, []);

  const handleModalAction = useCallback(() => {
    if (!modalData) return;

    switch (modalData.type) {
      case 'add':
        handleAddRole();
        break;
      case 'edit':
        handleUpdateRole();
        break;
      case 'delete':
        handleDeleteRole();
        break;
    }
  }, [modalData, handleAddRole, handleUpdateRole, handleDeleteRole]);

  // Get the role being edited/deleted
  const getSelectedRole = useCallback(() => {
    if (!modalData?.roleId) return null;
    return roles.find(role => role.id === modalData.roleId) || null;
  }, [modalData?.roleId, roles]);

  const renderModalContent = () => {
    if (!modalData) return null;

    switch (modalData.type) {
      case 'add':
      case 'edit':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                placeholder="e.g., Manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3C88] focus:border-transparent"
                placeholder="Describe the role's responsibilities"
                rows={3}
              />
            </div>
            {modalData.type === 'edit' && getSelectedRole() && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    <span className="font-medium">{getSelectedRole()?.members}</span> members have this role
                  </span>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500">
              * Required fields
            </p>
          </div>
        );

      case 'delete':
        { const role = getSelectedRole();
        if (!role) return null;
        
        return (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-3 text-red-600" />
                <div>
                  <h4 className="font-medium text-red-800">{role.name}</h4>
                  <p className="text-sm text-red-600">{role.description}</p>
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
                    <p>This action cannot be undone. All {role.members} members with this role will need to be reassigned.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this role?
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
          <h1 className="text-xl md:text-2xl font-semibold text-[#1F3C88]">
            Roles & Permissions
          </h1>
          <p className="text-xs md:text-sm font-semibold text-[#4C63A0] mt-1">
            Manage roles and permissions for your team members
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow">
          {/* Table Header with Add Button */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Roles</h2>
              <button
                onClick={handleAddClick}
                className="px-4 py-2.5 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </button>
            </div>
          </div>

          {/* Roles Table */}
          <div className="p-6">
            <Table
              tableData={roles}
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

export default RolesPermission;