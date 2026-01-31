import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppStore } from './store/AppStore';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Simulate } from './pages/Simulate';
import { Check } from './pages/Check';
import { Mark } from './pages/Mark';
import { Settings } from './pages/Settings';
import { Landing } from './pages/Landing';
import { Documentation } from './pages/Documentation';

// Guard component to redirect if wallet not connected
const RequireWallet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isWalletConnected } = useAppStore();
  
  if (!isWalletConnected) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/docs" element={<Documentation />} />

      {/* Protected App Routes */}
      <Route path="/app" element={
        <RequireWallet>
          <AppShell />
        </RequireWallet>
      }>
        <Route index element={<Dashboard />} />
        <Route path="simulate" element={<Simulate />} />
        <Route path="check" element={<Check />} />
        <Route path="mark" element={<Mark />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;