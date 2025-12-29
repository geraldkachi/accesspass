import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './pages/login';
import Layout from './components/layout';
import Dashboard  from './pages/Dashboard/Dashboard';
import Visitor from './pages/Visitor/Visitor';
import Hosts from './pages/Hosts/Hosts';
import Messages from './pages/Messages/Messages';
import Reports from './pages/Reports/Reports';
import ResourceHub from './pages/ResourceHub/ResourceHub';
import Settings from './pages/Settings/Settings';
import Schedule from './pages/Schedule/Schedule';
import GeneralSetting from './pages/Settings/GeneralSetting';
import BadgePrinter from './pages/Settings/BadgePrinter';
import AccessControl from './pages/Settings/AccessControl';
import RolesPermission from './pages/Settings/RolesPermission';

const AppRoutes: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
      
      {/* Protected Routes with Layout */}
      <Route>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="visitor" element={<Visitor />} />
          <Route path="hosts" element={<Hosts />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="messages" element={<Messages />} />
          <Route path="reports" element={<Reports />} />
          <Route path="resource-hub" element={<ResourceHub />} />

          <Route path="visitor-Log" element={<ResourceHub />} />
          <Route path="resource-hub" element={<ResourceHub />} />
          <Route path="resource-hub" element={<ResourceHub />} />
          
          {/* Settings route with nested routes */}
          <Route path="settings" element={<Settings />}>
            {/* Nested routes will be rendered inside Settings component */}
            <Route index element={<Navigate to="general-setting" replace />} />
            <Route path="general-setting" element={<GeneralSetting />} />
            <Route path="badge-printer" element={<BadgePrinter />} />
            <Route path="access-control" element={<AccessControl />} />
            <Route path="roles-permission" element={<RolesPermission />} />
          </Route>
        </Route>
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;