/**
 * Real-time Service for Domain Auctions Pro
 * Handles WebSocket connections for live auction updates, domain alerts, and market data
 */

import { reservoirService, alchemyService } from './api.js'

/**
 * WebSocket connection manager
 */
class RealtimeManager {
  constructor() {
    this.connections = new Map()
    this.listeners = new Map()
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000
    this.isConnected = false
  }

  /**
   * Create WebSocket connection
   */
  connect(endpoint, options = {}) {
    try {
      const ws = new WebSocket(endpoint)
      
      ws.onopen = () => {
        console.log(`Connected to ${endpoint}`)
        this.isConnected = true
        this.reconnectAttempts = 0
        
        if (options.onOpen) {
          options.onOpen()
        }
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(endpoint, data)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      ws.onclose = () => {
        console.log(`Disconnected from ${endpoint}`)
        this.isConnected = false
        
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => {
            this.reconnectAttempts++
            this.connect(endpoint, options)
          }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts))
        }
      }

      ws.onerror = (error) => {
        console.error(`WebSocket error for ${endpoint}:`, error)
      }

      this.connections.set(endpoint, ws)
      return ws
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      throw error
    }
  }

  /**
   * Handle incoming WebSocket messages
   */
  handleMessage(endpoint, data) {
    const listeners = this.listeners.get(endpoint) || []
    listeners.forEach(callback => {
      try {
        callback(data)
      } catch (error) {
        console.error('Error in WebSocket message handler:', error)
      }
    })
  }

  /**
   * Subscribe to WebSocket messages
   */
  subscribe(endpoint, callback) {
    if (!this.listeners.has(endpoint)) {
      this.listeners.set(endpoint, [])
    }
    this.listeners.get(endpoint).push(callback)
  }

  /**
   * Unsubscribe from WebSocket messages
   */
  unsubscribe(endpoint, callback) {
    const listeners = this.listeners.get(endpoint) || []
    const index = listeners.indexOf(callback)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }

  /**
   * Send message through WebSocket
   */
  send(endpoint, message) {
    const ws = this.connections.get(endpoint)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    } else {
      console.warn(`WebSocket not connected for ${endpoint}`)
    }
  }

  /**
   * Close WebSocket connection
   */
  disconnect(endpoint) {
    const ws = this.connections.get(endpoint)
    if (ws) {
      ws.close()
      this.connections.delete(endpoint)
      this.listeners.delete(endpoint)
    }
  }

  /**
   * Close all connections
   */
  disconnectAll() {
    this.connections.forEach((ws, endpoint) => {
      this.disconnect(endpoint)
    })
  }
}

// Global realtime manager instance
export const realtimeManager = new RealtimeManager()

/**
 * Auction real-time service
 */
export const auctionRealtimeService = {
  /**
   * Subscribe to auction updates
   */
  subscribeToAuction(auctionId, callback) {
    const endpoint = `wss://api.domainauctions.pro/auctions/${auctionId}`
    
    // Mock WebSocket for demo - in production, use actual WebSocket endpoint
    const mockUpdates = () => {
      const mockData = {
        type: 'auction_update',
        auctionId,
        currentBid: Math.floor(Math.random() * 50000) + 10000,
        bidCount: Math.floor(Math.random() * 20) + 1,
        timeRemaining: Math.floor(Math.random() * 86400), // seconds
        lastBidder: '0x' + Math.random().toString(16).substr(2, 40),
        timestamp: new Date().toISOString()
      }
      
      callback(mockData)
    }

    // Simulate real-time updates every 5-15 seconds
    const interval = setInterval(mockUpdates, Math.random() * 10000 + 5000)
    
    return () => clearInterval(interval)
  },

  /**
   * Subscribe to new auctions
   */
  subscribeToNewAuctions(callback) {
    const endpoint = 'wss://api.domainauctions.pro/auctions/new'
    
    // Mock new auction notifications
    const mockNewAuction = () => {
      const domains = [
        'ai-startup.com', 'web3-tools.io', 'crypto-vault.org', 
        'nft-gallery.net', 'defi-protocol.co', 'metaverse-hub.app'
      ]
      
      const mockData = {
        type: 'new_auction',
        auctionId: `auction-${Date.now()}`,
        domainName: domains[Math.floor(Math.random() * domains.length)],
        startingBid: Math.floor(Math.random() * 10000) + 1000,
        duration: 24 * 60 * 60, // 24 hours
        category: ['AI', 'Web3', 'Crypto', 'NFT', 'DeFi'][Math.floor(Math.random() * 5)],
        timestamp: new Date().toISOString()
      }
      
      callback(mockData)
    }

    // Simulate new auctions every 30-60 seconds
    const interval = setInterval(mockNewAuction, Math.random() * 30000 + 30000)
    
    return () => clearInterval(interval)
  },

  /**
   * Subscribe to auction endings
   */
  subscribeToAuctionEndings(callback) {
    const endpoint = 'wss://api.domainauctions.pro/auctions/ending'
    
    // Mock auction ending notifications
    const mockAuctionEnding = () => {
      const mockData = {
        type: 'auction_ending',
        auctionId: `auction-${Date.now() - 86400000}`, // Yesterday
        domainName: 'premium-domain.com',
        finalBid: Math.floor(Math.random() * 100000) + 20000,
        winner: '0x' + Math.random().toString(16).substr(2, 40),
        endTime: new Date(Date.now() + Math.random() * 3600000).toISOString(), // Within 1 hour
        timestamp: new Date().toISOString()
      }
      
      callback(mockData)
    }

    // Simulate auction endings every 2-5 minutes
    const interval = setInterval(mockAuctionEnding, Math.random() * 180000 + 120000)
    
    return () => clearInterval(interval)
  }
}

