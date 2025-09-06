# Domain Auctions Pro

**Your edge in the expiring domain and premium domain marketplace.**

A comprehensive web application that helps users discover, bid on, and manage valuable domain names, with a focus on expiring domains and a gamified auction marketplace, powered by real-time analytics and AI insights.

![Domain Auctions Pro](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=Domain+Auctions+Pro)

## 🚀 Features

### Core Features
- **🔔 Expiring Domain Alerts** - Real-time notifications for domains about to expire
- **🎯 Gamified Auction Marketplace** - Engaging auction mechanics with Dutch auction variations
- **📊 Real-time Domain Analytics** - Live market data, trends, and valuation indicators
- **🤖 AI-Powered Insights** - Advanced domain analysis using OpenAI
- **⚡ Dynamic Reserve Pricing** - Oracle-based pricing adjustments

### Advanced Features
- **🔗 Blockchain Integration** - Base chain support via Alchemy
- **💰 Wallet Integration** - Turnkey/Privy wallet connections
- **📱 Real-time Updates** - WebSocket-powered live data
- **🎨 Modern UI/UX** - Responsive design with dark theme
- **🔐 Secure Transactions** - IPFS storage via Pinata

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **Framer Motion** - Smooth animations

### Backend Services
- **Alchemy** - Blockchain RPC and domain metadata
- **Reservoir** - NFT and domain market data
- **OpenAI** - AI-powered domain insights
- **Pinata** - IPFS decentralized storage
- **Doma Oracles** - Dynamic pricing data
- **Privy/Turnkey** - Wallet authentication

### Infrastructure
- **Base Chain** - Layer 2 blockchain
- **WebSocket** - Real-time communications
- **Docker** - Containerized deployment

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Git
- API keys for external services (see Environment Setup)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/vistara-apps/this-is-a-4952.git
cd this-is-a-4952
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
# Required API Keys
VITE_ALCHEMY_API_KEY=your_alchemy_api_key_here
VITE_RESERVOIR_API_KEY=your_reservoir_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_PINATA_API_KEY=your_pinata_api_key_here
VITE_PRIVY_APP_ID=your_privy_app_id_here

# Optional for full functionality
VITE_DOMA_API_KEY=your_doma_api_key_here
VITE_TURNKEY_API_KEY=your_turnkey_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to see the application.

## 🔧 API Integration Setup

