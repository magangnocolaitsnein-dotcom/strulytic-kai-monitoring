/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IotProvider, useIot } from './context/IotContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { DeviceListPage } from './pages/DeviceListPage';
import { DeviceDetailPage } from './pages/DeviceDetailPage';
import { DeviceGroupPage } from './pages/DeviceGroupPage';
import { DeviceConfigPage } from './pages/DeviceConfigPage';
import { DeviceReportPage } from './pages/DeviceReportPage';
import { GeneralReportsPage } from './pages/GeneralReportsPage';
import { PredictivePage } from './pages/PredictivePage';
import { SettingsPage } from './pages/SettingsPage';
import { ProposalDemoPage } from './pages/ProposalDemoPage';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';

const MainLayout: React.FC = () => {
  const { isAuthenticated, currentPage } = useIot();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'devices':
        return <DeviceListPage />;
      case 'device-detail':
        return <DeviceDetailPage />;
      case 'device-group':
        return <DeviceGroupPage />;
      case 'device-config':
        return <DeviceConfigPage />;
      case 'device-reports':
        return <DeviceReportPage />;
      case 'reports':
        return <GeneralReportsPage />;
      case 'predictive':
        return <PredictivePage />;
      case 'settings':
        return <SettingsPage />;
      case 'proposal-demo':
        return <ProposalDemoPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-row antialiased selection:bg-[#0F4A8C] selection:text-white">
      {/* 280px Fixed Desktop Sidebar + Mobile Drawer */}
      <Sidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-6">
        {/* Sticky Header */}
        <Header />

        {/* Page View Container (16px gap Bento Box layout) */}
        <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile 5-tab Bottom Navigation (60px) */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <IotProvider>
      <MainLayout />
    </IotProvider>
  );
}
