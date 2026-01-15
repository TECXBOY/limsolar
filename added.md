LIMSOLAR COMPLETE WEBSITE - ENGINEERING SPECIFICATION PROMPT
(WITH GITHUB AUTO-SAVE & VERCEL DEPLOYMENT)
Project Overview
Build a professional, multi-page solar energy company website for Lim Solar with authentication, service application system, and client dashboard. The site positions Lim Solar as a systems-driven energy partner for institutional clients.
DEPLOYMENT PIPELINE:

Code automatically saved to GitHub repository
Deployed on Vercel with continuous deployment
Environment variables configured in Vercel dashboard


TECHNICAL STACK
Core Technologies

Framework: React with React Router for multi-page navigation
Build Tool: Vite
Styling: Tailwind CSS (utility classes only - no custom config needed)
Backend/Database: Supabase (Authentication + PostgreSQL database)
Icons: Lucide React
State Management: React Context API for auth state
Form Handling: Controlled components with validation
Version Control: GitHub (with automatic commits)
Hosting: Vercel (with automatic deployments)

Required Supabase Setup
You must create a Supabase project and set up the following:
Environment Variables Needed:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

GITHUB SETUP & AUTO-SAVE CONFIGURATION
Step 1: Create GitHub Repository
bash# Initialize git repository
git init

# Create .gitignore file
cat > .gitignore << EOF
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Misc
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Vercel
.vercel
EOF

# Create README
cat > README.md << EOF
# Lim Solar - Professional Solar Energy Systems

Professional solar energy website for institutional clients.

## Tech Stack
- React + Vite
- Tailwind CSS
- Supabase (Auth + Database)
- Vercel (Hosting)

## Setup
1. Clone repository
2. Run \`npm install\`
3. Create \`.env\` file with Supabase credentials
4. Run \`npm run dev\`

## Environment Variables
\`\`\`
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
\`\`\`
EOF

# Initial commit
git add .
git commit -m "Initial commit: Lim Solar website setup"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/limsolar-website.git

# Push to GitHub
git branch -M main
git push -u origin main
Step 2: Auto-Save Script Configuration
Create a script that automatically commits and pushes changes:
Option A: Manual Auto-Save Script
Create auto-save.sh in project root:
bash#!/bin/bash

# Auto-save script for Lim Solar project
# Usage: ./auto-save.sh "Your commit message"

MESSAGE=${1:-"Auto-save: Updates $(date '+%Y-%m-%d %H:%M:%S')"}

echo "🔄 Auto-saving to GitHub..."

# Add all changes
git add .

# Commit with message
git commit -m "$MESSAGE"

# Push to GitHub
git push origin main

echo "✅ Changes saved to GitHub successfully!"
Make it executable:
bashchmod +x auto-save.sh
Usage:
bash# With custom message
./auto-save.sh "Added dashboard functionality"

# With automatic timestamp message
./auto-save.sh
Option B: NPM Script for Auto-Save
Add to package.json:
json{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "save": "git add . && git commit -m \"Auto-save: $(date)\" && git push origin main",
    "save:msg": "git add . && git commit -m"
  }
}
Usage:
bash# Auto-save with timestamp
npm run save

# Save with custom message
npm run save:msg "Added new feature" && git push origin main
Option C: VS Code Auto-Save Extension
Install "Git Auto Commit" extension in VS Code:

Open VS Code
Go to Extensions (Ctrl+Shift+X)
Search for "Git Auto Commit"
Install and configure to auto-commit every N minutes

Option D: Watch Script (Recommended for Development)
Create watch-and-save.js:
javascriptconst { exec } = require('child_process');
const chokidar = require('chokidar');

let timeout;
const DELAY = 30000; // 30 seconds after last change

const watcher = chokidar.watch('src/**/*', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher.on('change', (path) => {
  console.log(`📝 File changed: ${path}`);
  
  clearTimeout(timeout);
  
  timeout = setTimeout(() => {
    console.log('🔄 Auto-saving to GitHub...');
    
    exec('git add . && git commit -m "Auto-save: Development progress" && git push origin main', 
      (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`⚠️  ${stderr}`);
          return;
        }
        console.log('✅ Changes saved to GitHub!');
        console.log(stdout);
      }
    );
  }, DELAY);
});

console.log('👀 Watching for file changes...');
Add to package.json:
json{
  "scripts": {
    "watch:save": "node watch-and-save.js"
  },
  "devDependencies": {
    "chokidar": "^3.5.3"
  }
}
Install and run:
bashnpm install chokidar --save-dev
npm run watch:save
Step 3: GitHub Actions (Optional - Automated Testing)
Create .github/workflows/ci.yml:
yamlname: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build project
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
    
    - name: Success notification
      run: echo "✅ Build successful!"

VERCEL DEPLOYMENT SETUP
Step 1: Install Vercel CLI (Optional)
bashnpm install -g vercel
Step 2: Deploy to Vercel
Method A: Vercel Dashboard (Recommended)

Go to vercel.com
Sign in with GitHub
Click "New Project"
Import your limsolar-website repository
Configure project:

Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install


Add Environment Variables:

VITE_SUPABASE_URL → your Supabase URL
VITE_SUPABASE_ANON_KEY → your Supabase anon key


Click "Deploy"

Method B: Vercel CLI
bash# Login to Vercel
vercel login

# Deploy project
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: limsolar-website
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
Step 3: Vercel Configuration File
Create vercel.json in project root:
json{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@vite_supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@vite_supabase_anon_key"
  }
}
Step 4: Automatic Deployments
Vercel automatically deploys when you push to GitHub:

Push to main branch → Production deployment
Push to other branches → Preview deployment
Pull requests → Preview deployment with unique URL

Every commit triggers:

Vercel detects GitHub push
Runs npm install
Runs npm run build
Deploys to Vercel CDN
Updates live site (usually within 30-60 seconds)

Step 5: Custom Domain (Optional)
In Vercel Dashboard:

Go to Project Settings
Click "Domains"
Add custom domain (e.g., limsolar.com)
Follow DNS configuration instructions
Vercel automatically provisions SSL certificate


COMPLETE WORKFLOW
Development Workflow
bash# 1. Start development server
npm run dev

# 2. Make changes to code
# Files are watched and auto-reloaded

# 3. Save changes (auto-commits to GitHub)
npm run save
# OR use watch script
npm run watch:save

# 4. Vercel automatically detects push and deploys
# Check deployment status at vercel.com/dashboard

# 5. Visit your live site
# Production: https://limsolar-website.vercel.app
# Or your custom domain: https://limsolar.com
Deployment Status
You'll receive:

GitHub commit confirmation
Vercel deployment notification (email/Slack if configured)
Deployment URL in Vercel dashboard
Build logs and status

Rollback Strategy
If deployment fails or has issues:
bash# Method 1: Revert last commit
git revert HEAD
git push origin main
# Vercel auto-deploys previous working version

# Method 2: Redeploy from Vercel Dashboard
# Go to Deployments → Select working version → Promote to Production
```

---

## ENVIRONMENT VARIABLES SETUP

### Local Development (`.env` file)

Create `.env` in project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
Vercel Production
Add in Vercel Dashboard → Project Settings → Environment Variables:
Variable NameValueEnvironmentVITE_SUPABASE_URLhttps://your-project.supabase.coProduction, PreviewVITE_SUPABASE_ANON_KEYyour-anon-keyProduction, Preview
Important:

Never commit .env to GitHub (it's in .gitignore)
Always use VITE_ prefix for Vite environment variables
Redeploy after changing environment variables


MONITORING & MAINTENANCE
Vercel Analytics (Built-in)
Vercel provides:

Real-time visitor analytics
Performance metrics (Core Web Vitals)
Error tracking
Deployment history

Enable in: Vercel Dashboard → Project → Analytics
Git Commit Best Practices
Use meaningful commit messages:
bash# Good commit messages
git commit -m "feat: Add service application form"
git commit -m "fix: Resolve dashboard loading issue"
git commit -m "style: Update hero section design"
git commit -m "docs: Update README with setup instructions"

# Auto-save commits (for rapid development)
git commit -m "wip: Dashboard improvements"
git commit -m "update: Styling adjustments"
Deployment Checklist
Before major deployments:
bash# 1. Test locally
npm run dev

# 2. Build locally to check for errors
npm run build

# 3. Preview production build
npm run preview

# 4. Commit and push
git add .
git commit -m "feat: Major feature update"
git push origin main

# 5. Monitor Vercel deployment
# Check dashboard for build success

# 6. Test production site
# Visit live URL and test all features

# 7. Monitor for errors
# Check Vercel logs for any runtime errors

PROJECT INITIALIZATION COMMANDS
Complete setup from scratch:
bash# 1. Create Vite + React project
npm create vite@latest limsolar-website -- --template react
cd limsolar-website

# 2. Install dependencies
npm install
npm install react-router-dom @supabase/supabase-js lucide-react

# 3. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Configure Tailwind (tailwind.config.js)
# Update content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]

# 5. Add Tailwind directives to src/index.css
# @tailwind base;
# @tailwind components;
# @tailwind utilities;

# 6. Initialize Git
git init
git add .
git commit -m "Initial commit: Project setup"

# 7. Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/limsolar-website.git
git branch -M main
git push -u origin main

# 8. Deploy to Vercel
vercel
# Follow prompts and add environment variables

# 9. Start development with auto-save
npm run dev
# In another terminal:
npm run watch:save

DATABASE SCHEMA (SUPABASE SQL)
Run this SQL in your Supabase SQL Editor:
sql-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service applications table
CREATE TABLE service_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  preferred_date DATE,
  current_energy_source TEXT,
  estimated_load TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  assigned_to TEXT,
  status_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table (for public contact form)
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services
INSERT INTO services (name, slug, description, icon_name) VALUES
('Energy Assessment & Load Analysis', 'energy-assessment', 'On-site evaluation of real power usage and identification of critical equipment and peak demand', 'Zap'),
('Custom Solar System Design', 'system-design', 'Properly engineered solar + battery systems designed to handle institutional loads', 'Sun'),
('Professional Installation', 'installation', 'Certified technicians with verified panels, inverters, and batteries', 'Wrench'),
('Battery Storage Solutions', 'battery-storage', 'Reliable energy storage for night use and outages designed for longevity', 'Battery'),
('Operations & Maintenance', 'maintenance', 'Regular inspections, servicing, and preventive maintenance', 'Settings'),
('Generator Integration & Hybrid Systems', 'hybrid-systems', 'Smart integration with existing generators and reduced fuel usage', 'Plug'),
('Consultation & Advisory', 'consultation', 'Guidance for institutions transitioning from generators and long-term energy planning', 'MessageSquare');

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Service applications policies
CREATE POLICY "Users can view own applications" ON service_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create applications" ON service_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON service_applications FOR UPDATE USING (auth.uid() = user_id);

-- Contact submissions - anyone can insert
CREATE POLICY "Anyone can submit contact form" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Services are publicly readable
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DESIGN SYSTEM SPECIFICATIONS
Color Palette (Exact Values)
javascriptconst colors = {
  solarYellow: '#FFEB3B',
  deepCharcoal: '#1A1A1A',
  matteBlack: '#0A0A0A',
  white: '#FFFFFF',
  softGrey: '#BDBDBD',
  darkGreen: '#2E7D32',
  electricBlue: '#1E88E5'
}
```

### Typography Rules
- **Headings:** font-bold, white or solar yellow for emphasis
- **Body:** text-gray-400 or text-white on dark backgrounds
- **Font Family:** Use Tailwind default (system sans-serif stack)
- **Never overuse yellow in paragraphs** - use for emphasis only

### Component Design Patterns

#### Service Cards
```
- Dark background (bg-gray-900)
- Rounded corners (rounded-lg)
- Padding: p-6
- Heading in solar yellow
- Icon in white or yellow
- Body text in soft grey
- Hover effect: subtle border or shadow in yellow
```

#### CTA Buttons
```
Primary: bg-[#FFEB3B] text-black font-semibold
Secondary: border-2 border-[#FFEB3B] text-[#FFEB3B]
Hover: subtle glow or brightness shift
Rounded: rounded-md
Padding: px-6 py-3
```

---

## SITE STRUCTURE & ROUTING

### Pages (All Required)

1. **Home Page** (`/`)
2. **Solutions Page** (`/solutions`)
3. **Services Page** (`/services`)
4. **How It Works Page** (`/how-it-works`)
5. **About Page** (`/about`)
6. **Contact Page** (`/contact`)
7. **Login Page** (`/login`)
8. **Register Page** (`/register`)
9. **Dashboard Page** (`/dashboard`) - Protected Route
10. **Apply for Service Page** (`/apply/:serviceSlug`) - Protected Route

### Navigation Component
- Sticky header (sticky top-0 z-50)
- Dark background with transparency
- Logo on left (text: "LIM SOLAR" in solar yellow)
- Nav links in center
- Auth buttons on right:
  - If not logged in: "Login" and "Get Started" buttons
  - If logged in: "Dashboard" and "Logout" buttons
- Active route highlighted in solar yellow
- Mobile responsive hamburger menu

---

## PAGE-BY-PAGE SPECIFICATIONS

### 1. HOME PAGE (`/`)

#### Hero Section
```
- Full viewport height (min-h-screen)
- Background: Dark gradient or image of institutional solar installation
- Semi-transparent overlay (bg-black/70)
- Centered content:
  - Headline: "Reliable Solar Energy Systems for Institutions"
    (Key words "Reliable" and "Solar Energy" in solar yellow)
  - Subheadline: "Professional energy assessment, design, and installation for universities, hospitals, and businesses"
  - Two CTAs: 
    - Primary: "Request Energy Assessment" (links to /contact or /apply)
    - Secondary: "View Our Services" (links to /services)
```

#### Value Propositions Section
```
- 3-4 cards in grid
- Each card: Icon + Heading + Short description
- Examples:
  - "Systems-Driven Approach" 
  - "Institutional-Grade Design"
  - "Complete Lifecycle Support"
  - "Proven Track Record"
```

#### Featured Services Preview
```
- Show 3 primary services
- Link to full services page
- Use modular card design
```

#### How It Works Preview
```
- 5-step horizontal flow with icons
- Steps: Assessment → Design → Installation → Monitoring → Reliable Power
- Each step: Icon + Title only (no descriptions)
```

#### Final CTA Section
```
- Dark background
- Centered heading: "Ready to Transform Your Energy Infrastructure?"
- CTA button: "Schedule a Consultation"
```

### 2. SOLUTIONS PAGE (`/solutions`)

Present solutions for different institution types:
```
Solutions for:
- Universities & Educational Institutions
- Healthcare Facilities
- Corporate Offices
- Manufacturing Plants
- Government Buildings
- Hotels & Hospitality

Each solution card includes:
- Institution type
- Typical challenges
- Solar solution approach
- Expected benefits
```

### 3. SERVICES PAGE (`/services`)

#### Layout
```
- Hero section with page title
- Grid of all 7 service cards (from database)
- Each card:
  - Service icon
  - Service name (heading in yellow)
  - Full description
  - "Learn More" or "Apply Now" button
  - If user logged in: "Apply Now" → /apply/:serviceSlug
  - If not logged in: "Apply Now" → /login (with redirect back)
```

#### Services to Display (from database):
1. Energy Assessment & Load Analysis
2. Custom Solar System Design
3. Professional Installation
4. Battery Storage Solutions
5. Operations & Maintenance
6. Generator Integration & Hybrid Systems
7. Consultation & Advisory

### 4. HOW IT WORKS PAGE (`/how-it-works`)

#### Detailed Process Flow
```
Each step as expandable section or detailed card:

Step 1: Energy Assessment
- Site visit and evaluation
- Load analysis and power mapping
- Equipment audit
- Demand profiling

Step 2: System Design
- Custom solar array sizing
- Battery storage configuration
- Inverter and electrical design
- ROI projections

Step 3: Installation
- Professional installation team
- Quality components
- Code compliance
- Safety protocols

Step 4: Monitoring & Maintenance
- System monitoring
- Regular inspections
- Preventive maintenance
- Performance optimization

Step 5: Reliable Power Delivery
- Consistent energy supply
- Reduced operational costs
- Lower carbon footprint
- Energy independence
```

### 5. ABOUT PAGE (`/about`)
```
Sections:
- Company mission and vision
- Why Lim Solar is different
- Team expertise
- Certifications and partnerships
- Company values
- Contact information
```

### 6. CONTACT PAGE (`/contact`)

#### Contact Form (Public - No Auth Required)
```
Fields:
- Full Name (required)
- Email (required)
- Phone (required)
- Company/Institution (optional)
- Message (required)
- Submit button

On submit:
- Store in Supabase contact_submissions table
- Show success message
- Clear form
```

#### Contact Information Display
```
- Phone number
- Email address
- Office location (if applicable)
- Business hours
- Social media links (optional)
```

### 7. LOGIN PAGE (`/login`)
```
- Centered card on dark background
- Logo at top
- Email and password fields
- "Remember me" checkbox
- "Forgot password?" link
- Login button
- Divider
- "Don't have an account? Register" link
- Use Supabase auth.signInWithPassword()
- On success: redirect to dashboard or intended page
- Show error messages for invalid credentials
```

### 8. REGISTER PAGE (`/register`)
```
- Similar design to login
- Fields:
  - Full Name (required)
  - Email (required)
  - Phone (required)
  - Company/Institution Name (optional)
  - Password (required, min 8 characters)
  - Confirm Password (required)
- Terms and conditions checkbox
- Register button
- "Already have an account? Login" link
- Use Supabase auth.signUp()
- On success: redirect to dashboard with welcome message
- Validation: passwords match, email format, required fields
```

### 9. DASHBOARD PAGE (`/dashboard`) - PROTECTED

#### Layout Sections:

**A. Welcome Header**
```
- "Welcome back, [User Name]"
- Quick stats: Total applications, Pending reviews, Scheduled consultations
```

**B. My Applications Section**
```
- Table or card list of user's service applications
- Each shows:
  - Service name
  - Application date
  - Status badge (color-coded):
    - Pending: yellow
    - Under Review: blue
    - Scheduled: green
    - In Progress: orange
    - Completed: gray
    - Cancelled: red
  - Action buttons: "View Details"
- "Apply for New Service" CTA button
```

**C. Application Details Modal/View**
```
When clicking "View Details":
- Full application information
- Current status with timeline
- Assigned consultant (if any)
- Status notes from admin
- Next steps
- Contact support button
```

**D. Profile Section**
```
- View/edit profile information
- Update company details
- Change password option
```

### 10. APPLY FOR SERVICE PAGE (`/apply/:serviceSlug`) - PROTECTED

#### Dynamic Service Application Form
```
- Page title: "Apply for [Service Name]"
- Service description displayed at top
- Multi-step form or single long form:

Fields:
- Company/Institution Name (required)
- Contact Person (pre-filled from profile, editable)
- Phone Number (pre-filled from profile, editable)
- Location/Address (required)
- Preferred Consultation Date (date picker)
- Current Energy Source (dropdown: Grid Only, Generator, Hybrid, Other)
- Estimated Power Load (text input with unit selector: kW/MW)
- Additional Notes/Requirements (textarea)

Submit button: "Submit Application"

On submit:
- Insert into service_applications table
- Set status to 'pending'
- Show success message with application ID
- Redirect to dashboard
- Show confirmation: "Application submitted successfully. Our team will review and contact you within 2 business days."

AUTHENTICATION FLOW
Supabase Auth Integration
javascript// Auth Context Provider needed

Features:
1. Check auth state on app load
2. Persist auth across page refreshes
3. Protected route wrapper component
4. Automatic redirect to login for protected pages
5. Logout functionality

Protected Routes:
- /dashboard
- /apply/:serviceSlug

Public Routes (redirect to dashboard if logged in):
- /login
- /register
```

### Protected Route Logic
```
If user not authenticated:
- Redirect to /login
- Store intended destination
- After login, redirect back to intended page

If user authenticated trying to access /login or /register:
- Redirect to /dashboard

KEY FEATURES & FUNCTIONALITY
1. Service Application System

Authenticated users can apply for any service
Applications stored in Supabase with user relationship
Users can view all their applications in dashboard
Status tracking system (pending → completed)

2. Public vs Authenticated Experience
Public Visitors Can:

View all pages (Home, Solutions, Services, How It Works, About, Contact)
See service descriptions
Submit contact form
Cannot apply for services without account

Authenticated Users Can:

Everything public users can do
Apply for services
View application dashboard
Track application status
Edit profile information

3. Real-time Data Updates

Fetch services from Supabase dynamically
Fetch user applications from Supabase
No hardcoded service data (except initial seed)

4. Form Validation

Client-side validation for all forms
Required field checking
Email format validation
Password strength requirements (min 8 chars)
Phone number format
Date validation

5. Error Handling

Display Supabase errors gracefully
Network error handling
Form submission error states
404 page for invalid routes
Auth error messages


UI/UX REQUIREMENTS
Responsive Design

Mobile-first approach
Breakpoints: sm, md, lg, xl
Hamburger menu for mobile navigation
Stacked cards on mobile, grid on desktop
Touch-friendly buttons and forms

Loading States

Show spinners during:

Login/register
Data fetching
Form submissions


Skeleton loaders for dashboard data

Animations (Subtle)

Smooth page transitions
Hover effects on buttons and cards
Fade-in for sections on scroll (optional)
No aggressive animations - keep professional

Accessibility

Semantic HTML
Proper heading hierarchy
Alt text for images
Form labels
Keyboard navigation support
Focus states visible


CONTENT GUIDELINES
Tone of Voice

Professional and confident
Technical but not jargon-heavy
Solution-focused
Trust-building

Copy Examples
Hero Headlines:

"Reliable Solar Energy Systems for Institutions"
"Power Your Institution with Professional Solar Solutions"
"Engineering-Grade Solar Systems for Serious Operations"

Service Descriptions: (use from design doc)
CTAs:

"Request Energy Assessment"
"Schedule a Consultation"
"Apply Now"
"Get Started"
"Learn More"
"View Our Services"


TECHNICAL IMPLEMENTATION NOTES
Supabase Client Setup
javascript// Create supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SU