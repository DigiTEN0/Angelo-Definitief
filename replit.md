# Angelo Randazzo Inc - Montreal Luxury Real Estate Platform

## Overview

This is a luxury real estate website for Angelo Randazzo Inc, a Montreal-based real estate brokerage. The platform showcases premium properties in Montreal's finest neighborhoods with a modern, professional design. The application enables potential clients to browse properties, view detailed listings, and submit inquiries through contact forms.

## Recent Updates (October 27, 2025)

**Bug Fixes:**
- Fixed React hooks error in PropertyDetail component (moved useMutation hook before conditional returns to comply with Rules of Hooks)

**UX Improvements:**
- Added automatic scroll to top when navigating between pages
- Added floating scroll-to-top button on bottom left (appears after scrolling 300px down)

**Replit Environment Setup:**
- Configured the project to run in Replit environment
- Ran database migrations to provision PostgreSQL database with all tables (users, properties, leads, viewings)
- Set up workflow to serve the application on port 5000
- Configured deployment settings for autoscale deployment
- Created .gitignore file for Node.js project
- Verified frontend is working correctly with Vite dev server
- Both frontend (React) and backend (Express) are running on port 5000 as configured

## Previous Updates (October 27, 2025)

**Typography & Mobile Improvements:**
- Made all headings responsive for mobile devices (text-3xl → text-7xl breakpoint pattern)
- Reduced all paragraph font sizes to text-base for better visual hierarchy
- Made FAQ question headings smaller (text-base) for better proportions
- Added padding (py-20) to hero banner for better spacing

**Content Updates:**
- Replaced fake USP statistics (15+ years, 500+ properties, 98% satisfaction) with real, verifiable service highlights:
  - Licensed Broker (Certified real estate professional)
  - Montreal Expert (All neighborhoods & areas)
  - Full Service (Buying, selling & investing)

**New Features:**
- Added floating call button in bottom right corner (tel: +15149107370) with hover tooltip
- Added Angelo's headshot with name and title to property detail page contact card
- Made admin dashboard stat cards clickable navigation links
- Added quick email/phone links to recent leads in admin dashboard

**Admin Improvements:**
- Added 10px bottom margin to admin dashboard logo
- Made all stat cards interactive with hover effects and navigation
- Enhanced recent leads display with clickable contact information

## Previous Updates (October 26, 2025)

- Changed all heading fonts from Playfair Display (serif) to Inter (sans-serif) for a cleaner, modern look
- Replaced static hero image with looping aerial video of Montreal downtown
- Updated Angelo Randazzo profile photo with actual Instagram photo
- Redesigned homepage with new sections:
  - "Why Choose Us" section with 4 key benefits
  - Montreal Neighborhoods showcase with 3 featured areas
  - Comprehensive FAQ section with 8 common real estate questions
  - Removed the "Your Journey to Home Ownership" section
- Added TypeScript declarations for video files (.mov, .mp4, .webm)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router.

**UI Components**: shadcn/ui component library built on Radix UI primitives, offering accessible and customizable components with the "new-york" style variant. All UI components are located in `client/src/components/ui/`.

**Styling**: Tailwind CSS with custom design tokens defined in `tailwind.config.ts`. The design system follows modern luxury real estate aesthetics with:
- Custom typography using Inter for all text (both headings and body text)
- Sophisticated color palette with neutral tones
- Custom spacing scale and layout constraints
- Elevation effects for interactive elements (hover-elevate, active-elevate-2)

**State Management**: TanStack Query (React Query) for server state management, with queries configured for minimal refetching (staleTime: Infinity, refetchOnWindowFocus: false).

**Form Handling**: React Hook Form with Zod schema validation via @hookform/resolvers for type-safe form validation.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API with routes defined in `server/routes.ts`:
- `/api/properties` - CRUD operations for property listings
- `/api/leads` - Lead management for contact form submissions
- All routes include proper error handling and Zod validation

**Development Setup**: Custom Vite middleware integration for hot module replacement in development, with production static file serving.

**Request Logging**: Custom middleware that logs API requests with duration tracking and response preview (truncated to 80 characters).

### Data Storage

**ORM**: Drizzle ORM with PostgreSQL dialect, providing type-safe database queries.

**Database Client**: Neon Serverless PostgreSQL with WebSocket support for serverless environments.

**Schema Design** (defined in `shared/schema.ts`):
- `users` table - Admin authentication with email/password
- `properties` table - Property listings with comprehensive fields (title, description, price, location, specs, images array, features array, status)
- `leads` table - Contact form submissions with property interest tracking

**Schema Validation**: Drizzle-zod integration generates Zod schemas from database schema for runtime validation.

**Database Abstraction**: Storage interface pattern (`IStorage` in `server/storage.ts`) with `DatabaseStorage` implementation, allowing for potential storage layer swapping.

### Authentication and Authorization

**Admin Authentication**: Simple localStorage-based authentication check for admin routes. The system verifies `admin_authenticated` flag in localStorage before allowing access to admin dashboard, properties management, and leads management.

**Route Protection**: AdminLayout component enforces authentication checks and redirects unauthenticated users to `/admin/login`.

**Note**: Current implementation uses basic authentication suitable for single-user admin scenarios. Production deployments would benefit from session-based or JWT authentication.

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives (@radix-ui/*) - Accessible, unstyled component primitives
- shadcn/ui - Pre-built component implementations
- Lucide React - Icon library
- embla-carousel-react - Image carousel functionality

**Data Management**:
- TanStack Query - Server state management and caching
- React Hook Form - Form state management
- Zod - Schema validation

**Database & ORM**:
- Drizzle ORM - Type-safe database toolkit
- @neondatabase/serverless - Neon PostgreSQL client with WebSocket support
- ws - WebSocket library for database connections

**Styling**:
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - Type-safe variant management
- clsx / tailwind-merge - Class name utilities

**Build Tools**:
- Vite - Frontend build tool and dev server
- TypeScript - Type safety across the stack
- esbuild - Backend bundling for production

**Development Tools**:
- @replit/vite-plugin-runtime-error-modal - Development error overlay
- @replit/vite-plugin-cartographer - Code navigation
- @replit/vite-plugin-dev-banner - Development environment indicator

**Fonts**: Google Fonts integration (Playfair Display, Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter) loaded via HTML link tags.

**Design System**: Custom design guidelines in `design_guidelines.md` specify luxury real estate aesthetic inspired by Sotheby's International Realty, with emphasis on Montreal's European elegance and clear conversion pathways.