/**
 * Domain expiration alerts service
 */
export const domainAlertService = {
  /**
   * Subscribe to domain expiration alerts
   */
  subscribeToExpirationAlerts(watchlist, callback) {
    const endpoint = 'wss://api.domainauctions.pro/alerts/expiration'
    
    // Mock expiration alerts based on watchlist
    const mockExpirationAlert = () => {
      if (watchlist.length === 0) return
      
      const randomDomain = watchlist[Math.floor(Math.random() * watchlist.length)]
      const daysUntilExpiry = Math.floor(Math.random() * 30) + 1
      
      const mockData = {
        type: 'expiration_alert',
        domainName: randomDomain.domainName,
        expiryDate: new Date(Date.now() + daysUntilExpiry * 24 * 60 * 60 * 1000).toISOString(),
        daysRemaining: daysUntilExpiry,
        alertLevel: daysUntilExpiry <= 7 ? 'urgent' : daysUntilExpiry <= 14 ? 'warning' : 'info',
        registrar: 'GoDaddy',
        renewalPrice: Math.floor(Math.random() * 100) + 10,
        timestamp: new Date().toISOString()
      }
      
      callback(mockData)
    }

    // Check for expiration alerts every 10-20 minutes
    const interval = setInterval(mockExpirationAlert, Math.random() * 600000 + 600000)
    
    return () => clearInterval(interval)
  },

  /**
   * Subscribe to price drop alerts
   */
  subscribeToPriceDropAlerts(watchlist, callback) {
    const endpoint = 'wss://api.domainauctions.pro/alerts/price-drops'
    
    // Mock price drop alerts
    const mockPriceDropAlert = () => {
      if (watchlist.length === 0) return
      
      const randomDomain = watchlist[Math.floor(Math.random() * watchlist.length)]
      const dropPercentage = Math.floor(Math.random() * 30) + 10 // 10-40% drop
      
      const mockData = {
        type: 'price_drop_alert',
        domainName: randomDomain.domainName,
        previousPrice: Math.floor(Math.random() * 50000) + 10000,
        currentPrice: 0, // Will be calculated
        dropPercentage,
        reason: 'Market correction',
        timestamp: new Date().toISOString()
      }
      
      mockData.currentPrice = Math.floor(mockData.previousPrice * (1 - dropPercentage / 100))
      
      callback(mockData)
    }

    // Check for price drops every 15-30 minutes
    const interval = setInterval(mockPriceDropAlert, Math.random() * 900000 + 900000)
    
    return () => clearInterval(interval)
  }
}

/**
 * Market data real-time service
 */
