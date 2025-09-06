import React, { useState } from 'react'
import { Gavel, Clock, Users, DollarSign } from 'lucide-react'
import DomainCard from './DomainCard'
import BidInput from './BidInput'

const AuctionMarketplace = () => {
  const [selectedAuction, setSelectedAuction] = useState(null)

  const activeAuctions = [
    {
      auctionId: 'auction-1',
      domainName: 'premium-crypto.com',
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-20T18:00:00Z',
      currentBid: 25000,
      reservePrice: 20000,
      bidCount: 15,
      timeRemaining: '1d 8h 45m',
      valuationScore: 95,
      status: 'active'
    },
    {
      auctionId: 'auction-2',
      domainName: 'ai-revolution.io',
      startTime: '2024-01-16T14:00:00Z',
      endTime: '2024-01-21T20:00:00Z',
      currentBid: 18500,
      reservePrice: 15000,
      bidCount: 22,
      timeRemaining: '2d 4h 20m',
      valuationScore: 92,
      status: 'active'
    },
    {
      auctionId: 'auction-3',
      domainName: 'web3-gaming.org',
      startTime: '2024-01-17T09:00:00Z',
      endTime: '2024-01-19T21:00:00Z',
      currentBid: 12000,
      reservePrice: 10000,
      bidCount: 8,
      timeRemaining: '5h 30m',
      valuationScore: 88,
      status: 'active'
    },
    {
      auctionId: 'auction-4',
      domainName: 'fintech-hub.co',
      startTime: '2024-01-14T16:00:00Z',
      endTime: '2024-01-22T12:00:00Z',
      currentBid: 32000,
      reservePrice: 25000,
      bidCount: 31,
      timeRemaining: '3d 14h 10m',
      valuationScore: 97,
      status: 'active'
    },
    {
      auctionId: 'auction-5',
      domainName: 'nft-marketplace.net',
      startTime: '2024-01-18T11:00:00Z',
      endTime: '2024-01-23T17:00:00Z',
      currentBid: 8900,
      reservePrice: 7500,
      bidCount: 12,
      timeRemaining: '4d 6h 55m',
      valuationScore: 84,
      status: 'active'
    },
    {
      auctionId: 'auction-6',
      domainName: 'defi-protocols.dev',
      startTime: '2024-01-15T13:00:00Z',
      endTime: '2024-01-20T15:00:00Z',
      currentBid: 15750,
      reservePrice: 12000,
      bidCount: 19,
      timeRemaining: '1d 17h 25m',
      valuationScore: 89,
      status: 'active'
    }
  ]

  const marketStats = [
    {
      title: 'Active Auctions',
      value: activeAuctions.length,
      icon: Gavel,
      color: 'text-purple-400'
    },
    {
      title: 'Total Volume (24h)',
      value: '$342K',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Active Bidders',
      value: '156',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Avg. Auction Time',
      value: '4.2 days',
      icon: Clock,
      color: 'text-orange-400'
    }
  ]

  const handleBidSubmit = (auctionId, bidAmount) => {
    console.log(`Bid submitted for auction ${auctionId}: $${bidAmount}`)
    // Here you would integrate with blockchain/payment system
    alert(`Bid of $${bidAmount.toLocaleString()} submitted successfully!`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Auction Marketplace</h1>
          <p className="text-dark-text mt-1">Bid on premium domains in real-time auctions</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="gradient-bg text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
            List Domain for Auction
          </button>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-dark-surface rounded-lg p-6 border border-dark-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-text text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Featured Auction */}
      {activeAuctions[0] && (
        <div className="bg-dark-surface rounded-lg p-6 border border-purple-400/50 card-gradient">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Gavel className="mr-2 text-purple-400" size={20} />
              Featured Auction
            </h3>
            <span className="text-purple-300 text-sm font-medium">Ending Soon</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-white">{activeAuctions[0].domainName}</h4>
                <p className="text-dark-text">Premium domain with high market value</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-dark-text">Current Bid</p>
                  <p className="text-xl font-bold text-white">${activeAuctions[0].currentBid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-dark-text">Reserve Price</p>
                  <p className="text-lg font-semibold text-green-400">${activeAuctions[0].reservePrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-dark-text">Total Bids</p>
                  <p className="text-lg font-semibold text-blue-400">{activeAuctions[0].bidCount}</p>
                </div>
                <div>
                  <p className="text-sm text-dark-text">Time Left</p>
                  <p className="text-lg font-semibold text-orange-400">{activeAuctions[0].timeRemaining}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-bg rounded-lg p-4">
              <BidInput
                currentBid={activeAuctions[0].currentBid}
                reservePrice={activeAuctions[0].reservePrice}
                onSubmit={(amount) => handleBidSubmit(activeAuctions[0].auctionId, amount)}
                variant="withMaxBid"
              />
            </div>
          </div>
        </div>
      )}

      {/* All Auctions */}
      <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">All Active Auctions</h3>
          <div className="flex items-center space-x-2 text-sm text-dark-text">
            <span>Sort by:</span>
            <select className="bg-dark-bg border border-dark-border rounded px-2 py-1 text-white">
              <option>Time Remaining</option>
              <option>Current Bid</option>
              <option>Bid Count</option>
              <option>Domain Value</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAuctions.map((auction, index) => (
            <div key={auction.auctionId} className="relative">
              <DomainCard domain={auction} variant="activeAuction" />
              {index === 0 && (
                <div className="absolute -top-2 -right-2">
                  <span className="bg-purple-400 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuctionMarketplace