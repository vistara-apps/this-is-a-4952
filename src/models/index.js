/**
 * Data Models for Domain Auctions Pro
 * Implements the exact data model structure from the PRD
 */

/**
 * User Entity
 * Represents a user in the system with subscription and transaction data
 */
export class User {
  constructor(data = {}) {
    this.userId = data.userId || this.generateUUID()
    this.email = data.email || ''
    this.subscriptionTier = data.subscriptionTier || 'Basic' // Basic, Pro
    this.watchlistDomains = data.watchlistDomains || []
    this.transactionHistory = data.transactionHistory || []
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
    
    // Additional user properties
    this.preferences = data.preferences || {
      notifications: {
        email: true,
        push: true,
        browser: true
      },
      defaultCurrency: 'ETH',
      timezone: 'UTC'
    }
    
    this.walletAddress = data.walletAddress || null
    this.isVerified = data.isVerified || false
  }

  generateUUID() {
    return 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  addToWatchlist(domainName) {
    if (!this.watchlistDomains.includes(domainName)) {
      this.watchlistDomains.push(domainName)
      this.updatedAt = new Date().toISOString()
    }
  }

  removeFromWatchlist(domainName) {
    this.watchlistDomains = this.watchlistDomains.filter(name => name !== domainName)
    this.updatedAt = new Date().toISOString()
  }

  addTransaction(transaction) {
    this.transactionHistory.unshift(transaction)
    this.updatedAt = new Date().toISOString()
  }

  toJSON() {
    return {
      userId: this.userId,
      email: this.email,
      subscriptionTier: this.subscriptionTier,
      watchlistDomains: this.watchlistDomains,
      transactionHistory: this.transactionHistory,
      preferences: this.preferences,
      walletAddress: this.walletAddress,
      isVerified: this.isVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

/**
 * Domain Entity
 * Represents a domain with all its metadata and market information
 */
export class Domain {
  constructor(data = {}) {
    this.domainName = data.domainName || ''
    this.expiryDate = data.expiryDate || null
    this.registrant = data.registrant || ''
    this.valuationScore = data.valuationScore || 0 // 0-100
    this.marketTrends = data.marketTrends || {
      priceHistory: [],
      volumeHistory: [],
      popularityScore: 0
    }
    this.auctionStatus = data.auctionStatus || 'available' // available, auction, sold, expired
    
    // Additional domain properties
    this.category = data.category || 'General'
    this.keywords = data.keywords || []
    this.tld = data.tld || this.extractTLD(this.domainName)
    this.length = this.domainName.length
    this.registrar = data.registrar || ''
    this.whoisData = data.whoisData || {}
    this.seoMetrics = data.seoMetrics || {
      backlinks: 0,
      domainAuthority: 0,
      trafficEstimate: 0
    }
    this.socialMetrics = data.socialMetrics || {
      mentions: 0,
      sentiment: 'neutral'
    }
    
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  extractTLD(domainName) {
    const parts = domainName.split('.')
    return parts.length > 1 ? parts[parts.length - 1] : ''
  }

  isExpiringSoon(days = 30) {
    if (!this.expiryDate) return false
    const expiryTime = new Date(this.expiryDate).getTime()
    const thresholdTime = Date.now() + (days * 24 * 60 * 60 * 1000)
    return expiryTime <= thresholdTime
  }

  getDaysUntilExpiry() {
    if (!this.expiryDate) return null
    const expiryTime = new Date(this.expiryDate).getTime()
    const now = Date.now()
    const diffTime = expiryTime - now
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  updateValuation(newScore, factors = {}) {
    this.valuationScore = Math.max(0, Math.min(100, newScore))
    this.marketTrends.lastValuationUpdate = new Date().toISOString()
    this.marketTrends.valuationFactors = factors
    this.updatedAt = new Date().toISOString()
  }

  addPricePoint(price, timestamp = null) {
    this.marketTrends.priceHistory.push({
      price,
      timestamp: timestamp || new Date().toISOString()
    })
    
    // Keep only last 100 price points
    if (this.marketTrends.priceHistory.length > 100) {
      this.marketTrends.priceHistory = this.marketTrends.priceHistory.slice(-100)
    }
    
    this.updatedAt = new Date().toISOString()
  }

  toJSON() {
    return {
      domainName: this.domainName,
      expiryDate: this.expiryDate,
      registrant: this.registrant,
      valuationScore: this.valuationScore,
      marketTrends: this.marketTrends,
      auctionStatus: this.auctionStatus,
      category: this.category,
      keywords: this.keywords,
      tld: this.tld,
      length: this.length,
      registrar: this.registrar,
      whoisData: this.whoisData,
      seoMetrics: this.seoMetrics,
      socialMetrics: this.socialMetrics,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

/**
 * WatchlistEntry Entity
 * Represents a user's watchlist entry for a specific domain
 */
export class WatchlistEntry {
  constructor(data = {}) {
    this.userId = data.userId || ''
    this.domainName = data.domainName || ''
    this.notificationPreference = data.notificationPreference || 'email' // email, push, both, none
    this.alertThresholds = data.alertThresholds || {
      priceDropPercentage: 10,
      daysBeforeExpiry: 30,
      valuationChange: 5
    }
    this.notes = data.notes || ''
    this.tags = data.tags || []
    this.priority = data.priority || 'medium' // low, medium, high
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  updateNotificationPreference(preference) {
    this.notificationPreference = preference
    this.updatedAt = new Date().toISOString()
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag)
      this.updatedAt = new Date().toISOString()
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag)
    this.updatedAt = new Date().toISOString()
  }

  toJSON() {
    return {
      userId: this.userId,
      domainName: this.domainName,
      notificationPreference: this.notificationPreference,
      alertThresholds: this.alertThresholds,
      notes: this.notes,
      tags: this.tags,
      priority: this.priority,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

/**
 * Auction Entity
 * Represents a domain auction with all bidding information
 */
export class Auction {
  constructor(data = {}) {
    this.auctionId = data.auctionId || this.generateAuctionId()
    this.domainName = data.domainName || ''
    this.startTime = data.startTime || new Date().toISOString()
    this.endTime = data.endTime || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    this.currentBid = data.currentBid || 0
    this.reservePrice = data.reservePrice || 0
    this.status = data.status || 'active' // active, ended, cancelled
    
    // Additional auction properties
    this.startingBid = data.startingBid || 0
    this.bidIncrement = data.bidIncrement || 100
    this.sellerId = data.sellerId || ''
    this.auctionType = data.auctionType || 'english' // english, dutch, sealed
    this.autoExtend = data.autoExtend || true
    this.extensionTime = data.extensionTime || 300 // seconds
    this.category = data.category || 'General'
    this.description = data.description || ''
    this.images = data.images || []
    this.featured = data.featured || false
    
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  generateAuctionId() {
    return 'auction-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  isActive() {
    const now = Date.now()
    const startTime = new Date(this.startTime).getTime()
    const endTime = new Date(this.endTime).getTime()
    return this.status === 'active' && now >= startTime && now < endTime
  }

  getTimeRemaining() {
    if (!this.isActive()) return 0
    const now = Date.now()
    const endTime = new Date(this.endTime).getTime()
    return Math.max(0, endTime - now)
  }

  getTimeRemainingFormatted() {
    const remaining = this.getTimeRemaining()
    if (remaining === 0) return 'Ended'
    
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  updateCurrentBid(newBid, bidder) {
    if (newBid > this.currentBid) {
      this.currentBid = newBid
      this.lastBidder = bidder
      this.updatedAt = new Date().toISOString()
      
      // Auto-extend if bid placed in last 5 minutes
      if (this.autoExtend) {
        const timeRemaining = this.getTimeRemaining()
        if (timeRemaining < this.extensionTime * 1000) {
          this.endTime = new Date(Date.now() + this.extensionTime * 1000).toISOString()
        }
      }
      
      return true
    }
    return false
  }

  endAuction(winner = null) {
    this.status = 'ended'
    this.winner = winner
    this.finalPrice = this.currentBid
    this.endedAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

  toJSON() {
    return {
      auctionId: this.auctionId,
      domainName: this.domainName,
      startTime: this.startTime,
      endTime: this.endTime,
      currentBid: this.currentBid,
      reservePrice: this.reservePrice,
      status: this.status,
      startingBid: this.startingBid,
      bidIncrement: this.bidIncrement,
      sellerId: this.sellerId,
      auctionType: this.auctionType,
      autoExtend: this.autoExtend,
      extensionTime: this.extensionTime,
      category: this.category,
      description: this.description,
      images: this.images,
      featured: this.featured,
      lastBidder: this.lastBidder,
      winner: this.winner,
      finalPrice: this.finalPrice,
      endedAt: this.endedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

/**
 * Bid Entity
 * Represents a bid placed in an auction
 */
export class Bid {
  constructor(data = {}) {
    this.bidId = data.bidId || this.generateBidId()
    this.auctionId = data.auctionId || ''
    this.userId = data.userId || ''
    this.bidAmount = data.bidAmount || 0
    this.timestamp = data.timestamp || new Date().toISOString()
    this.status = data.status || 'active' // active, outbid, winning, won, lost
    this.transactionHash = data.transactionHash || null
    this.gasUsed = data.gasUsed || null
    this.gasFee = data.gasFee || null
    this.isAutoBid = data.isAutoBid || false
    this.maxBidAmount = data.maxBidAmount || null // For auto-bidding
  }

  generateBidId() {
    return 'bid-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  markAsOutbid() {
    this.status = 'outbid'
    this.outbidAt = new Date().toISOString()
  }

  markAsWinning() {
    this.status = 'winning'
  }

  markAsWon() {
    this.status = 'won'
    this.wonAt = new Date().toISOString()
  }

  markAsLost() {
    this.status = 'lost'
    this.lostAt = new Date().toISOString()
  }

  toJSON() {
    return {
      bidId: this.bidId,
      auctionId: this.auctionId,
      userId: this.userId,
      bidAmount: this.bidAmount,
      timestamp: this.timestamp,
      status: this.status,
      transactionHash: this.transactionHash,
      gasUsed: this.gasUsed,
      gasFee: this.gasFee,
      isAutoBid: this.isAutoBid,
      maxBidAmount: this.maxBidAmount,
      outbidAt: this.outbidAt,
      wonAt: this.wonAt,
      lostAt: this.lostAt
    }
  }
}

/**
 * Transaction Entity
 * Represents a blockchain transaction
 */
export class Transaction {
  constructor(data = {}) {
    this.transactionId = data.transactionId || this.generateTransactionId()
    this.userId = data.userId || ''
    this.type = data.type || 'bid' // bid, purchase, auction_creation, transfer
    this.amount = data.amount || 0
    this.currency = data.currency || 'ETH'
    this.domainName = data.domainName || ''
    this.auctionId = data.auctionId || null
    this.transactionHash = data.transactionHash || ''
    this.blockNumber = data.blockNumber || null
    this.gasUsed = data.gasUsed || null
    this.gasFee = data.gasFee || null
    this.status = data.status || 'pending' // pending, confirmed, failed
    this.timestamp = data.timestamp || new Date().toISOString()
    this.confirmations = data.confirmations || 0
    this.fromAddress = data.fromAddress || ''
    this.toAddress = data.toAddress || ''
    this.metadata = data.metadata || {}
  }

  generateTransactionId() {
    return 'tx-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  confirm(blockNumber, confirmations = 1) {
    this.status = 'confirmed'
    this.blockNumber = blockNumber
    this.confirmations = confirmations
    this.confirmedAt = new Date().toISOString()
  }

  fail(reason = '') {
    this.status = 'failed'
    this.failureReason = reason
    this.failedAt = new Date().toISOString()
  }

  toJSON() {
    return {
      transactionId: this.transactionId,
      userId: this.userId,
      type: this.type,
      amount: this.amount,
      currency: this.currency,
      domainName: this.domainName,
      auctionId: this.auctionId,
      transactionHash: this.transactionHash,
      blockNumber: this.blockNumber,
      gasUsed: this.gasUsed,
      gasFee: this.gasFee,
      status: this.status,
      timestamp: this.timestamp,
      confirmations: this.confirmations,
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      metadata: this.metadata,
      confirmedAt: this.confirmedAt,
      failedAt: this.failedAt,
      failureReason: this.failureReason
    }
  }
}

/**
 * Model factory functions
 */
export const ModelFactory = {
  createUser: (data) => new User(data),
  createDomain: (data) => new Domain(data),
  createWatchlistEntry: (data) => new WatchlistEntry(data),
  createAuction: (data) => new Auction(data),
  createBid: (data) => new Bid(data),
  createTransaction: (data) => new Transaction(data),
  
  // Validation functions
  validateUser: (userData) => {
    const required = ['email']
    return required.every(field => userData[field])
  },
  
  validateDomain: (domainData) => {
    const required = ['domainName']
    return required.every(field => domainData[field])
  },
  
  validateAuction: (auctionData) => {
    const required = ['domainName', 'startTime', 'endTime']
    return required.every(field => auctionData[field])
  },
  
  validateBid: (bidData) => {
    const required = ['auctionId', 'userId', 'bidAmount']
    return required.every(field => bidData[field]) && bidData.bidAmount > 0
  }
}

export default {
  User,
  Domain,
  WatchlistEntry,
  Auction,
  Bid,
  Transaction,
  ModelFactory
}
