/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import TextInput from './Input';
// import TextInput from './TextInput'; // Adjust import path as needed

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
        // @ts-ignore
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

  const getFieldError = (field: keyof LoginFormData): string => {
    return touched[field] ? errors[field] || '' : '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <TextInput
              id="email"
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('email')}
              placeholder="Email address"
              extraClassnames="rounded-t-md"
            />
            
            <TextInput
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('password')}
              placeholder="Password"
              extraClassnames="rounded-b-md"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>Email: admin@example.com</p>
            <p>Password: Password1!</p>
          </div>
        </form>
      </div>
    </div>
  );
};