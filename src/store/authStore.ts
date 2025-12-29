
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'admin' | 'staff';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions?: string[]; // Optional permissions array
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, userType?: 'admin' | 'staff') => Promise<void>;
  loginAsAdmin: (email: string, password: string) => Promise<void>;
  loginAsStaff: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  isAdmin: () => boolean;
  isStaff: () => boolean;
  hasPermission: (permission: string) => boolean;
}

// Mock user data with different permissions
const MOCK_USERS = {
  admin: [
    {
      id: 'admin-1',
      email: 'admin@example.com',
      password: 'AdminPass123!',
      name: 'System Administrator',
      role: 'admin' as UserRole,
      permissions: ['create_users', 'delete_users', 'view_reports', 'manage_settings']
    }
  ],
  staff: [
    {
      id: 'staff-1',
      email: 'staff@example.com',
      password: 'StaffPass123!',
      name: 'Regular Staff',
      role: 'staff' as UserRole,
      permissions: ['view_dashboard', 'create_orders']
    },
    {
      id: 'staff-2',
      email: 'manager@example.com',
      password: 'ManagerPass123!',
      name: 'Staff Manager',
      role: 'staff' as UserRole,
      permissions: ['view_dashboard', 'create_orders', 'approve_orders', 'view_reports']
    }
  ]
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Generic login method
      login: async (email: string, password: string, userType?: 'admin' | 'staff'): Promise<void> => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Search in all users
          const allUsers = [...MOCK_USERS.admin, ...MOCK_USERS.staff];
          const foundUser = allUsers.find(
            user => user.email === email && user.password === password
          );
          
          if (!foundUser) {
            throw new Error('Invalid credentials');
          }

          // If userType is specified, validate role
          if (userType && foundUser.role !== userType) {
            throw new Error(`Please use ${userType} login`);
          }
          
          const { password: _, ...userWithoutPassword } = foundUser;
          const mockToken = `mock-jwt-token-${foundUser.role}-${Date.now()}`;
          
          set({ 
            user: userWithoutPassword, 
            token: mockToken, 
            isLoading: false, 
            error: null 
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
          set({ 
            isLoading: false, 
            error: message, 
            user: null, 
            token: null 
          });
          throw error;
        }
      },

      // Admin-specific login
      loginAsAdmin: async (email: string, password: string): Promise<void> => {
        return get().login(email, password, 'admin');
      },

      // Staff-specific login
      loginAsStaff: async (email: string, password: string): Promise<void> => {
        return get().login(email, password, 'staff');
      },

      logout: (): void => {
        set({ 
          user: null, 
          token: null, 
          isLoading: false, 
          error: null 
        });
        localStorage.removeItem('auth-storage'); // Clear persisted state
        location.pathname = '/login'; // Redirect to login page
      },

      clearError: (): void => {
        set({ error: null });
      },

      isAdmin: (): boolean => {
        const { user } = get();
        return user?.role === 'admin';
      },

      isStaff: (): boolean => {
        const { user } = get();
        return user?.role === 'staff';
      },

      hasPermission: (permission: string): boolean => {
        const { user } = get();
        return user?.permissions?.includes(permission) || false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
);

// Example usage in components:
/*
// Login as admin
const handleAdminLogin = async () => {
  try {
    await useAuthStore.getState().loginAsAdmin('admin@example.com', 'AdminPass123!');
  } catch (error) {
    console.error('Admin login failed:', error);
  }
};

// Login as staff
const handleStaffLogin = async () => {
  try {
    await useAuthStore.getState().loginAsStaff('staff@example.com', 'StaffPass123!');
  } catch (error) {
    console.error('Staff login failed:', error);
  }
};

// Check permissions
const canViewReports = useAuthStore(state => state.hasPermission('view_reports'));
*/


///////////////////////////////////////////////////////////////////////////////////////////////////

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// // Define user roles
// type UserRole = 'admin' | 'staff';

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: UserRole;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isLoading: boolean;
//   error: string | null;
//   login: (email: string, password: string, userType?: 'admin' | 'staff') => Promise<void>;
//   logout: () => void;
//   clearError: () => void;
//   isAdmin: () => boolean;
//   isStaff: () => boolean;
// }

// // Mock user data for both admin and staff
// const MOCK_USERS = [
//   {
//     id: '1',
//     email: 'admin@example.com',
//     password: 'AdminPass123!',
//     name: 'Admin User',
//     role: 'admin' as UserRole,
//   },
//   {
//     id: '2',
//     email: 'staff@example.com',
//     password: 'StaffPass123!',
//     name: 'Staff User',
//     role: 'staff' as UserRole,
//   },
//   {
//     id: '3',
//     email: 'john@example.com',
//     password: 'StaffPass123!',
//     name: 'John Doe',
//     role: 'staff' as UserRole,
//   },
// ];

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       isLoading: false,
//       error: null,

//       login: async (email: string, password: string): Promise<void> => {
//         set({ isLoading: true, error: null });
        
//         try {
//           // Mock API call with 500ms delay
//           await new Promise(resolve => setTimeout(resolve, 500));
          
//           // Find user in mock data
//           const foundUser = MOCK_USERS.find(
//             user => user.email === email && user.password === password
//           );
          
//           if (foundUser) {
//             const { password: _, ...userWithoutPassword } = foundUser;
//             const mockToken = `mock-jwt-token-${foundUser.role}-${Date.now()}`;
            
//             set({ 
//               user: userWithoutPassword, 
//               token: mockToken, 
//               isLoading: false, 
//               error: null 
//             });
//           } else {
//             throw new Error('Invalid email or password');
//           }
//         } catch (error) {
//           const message = error instanceof Error ? error.message : 'Login failed';
//           set({ 
//             isLoading: false, 
//             error: message, 
//             user: null, 
//             token: null 
//           });
//           throw error;
//         }
//       },

//       logout: (): void => {
//         set({ 
//           user: null, 
//           token: null, 
//           isLoading: false, 
//           error: null 
//         });
//       },

//       clearError: (): void => {
//         set({ error: null });
//       },

//       // Helper methods to check user role
//       isAdmin: (): boolean => {
//         const { user } = get();
//         return user?.role === 'admin';
//       },

//       isStaff: (): boolean => {
//         const { user } = get();
//         return user?.role === 'staff';
//       },
//     }),
//     {
//       name: 'auth-storage',
//       partialize: (state) => ({ 
//         user: state.user, 
//         token: state.token 
//       }),
//     }
//   )
// );
