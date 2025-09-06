import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import DomainDiscovery from './components/DomainDiscovery'
import AuctionMarketplace from './components/AuctionMarketplace'
import Analytics from './components/Analytics'
import Watchlist from './components/Watchlist'
import { UserProvider } from './context/UserContext'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'discovery':
        return <DomainDiscovery />
      case 'auctions':
        return <AuctionMarketplace />
      case 'analytics':
        return <Analytics />
      case 'watchlist':
        return <Watchlist />
      default:
        return <Dashboard />
    }
  }

  return (
    <UserProvider>
      <div className="min-h-screen bg-dark-bg">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderContent()}
        </main>
      </div>
    </UserProvider>
  )
}

export default App