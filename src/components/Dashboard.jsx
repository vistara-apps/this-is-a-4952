import React from 'react'
import { TrendingUp, DollarSign, Clock, Eye } from 'lucide-react'
import AnalyticsChart from './AnalyticsChart'
import DomainCard from './DomainCard'

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Auctions',
      value: '23',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      title: 'Watchlist Domains',
      value: '15',
      change: '+3',
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      title: 'Total Volume',
      value: '$142K',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-purple-400'
    },
    {
      title: 'Expiring Soon',
      value: '7',
      change: '+2',
      icon: Clock,
      color: 'text-orange-400'
    }
  ]

  const featuredDomains = [
    {
      domainName: 'crypto-exchange.com',
      currentBid: 15000,
      timeRemaining: '2h 45m',
      valuationScore: 95,
      status: 'activeAuction'
    },
    {
      domainName: 'ai-tools.io',
      currentBid: 8500,
      timeRemaining: '1d 12h',
      valuationScore: 88,
      status: 'activeAuction'
    },
    {
      domainName: 'blockchain-dev.org',
      currentBid: 3200,
      timeRemaining: '3h 20m',
      valuationScore: 76,
      status: 'activeAuction'
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-dark-text mt-1">Welcome back! Here's what's happening with your domains.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="gradient-bg text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Start New Auction
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-surface dark:bg-dark-surface rounded-lg p-6 border border-gray-200 dark:border-dark-border hover:border-purple-400/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-dark-text text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-text dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface dark:bg-dark-surface rounded-lg p-6 border border-gray-200 dark:border-dark-border">
          <h3 className="text-lg font-semibold text-text dark:text-white mb-4">Market Trends</h3>
          <AnalyticsChart variant="line" />
        </div>
        <div className="bg-surface dark:bg-dark-surface rounded-lg p-6 border border-gray-200 dark:border-dark-border">
          <h3 className="text-lg font-semibold text-text dark:text-white mb-4">Auction Activity</h3>
          <AnalyticsChart variant="bar" />
        </div>
      </div>

      {/* Featured Auctions */}
      <div className="bg-surface dark:bg-dark-surface rounded-lg p-6 border border-gray-200 dark:border-dark-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text dark:text-white">Featured Auctions</h3>
          <button className="text-primary hover:text-blue-300 text-sm font-medium">
            View All Auctions
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredDomains.map((domain, index) => (
            <DomainCard key={index} domain={domain} variant="activeAuction" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
