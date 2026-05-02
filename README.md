# Buy Me A Chai

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-blue?style=flat-square&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-lightgreen?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-darkblue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-purple?style=flat-square&logo=next.js)](https://next-auth.js.org/)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat-square&logo=razorpay)](https://razorpay.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A crowdfunding platform for creators to receive direct support from fans. Built with Next.js, MongoDB, and Razorpay for secure payments.

[Demo](#) • [Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Roadmap](#roadmap) • [Contributing](#contributing)

</div>

---

## Highlights

- **Creator Profiles**: Custom public pages with profile information and social links
- **Secure Payments**: Razorpay integration for reliable payment processing
- **User Authentication**: NextAuth with GitHub OAuth for seamless login
- **Dashboard Analytics**: Real-time earnings tracking and transaction history
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: Instant user feedback for actions and transactions
- **Session Management**: Secure session handling with NextAuth

---

## Table of Contents

- [Highlights](#highlights)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [API Reference](#api-reference)
  - [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Architecture](#architecture)
- [Development](#development)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Learnings](#learnings)
- [Support](#support)

---

## Overview

**Buy Me A Chai** is a production-ready full-stack application that connects creators with their supporters. Built with Next.js, React, and MongoDB, it enables creators to receive direct contributions through a simple, secure payment system powered by Razorpay.

### Key Design Decisions

- **NextAuth with GitHub OAuth**: Simplified authentication without managing passwords
- **MongoDB for flexibility**: Scalable NoSQL database for creator profiles and transactions
- **Next.js API Routes**: Serverless backend functions for payment processing and data management
- **Dynamic routing** (`[username]`): Scales to unlimited creator profiles without pre-configuration
- **Razorpay integration**: PCI-compliant payment processing with minimal setup
- **Client-side state**: Session-based authentication reduces backend queries

---

## Features

<table>
  <tr>
    <td width="50%">
      <h3>🎯 Core Features</h3>
      <ul>
        <li><strong>Creator Profiles</strong> - Customizable public pages with username</li>
        <li><strong>Secure Payments</strong> - Razorpay integration for transactions</li>
        <li><strong>User Authentication</strong> - GitHub OAuth with NextAuth</li>
        <li><strong>Dashboard Analytics</strong> - Track earnings and supporters</li>
      </ul>
    </td>
    <td width="50%">
      <h3>✨ User Experience</h3>
      <ul>
        <li><strong>Responsive Design</strong> - Optimized for desktop, tablet, mobile</li>
        <li><strong>Toast Notifications</strong> - Real-time feedback for actions</li>
        <li><strong>Dark Theme</strong> - Modern UI with Tailwind CSS</li>
        <li><strong>Fast Navigation</strong> - Smooth page transitions</li>
      </ul>
    </td>
  </tr>
</table>

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | Next.js | 15.5.2 |
| **UI Library** | React | 19.1.0 |
| **Styling** | Tailwind CSS | 4 |
| **Database** | MongoDB | 7.0.0 |
| **Database ORM** | Mongoose | 8.20.0 |
| **Authentication** | NextAuth | 4.24.11 |
| **Payments** | Razorpay | 2.9.6 |
| **Notifications** | React Toastify | 11.0.5 |

---

## Quick Start

### Prerequisites

- **Node.js** 18.17+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Razorpay Account** ([razorpay.com](https://razorpay.com))
- **GitHub OAuth App** ([github.com/settings/developers](https://github.com/settings/developers))
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/Muzzu8421/BuyMeAChai.git
cd BuyMeAChai

# Install dependencies
npm install

# Set up environment variables
echo 'MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret' > .env.local

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Documentation

### Installation

<details>
<summary><b>Full Installation Guide</b></summary>

#### 1. Clone Repository
```bash
git clone https://github.com/Muzzu8421/BuyMeAChai.git
cd BuyMeAChai
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Environment Setup
Create `.env.local` in the project root:
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buymeachai

# Razorpay Credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_ID=your_github_app_id
GITHUB_SECRET=your_github_app_secret
```

**MongoDB Atlas Setup:**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string from "Connect" button
4. Replace `username` and `password` with your credentials

**Razorpay Setup:**
1. Create account at [razorpay.com](https://razorpay.com)
2. Go to Settings → API Keys
3. Copy Key ID and Key Secret from test mode
4. Add to `.env.local`

**GitHub OAuth Setup:**
1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in application details
4. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Client Secret

#### 4. Run Locally
```bash
npm run dev
```

#### 5. Production Build
```bash
npm run build
npm start
```

</details>

### Configuration

**Environment Variables:**

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | ✅ | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `RAZORPAY_KEY_ID` | ✅ | Razorpay API Key ID | `rzp_live_XXXXXXXXXX` |
| `RAZORPAY_KEY_SECRET` | ✅ | Razorpay API Secret | `XXXXXXXXXXXXXXXX` |
| `NEXTAUTH_SECRET` | ✅ | NextAuth encryption key | `your-secret-key` |
| `NEXTAUTH_URL` | ✅ | Your application URL | `http://localhost:3000` |
| `GITHUB_ID` | ✅ | GitHub OAuth App ID | `XXXXXXXXXX` |
| `GITHUB_SECRET` | ✅ | GitHub OAuth App Secret | `XXXXXXXXXXXXXXXX` |

### Usage

#### For Creators

1. Navigate to **Login** and authenticate with GitHub
2. Go to **Dashboard** to view your profile
3. Customize your profile with bio and links
4. Share your unique creator page
5. View earnings and transaction history

```
Your Creator Page: https://buymeachai.com/your-username
```

#### For Supporters

1. Visit creator's page
2. Click "Support Creator"
3. Select amount to contribute
4. Complete payment via Razorpay
5. Receive confirmation notification

### API Reference

#### Payment Processing

**Endpoint:** `POST /api/razorpay`

**Request:**
```json
{
  "amount": 500,
  "creatorId": "user_id",
  "message": "Love your content!"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "orderId": "order_XXXXXXXXXX",
  "amount": 500
}
```

#### Authentication

**Endpoint:** `GET /api/auth/signin`
- Redirects to GitHub OAuth login

**Endpoint:** `GET /api/auth/callback/github`
- Handles GitHub OAuth callback

### Project Structure

```
BuyMeAChai/
├── app/
│   ├── layout.js                      # Root layout wrapper
│   ├── page.js                        # Home/landing page
│   ├── login/
│   │   └── page.js                    # Login page with GitHub auth
│   ├── about/
│   │   └── page.js                    # About page
│   ├── Dashboard/
│   │   └── page.js                    # Creator dashboard
│   ├── [username]/
│   │   └── page.js                    # Dynamic creator pages
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.js               # NextAuth configuration
│   │   └── razorpay/
│   │       └── route.js               # Payment processing endpoint
│   └── globals.css                    # Global styles
├── components/
│   ├── Navbar.js                      # Navigation component
│   ├── Dashboard.js                   # Dashboard component
│   ├── Footer.js                      # Footer component
│   └── SessionWrapper.js              # NextAuth session provider
├── models/
│   ├── User.js                        # User schema
│   └── Payment.js                     # Payment schema
├── public/                            # Static assets (GIFs, images)
├── .env.local                         # Environment variables (not in git)
├── jsconfig.json                      # JavaScript config
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                 # Tailwind CSS config
└── package.json                       # Dependencies
```

---

## Database Schema

### Collection: `users`

```javascript
{
  _id: ObjectId,
  username: String,         // Unique creator username
  email: String,            // User email
  name: String,             // Display name
  image: String,            // Profile picture URL
  bio: String,              // Creator bio
  provider: String,         // OAuth provider (github)
  providerId: String,       // OAuth provider ID
  createdAt: Date,          // Account creation timestamp
  updatedAt: Date           // Last update timestamp
}
```

### Collection: `payments`

```javascript
{
  _id: ObjectId,
  userId: ObjectId,         // Supporter user ID
  creatorId: ObjectId,      // Creator user ID
  amount: Number,           // Amount in rupees
  currency: String,         // Currency code (INR)
  status: String,           // Payment status (pending/completed/failed)
  razorpayOrderId: String,  // Razorpay order ID
  razorpayPaymentId: String,// Razorpay payment ID
  message: String,          // Support message
  createdAt: Date,          // Transaction timestamp
  updatedAt: Date           // Last update timestamp
}
```

**Indexes:**
```javascript
db.users.createIndex({ username: 1 }, { unique: true })
db.payments.createIndex({ creatorId: 1 })
db.payments.createIndex({ userId: 1 })
db.payments.createIndex({ createdAt: -1 })
```

---

## Architecture

```
┌─────────────────────────────────────────────┐
│           User Browser                      │
├─────────────────────────────────────────────┤
│  Next.js Frontend (React Components)        │
│  ├─ Navbar (navigation, auth status)        │
│  ├─ Creator Pages (profile, supporters)     │
│  ├─ Dashboard (analytics, earnings)         │
│  └─ Payment UI (Razorpay integration)       │
├─────────────────────────────────────────────┤
│     Next.js API Routes (Backend)            │
│  ├─ POST /api/razorpay (payment handler)   │
│  └─ GET /api/auth/* (NextAuth routes)      │
├─────────────────────────────────────────────┤
│        MongoDB Database                      │
│  ├─ users collection (creator profiles)    │
│  └─ payments collection (transactions)     │
├─────────────────────────────────────────────┤
│      External Services                      │
│  ├─ Razorpay (payment processing)          │
│  └─ GitHub OAuth (authentication)          │
└─────────────────────────────────────────────┘
```

**Data Flow:**
1. User logs in via GitHub OAuth (NextAuth)
2. Session stored securely
3. Creator page visited via dynamic route `[username]`
4. Supporter initiates payment
5. Frontend creates Razorpay order via `/api/razorpay`
6. Payment processed and verified
7. Transaction stored in MongoDB
8. Dashboard fetches and displays analytics
9. Toast notifications provide real-time feedback

---

## Development

### Available Scripts

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm start         # Run production build
```

### Pages Reference

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Home/landing page | ❌ No |
| `/login` | GitHub authentication | ❌ No |
| `/about` | About page | ❌ No |
| `/[username]` | Creator public page | ❌ No |
| `/dashboard` | Creator dashboard | ✅ Yes |

---

## Roadmap

### Phase 1: Foundation ✅
- [x] User authentication with GitHub OAuth
- [x] Creator profile setup and customization
- [x] Payment processing with Razorpay
- [x] Dashboard with earnings tracking
- [x] Responsive design

### Phase 2: Enhanced Features 🔄
- [ ] Profile update functionality
- [ ] Transaction history export
- [ ] Advanced dashboard analytics
- [ ] Creator support messaging

### Phase 3: Community Features
- [ ] Supporter messaging system
- [ ] Exclusive content for supporters
- [ ] Creator leaderboards
- [ ] Social sharing capabilities

### Phase 4: Advanced Analytics
- [ ] Detailed earnings reports
- [ ] Support trends and insights
- [ ] Growth metrics and goals
- [ ] Tax report generation

### Phase 5: Monetization
- [ ] Platform fee implementation
- [ ] Premium creator features
- [ ] Subscription tier support
- [ ] Affiliate program

---

## Contributing

Contributions make the open source community amazing! We welcome:

- **Bug Reports** - Issues with code or features
- **Feature Requests** - New functionality ideas
- **Pull Requests** - Code improvements
- **Documentation** - README, guides, examples

### Getting Started with Development

```bash
# Fork the repo on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/BuyMeAChai.git
cd BuyMeAChai

# Create a feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "feat: Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open Pull Request on GitHub
```

### Code Style

- Use functional components with hooks
- Follow React & Next.js best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - You are free to use this project for personal or commercial purposes.
```

---

## Learnings

### Technical Insights Gained

**Authentication & Security**
- Implementing OAuth with NextAuth for seamless third-party authentication
- Session management with secure cookies and token handling
- Protecting API routes with session validation

**Payment Integration**
- Integrating Razorpay for PCI-compliant payment processing
- Handling payment verification and reconciliation
- Managing payment states (pending, completed, failed)

**Database Design**
- Indexing strategies for query optimization on creator and payment lookups
- Designing schemas for flexible creator profiles and transactions
- Timestamp storage for transaction history and analytics

**Frontend Development**
- Dynamic routing with catch-all segments (`[username]`) for creator pages
- State management with NextAuth sessions
- Real-time user feedback with toast notifications
- Mobile-first responsive design with Tailwind CSS

**Full-Stack Considerations**
- Environment variable management for multi-environment deployments
- Error handling and validation at API and database layers
- Scalable architecture supporting unlimited creators without pre-configuration

---

## Support

### Getting Help

- 📖 **Documentation** - Read the [full guide](#documentation)
- 🐛 **Bug Reports** - [Open an issue](https://github.com/Muzzu8421/BuyMeAChai/issues)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/Muzzu8421/BuyMeAChai/discussions)

### Troubleshooting

<details>
<summary><b>MongoDB connection fails</b></summary>

1. Verify `MONGODB_URI` in `.env.local`
2. Check MongoDB Atlas IP whitelist (add your IP)
3. Ensure connection string is correct
4. Test connection: `node -e "require('mongoose').connect(process.env.MONGODB_URI)"`

</details>

<details>
<summary><b>GitHub OAuth not working</b></summary>

1. Verify GitHub ID and Secret in `.env.local`
2. Check callback URL matches: `http://localhost:3000/api/auth/callback/github`
3. Ensure GitHub app has correct permissions
4. Clear browser cookies for localhost

</details>

<details>
<summary><b>Razorpay payments failing</b></summary>

1. Verify Razorpay Key ID and Secret in `.env.local`
2. Ensure you're using test mode keys for development
3. Check payment amount is in valid range
4. Verify Razorpay account status

</details>

<details>
<summary><b>Styling not working</b></summary>

1. Run `npm install` to ensure Tailwind is installed
2. Restart dev server: `npm run dev`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check globals.css is imported in layout.js

</details>

---

<div align="center">

### Made with ❤️ by [Muzzu8421](https://github.com/Muzzu8421)

[⬆ Back to Top](#buy-me-a-chai)

</div>
