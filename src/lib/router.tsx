import { createHashRouter } from 'react-router-dom'
import { AppLayout }          from '@/components/AppLayout'
import { SplashPage }         from '@/pages/SplashPage'
import { OnboardingPage }     from '@/pages/OnboardingPage'
import { AuthPage }           from '@/pages/AuthPage'
import { HomePage }           from '@/pages/HomePage'
import { RestaurantPage }     from '@/pages/RestaurantPage'
import { RestaurantsPage }    from '@/pages/RestaurantsPage'
import { SearchPage }         from '@/pages/SearchPage'
import { ProfilePage }        from '@/pages/ProfilePage'
import { BookingsPage }       from '@/pages/BookingsPage'
import { NotificationsPage }  from '@/pages/NotificationsPage'

export const router = createHashRouter([
  // ── Auth flow ──────────────────────────────────────────────────────────────
  { path: '/splash',    element: <AppLayout><SplashPage /></AppLayout> },
  { path: '/onboard',   element: <AppLayout><OnboardingPage /></AppLayout> },
  { path: '/auth',      element: <AppLayout><AuthPage /></AppLayout> },

  // ── App ────────────────────────────────────────────────────────────────────
  { path: '/',                  element: <AppLayout><HomePage /></AppLayout> },
  { path: '/restaurants',       element: <AppLayout><RestaurantsPage /></AppLayout> },
  { path: '/restaurant/:id',    element: <AppLayout><RestaurantPage /></AppLayout> },
  { path: '/search',            element: <AppLayout><SearchPage /></AppLayout> },
  { path: '/bookings',          element: <AppLayout><BookingsPage /></AppLayout> },
  { path: '/profile',           element: <AppLayout><ProfilePage /></AppLayout> },
  { path: '/notifications',     element: <AppLayout><NotificationsPage /></AppLayout> },
])
