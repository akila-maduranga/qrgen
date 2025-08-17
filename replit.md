# replit.md

## Overview

This is a simplified QR code generator web application with a minimal, clean design. The application allows users to generate QR codes by simply entering text content. It features a single-page interface with essential functionality: text input, QR code generation, and PNG download. The design is inspired by modern minimal interfaces with client-side processing for privacy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for build tooling
- **UI Library**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **QR Generation**: Client-side QR code generation using the `qrcode` library for privacy

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with `/api` prefix routing
- **Storage Interface**: Abstracted storage layer with in-memory implementation (IStorage interface)
- **Development**: Hot module replacement with Vite middleware integration

### Data Storage
- **Database**: PostgreSQL configured with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Connection**: Neon Database serverless PostgreSQL connection
- **Session Storage**: PostgreSQL-backed session storage with connect-pg-simple

### Design System
- **Component Library**: Comprehensive UI component system based on shadcn/ui
- **Typography**: Multiple font families (DM Sans, Fira Code, Geist Mono, Architects Daughter)
- **Theming**: CSS custom properties with light/dark mode support
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

### Development Environment
- **Build System**: Vite for frontend, esbuild for backend bundling
- **Type Safety**: Strict TypeScript configuration across client, server, and shared code
- **Code Organization**: Monorepo structure with shared types and utilities
- **Path Aliases**: Configured for clean imports (@, @shared, @assets)

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18+ with TypeScript, React Query for data fetching
- **Vite**: Build tool with React plugin and runtime error overlay
- **Express.js**: Node.js web framework for API server

### UI and Styling
- **shadcn/ui**: Complete component library with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant API for component styling

### Database and Storage
- **Drizzle ORM**: Type-safe SQL toolkit with PostgreSQL dialect
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **connect-pg-simple**: PostgreSQL session store for Express

### QR Code Generation
- **qrcode**: Client-side QR code generation library
- **Canvas API**: Browser-native canvas for QR code rendering and format conversion

### Development Tools
- **TypeScript**: Static type checking across the entire application
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **Replit Integration**: Development environment optimizations and error handling

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Utility for constructing className strings
- **nanoid**: URL-safe unique string ID generator
- **zod**: Schema validation and type inference