import { createHashRouter, Navigate } from 'react-router-dom'
import SplashPage from '@/pages/SplashPage'
import OnboardingPage from '@/pages/OnboardingPage'
import DashboardLayout from '@/layouts/DashboardLayout'
import HomePage from '@/pages/HomePage'
import LoyaltyBuilderPage from '@/pages/LoyaltyBuilderPage'
import OffersPage from '@/pages/OffersPage'
import CustomersPage from '@/pages/CustomersPage'
import CommunityPage from '@/pages/CommunityPage'
import SettingsPage from '@/pages/SettingsPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <SplashPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard/home" replace /> },
      { path: 'home', element: <HomePage /> },
      { path: 'loyalty', element: <LoyaltyBuilderPage /> },
      { path: 'offers', element: <OffersPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
