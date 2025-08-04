# HackPSU Sponsor Portal

A comprehensive sponsor portal for HackPSU, Penn State's premier hackathon, facilitating sponsorship management and participant engagement.

## Project Overview

The HackPSU Sponsor Portal serves as the primary interface for companies to engage with HackPSU as sponsors. The platform provides a public-facing website showcasing sponsorship opportunities, packages, and benefits, alongside an authenticated dashboard for managing hackathon operations including participant tracking, project management, and event coordination.

**Target Users:**
- Prospective sponsors seeking partnership opportunities
- HackPSU organizers managing event operations
- Participants interacting with sponsor challenges and activities

**Key Capabilities:**
- Sponsorship package presentation and inquiry management
- Real-time participant and project tracking
- QR code scanning for event check-ins
- Multi-role authentication and access control

## Tech Stack

### Core Framework
- **Next.js** - Full-stack React framework with App Router for server-side rendering and routing
- **React** - Component-based UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for enhanced developer experience and code reliability

### Styling & UI Components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Headless component library providing accessible primitives
- **Shadcn/ui** - Pre-built component system built on Radix UI and Tailwind
- **Framer Motion** - Animation library for smooth transitions and interactions
- **Lucide React** - Icon library for consistent visual elements

### Authentication & Backend Integration
- **Firebase** - Authentication, real-time database, and hosting platform
- **Axios** - HTTP client for API communication with custom authentication wrapper

### Form Handling & Validation
- **React Hook Form** - Performant form library with minimal re-renders
- **Zod** - Schema validation for type-safe form data processing

### Analytics & Monitoring
- **Vercel Analytics** - Web analytics for performance and usage tracking
- **PostHog** - Product analytics and feature flag management

### Development Tools
- **ESLint** - Code linting for consistent code quality
- **Prettier** - Code formatting for consistent style
- **Jest** - Testing framework for unit and integration tests
- **Husky** - Git hooks for pre-commit validation

## Architecture & Design Decisions

### App Router Structure
- **Route Groups** - Separate layouts for public pages and authenticated dashboard
- **Server Components** - Optimized performance with server-side rendering where appropriate
- **Client Components** - Strategic use for interactive elements and authentication

### Authentication Strategy
- **Firebase Authentication** - JWT-based authentication with role-based access control
- **Route Protection** - AuthGuard component ensuring proper access levels
- **Token Management** - Automatic token refresh and API integration

### State Management
- **React Query (TanStack Query)** - Server state management with caching and synchronization
- **React Context** - Global state for authentication and layout providers
- **Local State** - Component-level state for UI interactions

### Styling Architecture
- **Component-Based Styling** - Encapsulated styles within component boundaries
- **Design System** - Consistent color palette, typography, and spacing scales
- **Responsive Design** - Mobile-first approach with Tailwind's responsive utilities

### Performance Optimizations
- **Code Splitting** - Automatic route-based code splitting with Next.js
- **Image Optimization** - Next.js Image component for optimized asset delivery
- **Caching Strategy** - React Query for API response caching

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- Yarn package manager
- Firebase project with authentication configured

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Configure environment variables (Firebase configuration)
4. Start the development server:
   ```bash
   yarn dev
   ```

### Available Scripts
- `yarn dev` - Start development server
- `yarn build` - Build production application
- `yarn start` - Start production server
- `yarn lint` - Run ESLint for code quality
- `yarn format` - Format code with Prettier

### Environment Setup
Create environment variables for Firebase configuration:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_BASE_URL_V3`

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── dashboard/           # Main dashboard overview
│   │   ├── participants/        # Participant management
│   │   ├── projects/           # Project tracking
│   │   ├── scanner/            # QR code scanning interface
│   │   └── schedule/           # Event scheduling
│   ├── (default)/              # Public-facing routes
│   │   ├── login/              # Authentication pages
│   │   ├── onboarding/         # User onboarding flow
│   │   └── pre-event-form/     # Pre-event registration
│   ├── api/                    # API routes
│   └── globals.css             # Global styles
├── common/                     # Shared utilities and configurations
│   ├── api/                    # API clients and data fetching
│   ├── config/                 # Environment and Firebase configuration
│   └── context/                # React context providers
├── components/                 # Reusable UI components
│   ├── ui/                     # Base UI components (shadcn/ui)
│   └── magicui/                # Enhanced UI components
└── lib/                        # Utility functions
```

## Key Features

### Sponsorship Management
- **Package Presentation** - Interactive sponsorship tier comparison
- **Contact Forms** - Integrated inquiry system with email notifications
- **Sponsor Gallery** - Showcase of past and current sponsors

### Event Operations Dashboard
- **Participant Tracking** - Real-time attendee management and statistics
- **Project Management** - Project submission and judging workflow
- **QR Code Integration** - Event check-in and engagement tracking
- **Schedule Management** - Event timeline and activity coordination

### Authentication & Access Control
- **Multi-Role System** - Different access levels for organizers, mentors, and participants
- **Secure Routing** - Protected routes with automatic redirection
- **Session Management** - Persistent authentication with token refresh

## Deployment

The application is optimized for deployment on Vercel with automatic CI/CD integration. Firebase provides backend services including authentication and real-time database functionality.

## Contributing

### Code Standards
- Follow TypeScript strict mode conventions
- Use ESLint and Prettier for consistent formatting
- Write unit tests for utility functions and complex components
- Follow React best practices for component composition

### Development Workflow
- Create feature branches from main
- Use conventional commits for clear commit messages
- Ensure all tests pass before submitting pull requests
- Code review required for all changes