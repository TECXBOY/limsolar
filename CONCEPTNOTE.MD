LIMSOLAR COMPLETE WEBSITE - ENGINEERING SPECIFICATION PROMPT
Project Overview
Build a professional, multi-page solar energy company website for Lim Solar with authentication, service application system, and client dashboard. The site positions Lim Solar as a systems-driven energy partner for institutional clients.

TECHNICAL STACK
Core Technologies

Framework: React with React Router for multi-page navigation
Styling: Tailwind CSS (utility classes only - no custom config needed)
Backend/Database: Supabase (Authentication + PostgreSQL database)
Icons: Lucide React
State Management: React Context API for auth state
Form Handling: Controlled components with validation

Required Supabase Setup
You must create a Supabase project and set up the following:
Environment Variables Needed:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

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

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Service applications policies
CREATE POLICY "Users can view own applications" ON service_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create applications" ON service_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON service_applications FOR UPDATE USING (auth.uid() = user_id);

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
- Store in Supabase (contact_submissions table - create if needed)
- Show success message
- Send email notification (optional - can use Supabase functions)
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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
Auth Context Pattern
javascript// Create AuthContext.jsx
- useAuth hook
- AuthProvider component
- getCurrentUser function
- signUp function
- signIn function
- signOut function
- updateProfile function
Data Fetching Patterns
javascript// Fetch services
const { data: services, error } = await supabase
  .from('services')
  .select('*')
  .eq('is_active', true)

// Fetch user applications
const { data: applications, error } = await supabase
  .from('service_applications')
  .select(`
    *,
    services(name, slug)
  `)
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })

// Create application
const { data, error } = await supabase
  .from('service_applications')
  .insert([{
    user_id: user.id,
    service_id: serviceId,
    company_name: formData.companyName,
    // ... other fields
  }])
```

### Environment Variables Required
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## DEPLOYMENT CHECKLIST

1. ✅ Create Supabase project
2. ✅ Run SQL schema in Supabase SQL Editor
3. ✅ Enable email auth in Supabase Authentication settings
4. ✅ Get Supabase URL and anon key
5. ✅ Set environment variables
6. ✅ Test authentication flow
7. ✅ Test service application submission
8. ✅ Test protected routes
9. ✅ Verify RLS policies working
10. ✅ Deploy to hosting (Vercel/Netlify recommended)

---

## QUALITY STANDARDS

### Code Quality
- Clean, readable code
- Proper component organization
- Reusable components where appropriate
- Comments for complex logic
- No console.logs in production

### Performance
- Lazy load routes if needed
- Optimize images
- Minimize re-renders
- Efficient database queries

### Security
- Never expose Supabase service_role key
- Use RLS policies properly
- Validate inputs server-side (Supabase RLS handles this)
- Sanitize user inputs
- HTTPS only in production

---

## FILE STRUCTURE SUGGESTION
```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   ├── Auth/
│   │   ├── ProtectedRoute.jsx
│   │   ├── AuthForms.jsx
│   ├── Services/
│   │   ├── ServiceCard.jsx
│   │   ├── ServiceGrid.jsx
│   ├── Dashboard/
│   │   ├── ApplicationCard.jsx
│   │   ├── StatusBadge.jsx
│   ├── UI/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
├── contexts/
│   ├── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Solutions.jsx
│   ├── Services.jsx
│   ├── HowItWorks.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── ApplyService.jsx
├── lib/
│   ├── supabaseClient.js
├── App.jsx
├── main.jsx

SUCCESS CRITERIA
The website is successful when:

✅ Public visitors can browse all content without auth
✅ Users can register and login successfully
✅ Authenticated users can apply for services
✅ Applications are stored in Supabase correctly
✅ Users can view their applications in dashboard
✅ Status badges display correctly
✅ Protected routes redirect properly
✅ Design matches the solar yellow theme
✅ Site is fully responsive
✅ All forms validate properly
✅ No console errors
✅ Site loads quickly (< 3 seconds)


FINAL NOTES
This is a production-ready specification. Follow engineering best practices:

Write clean, maintainable code
Test all user flows
Handle edge cases
Provide good error messages
Make it fast and responsive
Keep it professional and polished

Lim Solar is not just a website, it's a professional energy infrastructure platform.
Build it like a system, not a brochure.

END OF SPECIFICATIONClaude is AI and can make mistakes. Please double-check responses. Sonnet 4.5Claude is AI and can make mistakes. Please double-check responses.