### Alchemy (Required)
1. Sign up at [Alchemy](https://www.alchemy.com/)
2. Create a new app for Base Mainnet
3. Copy your API key to `VITE_ALCHEMY_API_KEY`

### Reservoir (Required)
1. Get API access at [Reservoir](https://reservoir.tools/)
2. Add your API key to `VITE_RESERVOIR_API_KEY`

### OpenAI (Required for AI features)
1. Create account at [OpenAI](https://platform.openai.com/)
2. Generate API key and add to `VITE_OPENAI_API_KEY`

### Pinata (Required for IPFS)
1. Sign up at [Pinata](https://pinata.cloud/)
2. Get API key and secret
3. Add to `VITE_PINATA_API_KEY` and `VITE_PINATA_SECRET_KEY`

### Privy (Required for wallet auth)
1. Create app at [Privy](https://privy.io/)
2. Add your app ID to `VITE_PRIVY_APP_ID`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.jsx    # Main dashboard
│   ├── Analytics.jsx    # Market analytics
│   ├── AuctionMarketplace.jsx
│   ├── DomainDiscovery.jsx
│   ├── Watchlist.jsx
│   └── ...
├── services/           # API and service layers
│   ├── api.js         # External API integrations
│   ├── wallet.js      # Wallet and blockchain services
│   └── realtime.js    # WebSocket and real-time features
├── models/            # Data models and entities
│   └── index.js       # User, Domain, Auction models
├── context/           # React context providers
│   └── UserContext.jsx
└── ...
```

## 🎯 Core User Flows

### 1. Domain Discovery and Alert Setup
```javascript
// User browses expiring domains
const domains = await domainService.getExpiringDomains()

// User adds domain to watchlist
await userContext.addToWatchlist({
  domainName: 'example.com',
  notificationPreference: 'email',
  alertThresholds: { daysBeforeExpiry: 30 }
})
```

### 2. Participating in Auctions
```javascript
// User connects wallet
await walletService.connectWallet()

// User places bid
const result = await transactionService.placeBid(auctionId, bidAmount)
```

### 3. Creating Auctions
```javascript
// Create auction with dynamic pricing
const auction = await domainService.createAuction(domainName, {
  duration: 24, // hours
  startingBid: 1000
})
```

## 📊 Data Models

### User Entity
```javascript
{
  userId: "user-123",
  email: "user@example.com",
  subscriptionTier: "Pro", // Basic, Pro
  watchlistDomains: ["example.com"],
  transactionHistory: [],
  walletAddress: "0x...",
  preferences: { notifications: {...} }
}
```

### Domain Entity
```javascript
{
  domainName: "example.com",
  expiryDate: "2024-03-15T00:00:00Z",
  registrant: "registrant-info",
  valuationScore: 85, // 0-100
  marketTrends: { priceHistory: [...] },
  auctionStatus: "available" // available, auction, sold
}
```

### Auction Entity
```javascript
{
  auctionId: "auction-123",
  domainName: "example.com",
  startTime: "2024-01-01T00:00:00Z",
  endTime: "2024-01-02T00:00:00Z",
  currentBid: 5000,
  reservePrice: 3000,
  status: "active" // active, ended, cancelled
}
```

## 🔄 Real-time Features

### WebSocket Connections
```javascript
// Subscribe to auction updates
const unsubscribe = auctionRealtimeService.subscribeToAuction(auctionId, (data) => {
  console.log('Auction update:', data)
})

// Subscribe to domain alerts
const unsubscribeAlerts = domainAlertService.subscribeToExpirationAlerts(watchlist, (alert) => {
  showNotification(`Domain ${alert.domainName} expires in ${alert.daysRemaining} days`)
})
```

### Browser Notifications
```javascript
// Request permission and show notifications
await notificationService.requestPermission()
await notificationService.showNotification('Domain Alert', {
  body: 'example.com expires in 7 days',
  tag: 'domain-expiration'
})
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build the image
docker build -t domain-auctions-pro .

# Run the container
docker run -p 3000:3000 domain-auctions-pro
```

### Environment Variables for Production
```env
VITE_APP_ENVIRONMENT=production
VITE_DEBUG_MODE=false
VITE_MOCK_API=false
```

### Build for Production
```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📈 Business Model

### Subscription Tiers
- **Basic ($15/month)**: Expiring domain alerts, basic analytics
- **Pro ($45/month)**: Advanced analytics, auction marketplace access, priority notifications, lower transaction fees

### Revenue Streams
- Monthly subscriptions
- Transaction fees on marketplace sales
- Premium domain listing fees

## 🔐 Security Features

- **Wallet Integration**: Secure blockchain transactions
- **IPFS Storage**: Decentralized metadata storage
- **API Rate Limiting**: Protection against abuse
- **Input Validation**: Comprehensive data validation
- **Error Handling**: Graceful error recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join our community discussions

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core auction marketplace
- ✅ Real-time analytics
- ✅ Wallet integration
- ✅ AI-powered insights

### Phase 2 (Next)
- 🔄 Mobile app development
- 🔄 Advanced auction types (Dutch, sealed bid)
- 🔄 Social features and community
- 🔄 API for third-party integrations

### Phase 3 (Future)
- 📋 Multi-chain support
- 📋 Advanced AI features
- 📋 Enterprise solutions
- 📋 White-label platform

---

**Built with ❤️ for the domain investment community**

For more information, visit our [website](https://domainauctions.pro) or contact us at [support@domainauctions.pro](mailto:support@domainauctions.pro).
