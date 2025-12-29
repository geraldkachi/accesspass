/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { EmailInput, PasswordInput } from '../../components/Input';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type FieldErrors = Partial<Record<keyof LoginFormData, string>>;

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LoginFormData, boolean>>>({});

  // Clear errors when form changes
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData.email, formData.password]);

  const validateField = (name: keyof LoginFormData, value: string): string => {
    try {
      if (name === 'email') {
        loginSchema.pick({ email: true }).parse({ email: value });
      } else if (name === 'password') {
        loginSchema.pick({ password: true }).parse({ password: value });
      }
      return '';
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        //@ts-ignore
        return validationError.errors[0]?.message || 'Invalid value';
      }
      return 'Invalid value';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const fieldError = validateField(name as keyof LoginFormData, value);
    if (fieldError) {
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FieldErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof LoginFormData, formData[key as keyof LoginFormData]);
      if (error) {
        newErrors[key as keyof LoginFormData] = error;
      }
    });

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(newErrors).length === 0) {
      try {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } catch (submitError) {
        // Error is handled by auth store
        console.error('Login error:', submitError);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo at the top right */}
      <div className="flex justify-start pt-6 pl-6">
        <img src="/access-pass.svg" alt="AccessPass Logo" className="h-8" />
      </div>

      {/* Main content centered */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[400px] md:w-400px w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <h6 className="mt-6 text-center text-[23px] font-semibold text-[#1F3C88]">
                Sign in to your account
              </h6>
              <p className='text-[10px] font-normal text-[#4C63A0] mt-2'>
                Enter your details to log in to your dashboard
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Email Input using the reusable component */}
                <EmailInput
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  placeholder="Enter your email"
                  extraClassnames="placeholder:text-sm"
                  containerClassName="space-y-1"
                  labelClassName="block text-xs font-medium text-[#4C63A0] mb-1"
                  inputClassName="pl" // Adjust padding to match your design
                />
                
                {/* Password Input using the reusable component */}
                <PasswordInput
                  id="password"
                  name="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  placeholder="Enter your password"
                  extraClassnames="placeholder:text-sm"
                  containerClassName="space-y-1"
                  labelClassName="block text-xs font-medium text-[#4C63A0] mb-1"
                  inputClassName="pl-" // Adjust padding to match your design
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Optional: Add remember me checkbox here */}
                </div>
                <a href="#" className="text-[#1F3C88] hover:text-[#4C63A0] text-sm transition-colors">
                  Forgot Password?
                </a>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              )}

               {/* <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Demo credentials:</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Email: <span className="font-mono">admin@example.com</span></p>
                  <p>Password: <span className="font-mono">Password1!</span></p>
                </div>
              </div>
            </div> */}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#1F3C88] group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white hover:bg-[#172B69] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F3C88] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : (
                    'Log in'
                  )}
                </button>
              </div>
            </form>
          </div>

          
        </div>
      </div>

      {/* Footer with social icons - at the bottom of the form */}
          <div className="flex items-center justify-between py-6 px-3">
            {/* Social Media Icons with Circular Background */}
            <div className="flex items-center space-x-2">
              {[
                { 
                  name: 'twitter',
                  href: '#',
                  color: 'hover:bg-black hover:text-white',
                  icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                },
                { 
                  name: 'linkedin',
                  href: '#',
                  color: 'hover:bg-[#0077B5] hover:text-white',
                  icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                },
                { 
                  name: 'facebook',
                  href: '#',
                  color: 'hover:bg-[#1659E6] hover:text-white',
                  icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 bg-gray-100 ${social.color} transition-all duration-200`}
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>

            {/* Powered by AccessPass */}
            <div className="text-sm text-gray-500">
              Powered by <span className="font-semibold text-[#1659E6]">AccessPass</span>
            </div>
          </div>
    </div>
  );
};