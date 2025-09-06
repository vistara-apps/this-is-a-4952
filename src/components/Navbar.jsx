import React from 'react'
import { BarChart3, Search, Gavel, TrendingUp, Heart, User } from 'lucide-react'

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'discovery', label: 'Discovery', icon: Search },
    { id: 'auctions', label: 'Auctions', icon: Gavel },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'watchlist', label: 'Watchlist', icon: Heart },
  ]

  return (
    <nav className="bg-dark-surface border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Domain Auctions Pro
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                        activeTab === item.id
                          ? 'bg-primary text-white'
                          : 'text-dark-text hover:bg-dark-border hover:text-white'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-green-400 px-3 py-1 bg-green-400/10 rounded-full">
              Pro Plan
            </span>
            <button className="p-2 rounded-full hover:bg-dark-border transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar