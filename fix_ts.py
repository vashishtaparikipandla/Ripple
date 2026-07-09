import re

def fix(file, old, new):
    with open(file, 'r') as f:
        c = f.read()
    with open(file, 'w') as f:
        f.write(c.replace(old, new))

fix('src/pages/LocationPickerPage.tsx', "import { motion } from 'framer-motion'\n", "")
fix('src/pages/RippleStoryPage.tsx', "import { motion } from 'framer-motion'\n", "")
fix('src/pages/RippleStoryPage.tsx', "const BRAND = '#E8431A'\n", "")
fix('src/pages/RippleStoryPage.tsx', "const { id } = useParams()", "const {} = useParams()")
fix('src/pages/WelcomeTutorialPage.tsx', "Droplets, ChevronRight, Gift", "Droplets, Gift")

print("fixed")
