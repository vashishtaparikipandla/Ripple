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
import { CartPage }           from '@/pages/CartPage'
import { EditProfilePage }    from '@/pages/EditProfilePage'
import { SupportPage }        from '@/pages/SupportPage'
import { MyReviewsPage }      from '@/pages/MyReviewsPage'
import { RateExperiencePage } from '@/pages/RateExperiencePage'
import { 
  FoodPreferencesPage, TransactionHistoryPage, SavedPlacesPage, 
  SharedDiscountsPage, NotificationSettingsPage, ThemeSettingsPage, 
  FeedbackPage, AboutPage 
} from '@/pages/ProfileSubPages'

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
  { path: '/cart',              element: <AppLayout><CartPage /></AppLayout> },
  { path: '/profile',           element: <AppLayout><ProfilePage /></AppLayout> },
  { path: '/profile/edit',      element: <AppLayout><EditProfilePage /></AppLayout> },
  { path: '/profile/reviews',   element: <AppLayout><MyReviewsPage /></AppLayout> },
  { path: '/profile/rate/:id',  element: <AppLayout><RateExperiencePage /></AppLayout> },
  { path: '/profile/preferences', element: <AppLayout><FoodPreferencesPage /></AppLayout> },
  { path: '/profile/transactions', element: <AppLayout><TransactionHistoryPage /></AppLayout> },
  { path: '/profile/saved',     element: <AppLayout><SavedPlacesPage /></AppLayout> },
  { path: '/profile/shared',    element: <AppLayout><SharedDiscountsPage /></AppLayout> },
  { path: '/profile/notifications', element: <AppLayout><NotificationSettingsPage /></AppLayout> },
  { path: '/profile/theme',     element: <AppLayout><ThemeSettingsPage /></AppLayout> },
  { path: '/profile/feedback',  element: <AppLayout><FeedbackPage /></AppLayout> },
  { path: '/profile/about',     element: <AppLayout><AboutPage /></AppLayout> },
  { path: '/support',           element: <AppLayout><SupportPage /></AppLayout> },
  { path: '/notifications',     element: <AppLayout><NotificationsPage /></AppLayout> },
])
