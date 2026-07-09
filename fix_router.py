import re

with open('src/lib/router.tsx', 'r') as f:
    router_ts = f.read()

imports = """import { TasteSetupPage }     from '@/pages/TasteSetupPage'
import { WelcomeTutorialPage } from '@/pages/WelcomeTutorialPage'
import { LocationPickerPage } from '@/pages/LocationPickerPage'
import { RippleStoryPage } from '@/pages/RippleStoryPage'"""
router_ts = router_ts.replace("import { TasteSetupPage }     from '@/pages/TasteSetupPage'", imports)

routes = """  { path: '/taste-setup',       element: <AppLayout><TasteSetupPage /></AppLayout> },
  { path: '/welcome',           element: <AppLayout><WelcomeTutorialPage /></AppLayout> },
  { path: '/location',          element: <AppLayout><LocationPickerPage /></AppLayout> },
  { path: '/story/:id',         element: <AppLayout><RippleStoryPage /></AppLayout> },"""
router_ts = router_ts.replace("  { path: '/taste-setup',       element: <AppLayout><TasteSetupPage /></AppLayout> },", routes)

with open('src/lib/router.tsx', 'w') as f:
    f.write(router_ts)
print("router fixed")
