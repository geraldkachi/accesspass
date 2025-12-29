import React, { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { 
  Edit2, 
  Camera, 
  User, 
  Save, 
  X, 
  Upload, 
  Image as ImageIcon,
  Eye,
  EyeOff
} from 'lucide-react';

// Define types for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  companyName: string;
  position: string;
  department: string;
  location: string;
  website: string;
  bio: string;
}

// Define types for errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  website?: string;
  image?: string;
  [key: string]: string | undefined;
}

const GeneralSetting: React.FC = () => {
  // State management with TypeScript
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: 'Benson',
    lastName: 'Okanla',
    email: 'benstanwa@gmail.com',
    phone: '09076543287',
    password: '',
    companyName: 'TechCorp Solutions',
    position: 'Software Engineer',
    department: 'Engineering',
    location: 'Lagos, Nigeria',
    website: 'www.techcorp.com',
    bio: 'Experienced software engineer with a passion for creating innovative solutions.'
  });
  
  const [modalData, setModalData] = useState<FormData>({ ...formData });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Ref for file input with proper type
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open modal and copy current data
  const openEditModal = (): void => {
    setModalData({ ...formData });
    setPreviewImage(profileImage);
    setErrors({});
    setIsEditModalOpen(true);
  };

  // Close modal
  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setPreviewImage(null);
    setErrors({});
  };

  // Handle input changes in modal with proper typing
  const handleModalInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setModalData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle profile image upload with proper typing
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: 'Please upload a valid image (JPEG, PNG, GIF, WebP)' }));
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setIsUploading(false);
        setErrors(prev => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(file);
    }, 800);
  };

  // Trigger file input click with proper typing
  const triggerFileInput = (): void => {
    fileInputRef.current?.click();
  };

  // Remove profile image
  const removeProfileImage = (): void => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validate form with proper typing
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!modalData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!modalData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!modalData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!modalData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s]+$/.test(modalData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    // Password validation (only if password is being changed)
    if (modalData.password && modalData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (modalData.website && !/^https?:\/\/.+\..+/.test(modalData.website) && !modalData.website.startsWith('www.')) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save changes with proper typing
  const handleSave = (e?: FormEvent): void => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;

    // Simulate API call
    setIsUploading(true);
    
    setTimeout(() => {
      // Update main form data
      setFormData({ ...modalData });
      
      // Update profile image if changed
      if (previewImage) {
        setProfileImage(previewImage);
      }
      
      // Clear password field for security
      setModalData(prev => ({ ...prev, password: '' }));
      
      setIsUploading(false);
      closeEditModal();
      
      // Show success message
      alert('Profile updated successfully!');
    }, 1000);
  };

  // Toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEditModalOpen]);

  // Handle click outside modal to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      closeEditModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-[#1F3C88]">Company Profile</h1>
            <p className="text-xs md:text-sm font-semibold text-[#4C63A0] mt-1">
              Complete your company profile to personalize visitor's experience
            </p>
          </div>
          
          <button 
            onClick={openEditModal}
            className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 md:px-6 md:py-3 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors font-medium text-sm md:text-base"
          >
            <Edit2 className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 md:gap-6 lg:gap-8">
          {/* Left Card - Personal Information (Read-only view) */}
          <div className='lg:col-span-5 rounded-2xl lg:rounded-3xl bg-white p-4 md:p-6 lg:p-8 shadow'>
            <div className="hidden md:block border-t border-gray-300 my-6 lg:my-8"></div>

            <div className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">First Name</label>
                  <div className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm md:text-base text-gray-900">{formData.firstName}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Last Name</label>
                  <div className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm md:text-base text-gray-900">{formData.lastName}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Email Address</label>
                  <div className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm md:text-base text-gray-900">{formData.email}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Phone Number</label>
                  <div className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm md:text-base text-gray-900">{formData.phone}</span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Company Name</label>
                  <div className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm md:text-base text-gray-900">{formData.companyName}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Position</label>
                  <div className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm md:text-base text-gray-900">{formData.position}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Department</label>
                  <div className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm md:text-base text-gray-900">{formData.department}</span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Location</label>
                  <div className="p-2 md:p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm md:text-base text-gray-900">{formData.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Profile Photo (Read-only view) */}
          <div className='lg:col-span-3 rounded-2xl lg:rounded-3xl bg-white p-4 md:p-6 lg:p-8 shadow mt-4 md:mt-0'>
            <div className="hidden md:block border-t border-gray-300 my-6 lg:my-8"></div>

            <div className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6">Profile Photo</h2>

              <div className="flex flex-col items-center space-y-4 md:space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-600 mt-1 text-center max-w-xs">
                    Click "Edit Profile" to change your profile picture
                  </p>
                </div>
              </div>
            </div>

            <div className="block md:hidden border-t border-gray-300 my-6"></div>

            {/* Company Information Summary */}
            <div className="mt-8">
              <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-4">Company Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-gray-600">Company ID:</span>
                  <span className="text-xs md:text-sm font-medium text-gray-800">TECH-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-gray-600">Member Since:</span>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Jan 15, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-gray-600">Last Updated:</span>
                  <span className="text-xs md:text-sm font-medium text-gray-800">Today</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-gray-600">Account Status:</span>
                  <span className="text-xs md:text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          {/* <div className="fixed inset-0 bg-black/50 transition-opacity" /> */}
          
          {/* Modal Container */}
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Modal Panel */}
            <div 
              className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-black text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Edit2 className="w-5 h-5 mr-3" />
                    <h3 className="text-lg font-semibold">Edit Profile Information</h3>
                  </div>
                  <button
                    onClick={closeEditModal}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  Update your personal and company information
                </p>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSave}>
                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Profile Image */}
                    <div className="lg:col-span-1">
                      <div className="sticky top-4">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
                            <Camera className="w-4 h-4 mr-2" />
                            Profile Picture
                          </h4>
                          
                          {/* Image Preview Area */}
                          <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                                {previewImage ? (
                                  <img 
                                    src={previewImage} 
                                    alt="Profile preview" 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <User className="w-16 h-16 text-gray-400" />
                                )}
                              </div>
                              
                              {/* Upload Progress */}
                              {isUploading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                              )}
                            </div>
                            
                            {/* Upload Controls */}
                            <div className="space-y-3 w-full">
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                              />
                              
                              <button
                                type="button"
                                onClick={triggerFileInput}
                                disabled={isUploading}
                                className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-[#1F3C88] rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                {isUploading ? 'Uploading...' : 'Upload New Image'}
                              </button>
                              
                              {previewImage && (
                                <button
                                  type="button"
                                  onClick={removeProfileImage}
                                  className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Remove Image
                                </button>
                              )}
                            </div>
                            
                            {/* Image Requirements */}
                            <div className="text-xs text-gray-500 text-center space-y-1">
                              <p className="flex items-center justify-center">
                                <ImageIcon className="w-3 h-3 mr-1" />
                                Supported: JPG, PNG, GIF, WebP
                              </p>
                              <p>Max size: 5MB</p>
                              <p>Recommended: 200×200px</p>
                            </div>
                            
                            {/* Error Message */}
                            {errors.image && (
                              <p className="text-red-500 text-xs text-center">{errors.image}</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <h5 className="text-xs font-semibold text-gray-700 mb-2">Profile Status</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-600">Profile Completeness:</span>
                              <span className="text-xs font-medium text-green-600">85%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Column - Form Fields */}
                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        {/* Personal Information */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 mb-4">Personal Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                First Name *
                                {errors.firstName && (
                                  <span className="text-red-500 text-xs ml-1">({errors.firstName})</span>
                                )}
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={modalData.firstName}
                                onChange={handleModalInputChange}
                                className={`w-full p-3 rounded-lg border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]`}
                              />
                            </div>
                            
                            {/* Last Name */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Last Name *
                                {errors.lastName && (
                                  <span className="text-red-500 text-xs ml-1">({errors.lastName})</span>
                                )}
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={modalData.lastName}
                                onChange={handleModalInputChange}
                                className={`w-full p-3 rounded-lg border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]`}
                              />
                            </div>
                            
                            {/* Email */}
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Email Address *
                                {errors.email && (
                                  <span className="text-red-500 text-xs ml-1">({errors.email})</span>
                                )}
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={modalData.email}
                                onChange={handleModalInputChange}
                                className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]`}
                              />
                            </div>
                            
                            {/* Phone */}
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Phone Number *
                                {errors.phone && (
                                  <span className="text-red-500 text-xs ml-1">({errors.phone})</span>
                                )}
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={modalData.phone}
                                onChange={handleModalInputChange}
                                className={`w-full p-3 rounded-lg border ${errors.phone ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]`}
                              />
                            </div>
                            
                            {/* Password */}
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Change Password
                                {errors.password && (
                                  <span className="text-red-500 text-xs ml-1">({errors.password})</span>
                                )}
                              </label>
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  value={modalData.password}
                                  onChange={handleModalInputChange}
                                  placeholder="Leave blank to keep current password"
                                  className={`w-full p-3 pr-10 rounded-lg border ${errors.password ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]`}
                                />
                                <button
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Company Information */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 mb-4">Company Information</h4>
                          <div className="space-y-4">
                            {/* Company Name */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
                              <input
                                type="text"
                                name="companyName"
                                value={modalData.companyName}
                                onChange={handleModalInputChange}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]"
                              />
                            </div>
                            
                            {/* Position & Department */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
                                <input
                                  type="text"
                                  name="position"
                                  value={modalData.position}
                                  onChange={handleModalInputChange}
                                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                                <input
                                  type="text"
                                  name="department"
                                  value={modalData.department}
                                  onChange={handleModalInputChange}
                                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]"
                                />
                              </div>
                            </div>
                            
                            {/* Location */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                              <input
                                type="text"
                                name="location"
                                value={modalData.location}
                                onChange={handleModalInputChange}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]"
                              />
                            </div>
                            
                            {/* Website */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Website
                                {errors.website && (
                                  <span className="text-red-500 text-xs ml-1">({errors.website})</span>
                                )}
                              </label>
                              <input
                                type="url"
                                name="website"
                                value={modalData.website}
                                onChange={handleModalInputChange}
                                placeholder="https://www.example.com"
                                className={`w-full p-3 rounded-lg border ${errors.website ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88]`}
                              />
                            </div>
                            
                            {/* Bio */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Bio</label>
                              <textarea
                                name="bio"
                                value={modalData.bio}
                                onChange={handleModalInputChange}
                                rows={3}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1F3C88] resize-none"
                                placeholder="Tell us about yourself..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                    <div className="text-xs text-gray-500">
                      Fields marked with * are required
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={closeEditModal}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="px-6 py-2 bg-[#1F3C88] text-white rounded-lg hover:bg-[#172b66] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSetting;