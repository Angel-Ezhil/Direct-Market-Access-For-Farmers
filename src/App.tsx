import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSelectionScreen } from './components/common/RoleSelectionScreen';
import { RoleLoginScreen } from './components/common/RoleLoginScreen';
import { RoleRegisterScreen } from './components/common/RoleRegisterScreen';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { CustomerApp } from './components/customer/CustomerApp';
import { DeliveryDashboard } from './components/delivery/DeliveryDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DemoWalkthroughBar } from './components/common/DemoWalkthroughBar';

const AppContent: React.FC = () => {
  const { authScreen, currentRole } = useApp();

  // 1. FIRST SCREEN MUST BE THE LOGIN / ROLE SELECTION PAGE
  if (authScreen === 'role-select' || !currentRole && authScreen !== 'app') {
    switch (authScreen) {
      case 'farmer-login':
        return <RoleLoginScreen role="farmer" />;
      case 'farmer-register':
        return <RoleRegisterScreen role="farmer" />;
      case 'customer-login':
        return <RoleLoginScreen role="customer" />;
      case 'customer-register':
        return <RoleRegisterScreen role="customer" />;
      case 'delivery-login':
        return <RoleLoginScreen role="delivery" />;
      case 'delivery-register':
        return <RoleRegisterScreen role="delivery" />;
      case 'admin-login':
        return <RoleLoginScreen role="admin" />;
      case 'role-select':
      default:
        return <RoleSelectionScreen />;
    }
  }

  // 2. DASHBOARDS BY ROLE (Strict isolation per requirements)
  return (
    <div className="min-h-screen relative font-sans antialiased">
      {currentRole === 'farmer' && <FarmerDashboard />}
      {currentRole === 'customer' && <CustomerApp />}
      {currentRole === 'delivery' && <DeliveryDashboard />}
      {currentRole === 'admin' && <AdminDashboard />}

      {/* Floating Demo Bar for easy persona switching & guided scenario testing */}
      <DemoWalkthroughBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
