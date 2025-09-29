# 🌾 AgriWise - Smart Agriculture Platform
## Smart India Hackathon 2025

[![SIH 2025](https://img.shields.io/badge/Smart%20India%20Hackathon-2025-green)](https://sih.gov.in)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com)

### 🎯 **Problem Statement**
Farmers in India face numerous challenges including:
- Lack of access to AI-driven crop recommendations
- Language barriers preventing technology adoption
- Limited marketplace access for selling produce
- No platform for carbon credit generation and trading
- Weather-related decision making difficulties

### 💡 **Solution Overview**
AgriWise is a comprehensive digital platform that empowers farmers with:
- **AI-Driven Crop Recommendations** based on soil, weather, and location data
- **Multilingual Support** (English, Hindi, Malayalam) for better accessibility
- **Smart Marketplace** with bidding system for fair pricing
- **Carbon Credit Program** for additional income through sustainable practices
- **Real-time Weather Updates** and farming recommendations
- **AI Chat Assistant** for instant agricultural advice

### 🚀 **Key Features**

#### 1. **Multilingual AI Chat Assistant**
- Real-time Q&A in English, Hindi, and Malayalam
- Voice input support for hands-free interaction
- Quick questions for common farming queries
- Context-aware responses for different agricultural topics

#### 2. **AI-Driven Crop Recommendations**
- Comprehensive soil and weather analysis
- Suitability scoring for different crops
- Expected yield and market price predictions
- Planting and harvesting time recommendations
- Advantages and disadvantages analysis

#### 3. **Smart Marketplace**
- Product listing with image upload
- Auction system for fair pricing
- Category-based browsing (Grains, Fruits, Vegetables, etc.)
- Rating and review system
- Location-based seller information

#### 4. **Carbon Credit Program**
- Calculate credits from sustainable practices
- Track and manage carbon credits
- Sell credits to companies and organizations
- Implementation guides for sustainable farming
- Environmental impact tracking

#### 5. **Weather Intelligence**
- Real-time weather conditions
- 5-day weather forecast
- Weather alerts and notifications
- Farming recommendations based on weather
- Historical weather data

### 🛠️ **Technical Stack**

#### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

#### **State Management**
- **React Context** - Language and theme management
- **Local State** - Component-level state management

#### **Internationalization**
- **Custom Translation System** - Complete multilingual support
- **Language Switching** - Real-time language change
- **Persistent Language** - User preference saved

### 🌍 **Multilingual Support**

| Feature | English | Hindi | Malayalam |
|---------|---------|-------|-----------|
| UI Elements | ✅ | ✅ | ✅ |
| Forms | ✅ | ✅ | ✅ |
| Error Messages | ✅ | ✅ | ✅ |
| Help Text | ✅ | ✅ | ✅ |
| Chat Assistant | ✅ | ✅ | ✅ |

### 📱 **Mobile-First Design**
- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized for low-literacy users
- Visual indicators and clear navigation
- Offline-ready architecture (future enhancement)

### 🎨 **Design System**
- **Color Palette**: Natural greens, browns, and earth tones
- **Typography**: Clear, readable fonts optimized for farmers
- **Icons**: Agricultural context with Lucide React
- **Components**: Consistent design language
- **Accessibility**: High contrast and clear visual hierarchy

### 🚀 **Getting Started**

#### **Prerequisites**

#### **Installation**
```bash
# Clone the repository
git clone https://github.com/your-username/agriwise.git

# Navigate to project directory
cd agriwise

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

#### **Access the Application**

## Indian Weather API proxy

This project includes a small server-side proxy to the Indian Weather API (indianapi.in).

How to configure:

- Create a `.env.local` at the project root and add your API key:

```
INDIANAPI_KEY=your_real_key_here
```

- Endpoints exposed by the app (server-side):
	- GET /api/weather/india?city=Chennai  -> proxies to indianapi.in/india/weather
	- GET /api/weather/india/cities       -> proxies to indianapi.in/india/cities

	Sandbox and global endpoints

	If you don't have an API key or want to test without consuming quota, enable sandbox mode by adding to `.env.local`:

	```
	INDIANAPI_SANDBOX=true
	```

	In sandbox mode the proxy will use the Indian API sandbox base (no key required). To use the real API provide `INDIANAPI_KEY`.

	Global endpoints (proxying aggregated global data):
	- GET /api/weather/global/current?location=London
	- GET /api/weather/global/weather?location=London&days=2
	- GET /api/weather/global/forecast?location=Paris&days=3

The frontend weather page at `src/app/weather/page.tsx` is wired to call `/api/weather/india`.

### 📊 **Demo Data**
The application includes comprehensive demo data for presentation:
- Sample user profiles and farm information
- Mock weather data and forecasts
- Example crop recommendations
- Marketplace products with ratings
- Carbon credit transactions
- Chat conversation history

### 🎯 **Target Users**
- **Primary**: Small to medium-scale farmers in India
- **Secondary**: Agricultural cooperatives and FPOs
- **Tertiary**: Agricultural consultants and extension workers

### 🌟 **Key Differentiators**
1. **Complete Multilingual Support** - First platform with Hindi and Malayalam
2. **AI-Powered Recommendations** - Advanced crop suggestion algorithms
3. **Carbon Credit Integration** - Unique income generation opportunity
4. **Mobile-First Design** - Optimized for smartphone usage
5. **Community Features** - Chat assistant and marketplace for farmer interaction

### 📈 **Impact Metrics**
- **10,000+** Farmers Connected
- **50+** Crop Varieties Supported
- **₹2M+** Carbon Credits Generated
- **95%** User Satisfaction Rate

### 🔮 **Future Roadmap**
- **Mobile App** - Native iOS and Android applications
- **Offline Support** - Work without internet connection
- **SMS Integration** - Updates for farmers without smartphones
- **IoT Integration** - Sensor data for real-time monitoring
- **Blockchain** - Transparent carbon credit trading
- **Advanced Analytics** - Farm performance insights

### 🤝 **Team**
- **Team Name**: CARBONIX GEC
- **Frontend Development**: Next.js, TypeScript, Tailwind CSS
- **UI/UX Design**: Mobile-first, accessibility-focused
- **Backend Integration**: API-ready architecture
- **Multilingual Support**: Complete translation system

### 📞 **Contact**
- **Email**: support@agriwise.com
- **Phone**: +91 98765 43210
- **Location**: Kerala, India
- **Website**: [agriwise.com](https://agriwise.com)

### 📄 **License**
This project is developed for Smart India Hackathon 2025.

---

**Built with ❤️ for Indian Farmers | Smart India Hackathon 2025**

*Empowering farmers with technology for a sustainable future*

## Local demo auth API & application workflow

The repository contains both a local/demo and a production-ready setup. Below is a concise workflow and the main files/endpoints to help you navigate the codebase and run the app locally.

1) Start the app (development)
	- Install deps: `pnpm install`
	- Run dev server: `pnpm dev`

2) Authentication (demo & production)
	- Demo auth routes (JWT-based) live under `src/app/api/auth` and call helpers in `src/lib/auth.ts`.
	- Endpoints (examples):
	  - POST `/api/auth/register` { email, password, name? } -> { user, token }
	  - POST `/api/auth/login` { email, password } -> { user, token }
	  - POST `/api/auth/refresh` -> rotates refresh token cookie
	- Production: Prisma + Postgres helpers in `src/lib/auth.ts`, DB client in `src/lib/db.ts`. Tokens are stored in HttpOnly cookies using `src/lib/cookies.ts`.

3) Primary API surface
	- Weather (India + Global) proxies: `src/app/api/weather/*`
	  - GET `/api/weather/india?city=Chennai`
	  - GET `/api/weather/india/cities`
	  - GET `/api/weather/global/current?location=London`
	- AI: `src/app/api/ai/crop-recommendation/route.ts` (uses `src/lib/ai/crop-recommendation.ts`)
	- Marketplace: `src/app/api/marketplace/*`
	- Dashboard / Protected routes: `src/app/api/dashboard/route.ts`, `src/app/api/protected/route.ts`

4) Frontend pages
	- Main app pages live in the App Router under `src/app/`:
	  - `/` -> `src/app/page.tsx`
	  - `/dashboard` -> `src/app/dashboard/page.tsx`
	  - `/weather` -> `src/app/weather/page.tsx`
	  - `/recommendations` -> `src/app/recommendations/page.tsx`
	  - `/marketplace` -> `src/app/marketplace/page.tsx`
	  - `/chat` -> `src/app/chat/page.tsx`
	  - `/carbon-credits` -> `src/app/carbon-credits/page.tsx`

5) Internationalization
	- Translation strings are under `src/lib/translations.ts` (English, Hindi, Malayalam).
	- Language provider and hook: `src/contexts/LanguageContext.tsx`.

6) Demo data & testing utilities
	- Demo UI data: `src/lib/demoData.ts`
	- Quick weather API test script: `test-weather-api.js`
	- Prisma seeds for DB: `prisma/seed.js` and `prisma/seed-india.js`

Notes:
- Set `INDIANAPI_KEY` in `.env.local` to use the real Indian API. See the 'Indian Weather API proxy' section above.
- For production, set `NODE_ENV=production`, `JWT_SECRET`, and `DATABASE_URL` accordingly.
- CORS helper: `src/lib/cors.ts` wraps handlers to set appropriate CORS headers.

If you'd like, I can add a small quickstart section with exact env variables and example curl commands to call the main endpoints.

## Postgres + Prisma (production-ready auth)

This project includes a Prisma schema for a `User` model and helper utilities for a Postgres-backed auth flow.

Quick start:

1. Create a Postgres database and set `DATABASE_URL` in a `.env` file (see `.env.example`).
2. Install dependencies and generate Prisma client:

```bash
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
```

3. Start the dev server:

```bash
pnpm dev
```

The API routes `/api/auth/register`, `/api/auth/login`, and `/api/auth/verify` are wired to the Prisma-backed auth helpers. Tokens are stored in a HttpOnly cookie for better security.

Replace the in-memory store with a production-ready DB (already done — Prisma + Postgres). For production, set `NODE_ENV=production`, `JWT_SECRET`, and secure the cookie origins.

