import React from 'react'
import { Clock, TrendingUp, Heart, DollarSign } from 'lucide-react'

const DomainCard = ({ domain, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'activeAuction':
        return 'border-purple-400/50 card-gradient'
      case 'watchlist':
        return 'border-blue-400/50'
      case 'available':
        return 'border-green-400/50'
      default:
        return 'border-dark-border'
    }
  }

  const getStatusBadge = () => {
    switch (variant) {
      case 'activeAuction':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-400/20 text-purple-300 rounded-full">
            <Clock size={12} className="mr-1" />
            {domain.timeRemaining}
          </span>
        )
      case 'watchlist':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-400/20 text-blue-300 rounded-full">
            <Heart size={12} className="mr-1" />
            Watching
          </span>
        )
      case 'available':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-400/20 text-green-300 rounded-full">
            Available
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className={`bg-dark-surface rounded-lg p-4 border hover:border-purple-400/70 transition-all duration-200 hover:transform hover:scale-105 ${getVariantStyles()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold truncate">{domain.domainName}</h4>
          {domain.expiryDate && (
            <p className="text-sm text-dark-text">Expires: {domain.expiryDate}</p>
          )}
        </div>
        {getStatusBadge()}
      </div>

      <div className="space-y-2">
        {domain.currentBid && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-dark-text">Current Bid</span>
            <span className="text-lg font-bold text-white flex items-center">
              <DollarSign size={16} className="mr-1" />
              {domain.currentBid.toLocaleString()}
            </span>
          </div>
        )}

        {domain.valuationScore && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-dark-text">Value Score</span>
            <div className="flex items-center">
              <TrendingUp size={14} className="text-green-400 mr-1" />
              <span className="text-green-400 font-medium">{domain.valuationScore}/100</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex space-x-2">
        {variant === 'activeAuction' && (
          <>
            <button className="flex-1 bg-primary text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
              Place Bid
            </button>
            <button className="px-3 py-2 border border-dark-border rounded-md text-sm hover:bg-dark-border transition-colors">
              <Heart size={16} />
            </button>
          </>
        )}
        {variant === 'watchlist' && (
          <button className="w-full bg-dark-border text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors">
            Remove from Watchlist
          </button>
        )}
        {variant === 'available' && (
          <button className="w-full gradient-bg text-white py-2 px-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            Add to Watchlist
          </button>
        )}
      </div>
    </div>
  )
}

export default DomainCard