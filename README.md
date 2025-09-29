# 🌾 AgriWise - Smart Agriculture Platform

[![SIH 2025](https://img.shields.io/badge/Smart%20India%20Hackathon-2025-green)](https://sih.gov.in)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-Database-blue)](https://prisma.io)

**Empowering Indian farmers with AI-driven insights, multilingual support, and sustainable practices.**

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Team](#-team)
- [License](#-license)
- [Contact](#-contact)

## 🎯 Overview

AgriWise is a comprehensive digital platform developed for the Smart India Hackathon 2025, designed to address critical challenges faced by Indian farmers. By leveraging AI, multilingual support, and modern web technologies, AgriWise provides farmers with actionable insights for better decision-making, increased productivity, and sustainable farming practices.

### Problem Statement
Indian farmers encounter significant barriers including:
- Limited access to AI-powered agricultural recommendations
- Language barriers hindering technology adoption
- Inadequate marketplace access for produce sales
- Absence of platforms for carbon credit generation
- Challenges in weather-informed decision making

### Solution
AgriWise delivers a unified platform featuring AI-driven crop recommendations, real-time weather intelligence, a smart marketplace, carbon credit management, and multilingual support in English, Hindi, and Malayalam.

## 🚀 Features

### 🤖 AI-Powered Crop Recommendations
- Intelligent crop suitability analysis based on soil, weather, and location data
- Comprehensive scoring algorithms (`src/lib/ai/crop-recommendation.ts`)
- Yield predictions and market price insights
- Planting/harvesting timelines and risk assessments

### 🌦️ Weather Intelligence
- Real-time weather data integration via Indian Weather API
- 5-day forecasts and historical data analysis
- Weather-based farming recommendations
- Alert system for adverse conditions

### 🏪 Smart Marketplace
- Product listing with image uploads and auction functionality
- Category-based browsing (grains, fruits, livestock, equipment)
- Rating and review system for seller credibility
- Location-based seller discovery

### 🌱 Carbon Credit Program
- Sustainable practice tracking and credit calculation
- Marketplace for carbon credit trading
- Implementation guides for eco-friendly farming
- Environmental impact monitoring

### 💬 Multilingual AI Chat Assistant
- Real-time Q&A in English, Hindi, and Malayalam
- Voice input capabilities for accessibility
- Context-aware agricultural advice
- Quick question presets for common queries

### 📱 Mobile-First Design
- Responsive interface optimized for smartphones
- Touch-friendly navigation and visual indicators
- Accessibility features for diverse user needs
- Offline-ready architecture (planned enhancement)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend & Database
- **Next.js API Routes** - Server-side API endpoints
- **Prisma** - Database ORM with PostgreSQL
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Integrations
- **Indian Weather API** - Weather data proxy (`src/lib/weather.ts`)
- **Custom AI Engine** - Crop recommendation logic (`src/lib/ai/crop-recommendation.ts`)

### Internationalization
- **Custom Translation System** - Complete i18n support (`src/lib/translations.ts`)
- **React Context** - Language state management (`src/contexts/LanguageContext.tsx`)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm package manager
- PostgreSQL database (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/agriwise.git
   cd agriwise
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database setup (optional for demo)**
   ```bash
   pnpm prisma:generate
   pnpm prisma:migrate
   pnpm prisma:seed
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Register/login to access dashboard features

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/agriwise"

# Authentication
JWT_SECRET="your-secure-jwt-secret-here"

# Weather API
INDIANAPI_KEY="your-indianapi-key"
USE_WEATHER_SANDBOX=true  # Set to false for production

# CORS (optional)
ALLOWED_ORIGINS="https://yourdomain.com,https://anotherdomain.com"
```

### Demo Mode
For testing without external APIs, enable sandbox mode in `.env.local`:
```env
USE_WEATHER_SANDBOX=true
```

## 📡 API Reference

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify token validity

### Weather Endpoints
- `GET /api/weather/india?city={city}` - Indian city weather
- `GET /api/weather/india/cities` - List Indian cities
- `GET /api/weather/india/by-id?city_id={id}` - Weather by city ID
- `GET /api/weather/global/current?location={location}` - Global current weather
- `GET /api/weather/global/weather?location={location}&days={days}` - Global weather forecast

### AI & Recommendations
- `POST /api/ai/crop-recommendation` - Get crop recommendations
- `GET /api/ai/crops` - List available crops
- `GET /api/ai/crops/{cropName}` - Crop details

### Marketplace
- `GET /api/marketplace/products` - List marketplace products
- `POST /api/marketplace/products/create` - Create product listing
- `GET /api/marketplace/products/{id}` - Product details
- `POST /api/marketplace/listings/{id}/bids` - Place bid on listing

### Dashboard & Protected
- `GET /api/dashboard` - User dashboard data
- `GET /api/protected` - Protected route example
- `GET /api/location/cities` - City data
- `GET /api/location/states` - State data

## 📁 Project Structure

```
agriwise/
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma         # Prisma database schema
│   ├── seed.js               # Database seeding script
│   └── migrations/           # Database migration files
├── public/                   # Static assets
├── scripts/                  # Utility scripts
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── api/              # API route handlers
│   │   ├── carbon-credits/   # Carbon credits page
│   │   ├── chat/             # Chat assistant page
│   │   ├── dashboard/        # User dashboard
│   │   ├── login/            # Authentication pages
│   │   ├── marketplace/      # Marketplace pages
│   │   ├── recommendations/  # Crop recommendations
│   │   ├── weather/          # Weather pages
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Base UI primitives
│   │   ├── Footer.tsx        # Site footer
│   │   └── Header.tsx        # Site header
│   ├── contexts/             # React contexts
│   │   └── LanguageContext.tsx # Language provider
│   ├── lib/                  # Utility libraries
│   │   ├── ai/               # AI-related utilities
│   │   ├── auth.ts           # Authentication helpers
│   │   ├── cookies.ts        # Cookie utilities
│   │   ├── cors.ts           # CORS middleware
│   │   ├── db.ts             # Database client
│   │   ├── demoData.ts       # Demo data
│   │   ├── errors.ts         # Error handling
│   │   ├── logger.ts         # Logging utilities
│   │   ├── security.ts       # Security helpers
│   │   ├── translations.ts   # Translation strings
│   │   ├── utils.ts          # General utilities
│   │   └── weather.ts        # Weather API client
│   └── middleware/           # Next.js middleware
├── test-weather-api.js       # Weather API test script
├── env.example               # Environment variables template
├── setup-database.js         # Database setup script
└── README.md                 # This file
```

## 🤝 Team

**Team Name:** CARBONIX GEC

- **Frontend Development:** Next.js, TypeScript, Tailwind CSS
- **Backend Integration:** API architecture, database design
- **UI/UX Design:** Mobile-first, accessibility-focused design
- **AI/ML Integration:** Crop recommendation algorithms
- **Internationalization:** Multilingual support implementation

## 📄 License

This project was developed for Smart India Hackathon 2025. All rights reserved.

---

**Built with ❤️ for Indian Farmers | Smart India Hackathon 2025**

*Empowering farmers with technology for a sustainable future*