export const marketRealtimeService = {
  /**
   * Subscribe to market trends
   */
  subscribeToMarketTrends(callback) {
    const endpoint = 'wss://api.domainauctions.pro/market/trends'
    
    // Mock market trend updates
    const mockMarketUpdate = () => {
      const mockData = {
        type: 'market_update',
        totalVolume: Math.floor(Math.random() * 1000000) + 500000,
        averagePrice: Math.floor(Math.random() * 20000) + 5000,
        activeAuctions: Math.floor(Math.random() * 100) + 20,
        change24h: (Math.random() - 0.5) * 20, // -10% to +10%
        topCategories: [
          { name: 'AI/Tech', volume: Math.floor(Math.random() * 200000) + 100000 },
          { name: 'Crypto/Web3', volume: Math.floor(Math.random() * 150000) + 80000 },
          { name: 'Finance', volume: Math.floor(Math.random() * 100000) + 50000 }
        ],
        timestamp: new Date().toISOString()
      }
      
      callback(mockData)
    }

    // Update market data every 30 seconds
    const interval = setInterval(mockMarketUpdate, 30000)
    
    return () => clearInterval(interval)
  },

  /**
   * Subscribe to trending keywords
   */
  subscribeToTrendingKeywords(callback) {
    const endpoint = 'wss://api.domainauctions.pro/market/keywords'
    
    // Mock trending keywords updates
    const mockKeywordUpdate = () => {
      const keywords = ['AI', 'Web3', 'DeFi', 'NFT', 'Crypto', 'Metaverse', 'DAO', 'Blockchain']
      const trendingKeywords = keywords.map(keyword => ({
        keyword,
        volume: Math.floor(Math.random() * 300) + 50,
        change: (Math.random() - 0.5) * 50, // -25% to +25%
        category: keyword === 'AI' ? 'Technology' : 'Crypto'
      })).sort((a, b) => b.volume - a.volume).slice(0, 5)
      
      const mockData = {
        type: 'trending_keywords',
        keywords: trendingKeywords,
        timestamp: new Date().toISOString()
      }
      
      callback(mockData)
    }

    // Update trending keywords every 2 minutes
    const interval = setInterval(mockKeywordUpdate, 120000)
    
    return () => clearInterval(interval)
  }
}

/**
 * Notification service
 */
export const notificationService = {
  /**
   * Show browser notification
   */
  async showNotification(title, options = {}) {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications')
      return
    }

    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      })
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        new Notification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          ...options
        })
      }
    }
  },

  /**
   * Request notification permission
   */
  async requestPermission() {
    if (!('Notification' in window)) {
      return 'not-supported'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission === 'denied') {
      return 'denied'
    }

    const permission = await Notification.requestPermission()
    return permission
  }
}

/**
 * React hooks for real-time features
 */
export const useRealtimeAuction = (auctionId) => {
  const [auctionData, setAuctionData] = React.useState(null)
  const [isConnected, setIsConnected] = React.useState(false)

  React.useEffect(() => {
    if (!auctionId) return

    setIsConnected(true)
    const unsubscribe = auctionRealtimeService.subscribeToAuction(auctionId, (data) => {
      setAuctionData(data)
    })

    return () => {
      setIsConnected(false)
      unsubscribe()
    }
  }, [auctionId])

  return { auctionData, isConnected }
}

export const useRealtimeMarket = () => {
  const [marketData, setMarketData] = React.useState(null)
  const [trendingKeywords, setTrendingKeywords] = React.useState([])

  React.useEffect(() => {
    const unsubscribeMarket = marketRealtimeService.subscribeToMarketTrends(setMarketData)
    const unsubscribeKeywords = marketRealtimeService.subscribeToTrendingKeywords((data) => {
      setTrendingKeywords(data.keywords)
    })

    return () => {
      unsubscribeMarket()
      unsubscribeKeywords()
    }
  }, [])

  return { marketData, trendingKeywords }
}

export const useDomainAlerts = (watchlist) => {
  const [alerts, setAlerts] = React.useState([])

  React.useEffect(() => {
    if (!watchlist || watchlist.length === 0) return

    const handleAlert = (alert) => {
      setAlerts(prev => [alert, ...prev.slice(0, 9)]) // Keep last 10 alerts
      
      // Show browser notification for urgent alerts
      if (alert.alertLevel === 'urgent') {
        notificationService.showNotification(
          `Domain Expiring Soon: ${alert.domainName}`,
          {
            body: `${alert.domainName} expires in ${alert.daysRemaining} days`,
            tag: 'domain-expiration'
          }
        )
      }
    }

    const unsubscribeExpiration = domainAlertService.subscribeToExpirationAlerts(watchlist, handleAlert)
    const unsubscribePriceDrop = domainAlertService.subscribeToPriceDropAlerts(watchlist, handleAlert)

    return () => {
      unsubscribeExpiration()
      unsubscribePriceDrop()
    }
  }, [watchlist])

  return { alerts }
}

export default {
  manager: realtimeManager,
  auction: auctionRealtimeService,
  alerts: domainAlertService,
  market: marketRealtimeService,
  notifications: notificationService
}
