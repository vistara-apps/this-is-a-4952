import React, { useState } from 'react'
import { Heart, Bell, Settings, Plus, Filter, Search } from 'lucide-react'
import { useUser } from '../context/UserContext'
import DomainCard from './DomainCard'
import AlertSettings from './AlertSettings'

const Watchlist = () => {
  const { user, watchlist, removeFromWatchlist } = useUser()
  const [showAlertSettings, setShowAlertSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredWatchlist = watchlist.filter(domain => {
    const matchesSearch = domain.domainName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || 
      (filterType === 'expiring' && new Date(domain.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) ||
      (filterType === 'premium' && domain.valuationScore >= 90)
    
    return matchesSearch && matchesFilter
  })

  const expiringCount = watchlist.filter(d => 
    new Date(d.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length

  const averageValue = Math.round(
    watchlist.reduce((sum, domain) => sum + domain.valuationScore, 0) / watchlist.length
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
          <p className="text-dark-text mt-1">Monitor domains you're interested in</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={() => setShowAlertSettings(true)}
            className="flex items-center px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white hover:border-purple-400/50 transition-colors"
          >
            <Settings size={16} className="mr-2" />
            Alert Settings
          </button>
          <button className="gradient-bg text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
            <Plus size={16} className="mr-2 inline" />
            Add Domain
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <div className="flex items-center">
            <Heart className="text-purple-400 mr-3" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">{watchlist.length}</p>
              <p className="text-sm text-dark-text">Domains Watching</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <div className="flex items-center">
            <Bell className="text-orange-400 mr-3" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">{expiringCount}</p>
              <p className="text-sm text-dark-text">Expiring This Week</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <div className="flex items-center">
            <Settings className="text-blue-400 mr-3" size={24} />
            <div>
              <p className="text-2xl font-bold text-white">{averageValue}</p>
              <p className="text-sm text-dark-text">Avg Value Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text" size={20} />
            <input
              type="text"
              placeholder="Search your watchlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text focus:outline-none focus:border-primary"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary appearance-none"
            >
              <option value="all">All Domains</option>
              <option value="expiring">Expiring Soon</option>
              <option value="premium">Premium Value</option>
            </select>
          </div>
        </div>
      </div>

      {/* Watchlist Grid */}
      {filteredWatchlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWatchlist.map((domain, index) => (
            <div key={index} className="relative">
              <DomainCard domain={domain} variant="watchlist" />
              <button
                onClick={() => removeFromWatchlist(domain.domainName)}
                className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors"
                title="Remove from watchlist"
              >
                <Heart size={16} className="text-red-400" fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-dark-surface rounded-lg border border-dark-border">
          <Heart size={48} className="text-dark-text mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No domains in watchlist</h3>
          <p className="text-dark-text mb-6">Start building your watchlist by adding domains you're interested in.</p>
          <button className="gradient-bg text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Browse Available Domains
          </button>
        </div>
      )}

      {/* Recent Activity */}
      {watchlist.length > 0 && (
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Watchlist Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-medium">example.com valuation updated</p>
                  <p className="text-sm text-dark-text">Score increased to 85 (+3)</p>
                </div>
              </div>
              <span className="text-sm text-dark-text">2h ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-medium">domain.io expires in 5 days</p>
                  <p className="text-sm text-dark-text">Expiry alert triggered</p>
                </div>
              </div>
              <span className="text-sm text-dark-text">1d ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-medium">crypto.eth added to watchlist</p>
                  <p className="text-sm text-dark-text">New domain added</p>
                </div>
              </div>
              <span className="text-sm text-dark-text">3d ago</span>
            </div>
          </div>
        </div>
      )}

      {/* Alert Settings Modal */}
      {showAlertSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-surface rounded-lg p-6 max-w-md w-full border border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Alert Settings</h3>
              <button
                onClick={() => setShowAlertSettings(false)}
                className="text-dark-text hover:text-white"
              >
                ×
              </button>
            </div>
            <AlertSettings />
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAlertSettings(false)}
                className="px-4 py-2 text-dark-text hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAlertSettings(false)}
                className="gradient-bg text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Watchlist