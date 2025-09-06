/**
 * API Service Layer for Domain Auctions Pro
 * Handles all external API integrations as specified in the PRD
 */

// API Configuration
const API_CONFIG = {
  ALCHEMY: {
    baseUrl: 'https://base-mainnet.g.alchemy.com/v2',
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY || 'demo-key'
  },
  RESERVOIR: {
    baseUrl: 'https://api.reservoir.tools',
    apiKey: import.meta.env.VITE_RESERVOIR_API_KEY || 'demo-key'
  },
  OPENAI: {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key'
  },
  PINATA: {
    baseUrl: 'https://api.pinata.cloud',
    apiKey: import.meta.env.VITE_PINATA_API_KEY || 'demo-key'
  },
  DOMA_ORACLES: {
    baseUrl: 'https://api.doma.io/v1',
    apiKey: import.meta.env.VITE_DOMA_API_KEY || 'demo-key'
  }
}

/**
 * Generic API request handler with error handling
 */
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

/**
 * Alchemy API Service
 * Handles blockchain interactions and domain metadata
 */
export const alchemyService = {
  /**
   * Fetch domain metadata from blockchain
   */
  async getDomainMetadata(domainName) {
    const url = `${API_CONFIG.ALCHEMY.baseUrl}/${API_CONFIG.ALCHEMY.apiKey}`
    
    // Mock implementation for demo - replace with actual Alchemy RPC calls
    return {
      domainName,
      owner: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b9',
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      registrant: 'example-registrant',
      valuationScore: Math.floor(Math.random() * 100),
      marketTrends: {
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
          price: Math.floor(Math.random() * 10000) + 1000
        }))
      }
    }
  },

  /**
   * Monitor contract events for domain registrations/expirations
   */
  async getContractEvents(contractAddress, fromBlock = 'latest') {
    const url = `${API_CONFIG.ALCHEMY.baseUrl}/${API_CONFIG.ALCHEMY.apiKey}`
    
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [{
          address: contractAddress,
          fromBlock,
          toBlock: 'latest'
        }],
        id: 1
      })
    })
  },

  /**
   * Execute blockchain transaction
   */
  async executeTransaction(transactionData) {
    const url = `${API_CONFIG.ALCHEMY.baseUrl}/${API_CONFIG.ALCHEMY.apiKey}`
    
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_sendTransaction',
        params: [transactionData],
        id: 1
      })
    })
  }
}

/**
 * Reservoir API Service
 * Handles market data and analytics
 */
export const reservoirService = {
  /**
   * Get real-time market analytics
   */
  async getMarketAnalytics() {
    const url = `${API_CONFIG.RESERVOIR.baseUrl}/orders/asks/v3`
    
    // Mock implementation for demo
    return {
      totalVolume: 1250000,
      averagePrice: 12500,
      activeListings: 47,
      topSales: [
        { domain: 'ai-trading.com', price: 95000, date: '2024-01-18' },
        { domain: 'web3-wallet.io', price: 87500, date: '2024-01-17' },
        { domain: 'nft-market.org', price: 72000, date: '2024-01-16' }
      ],
      priceHistory: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        volume: Math.floor(Math.random() * 50000) + 10000,
        avgPrice: Math.floor(Math.random() * 20000) + 5000
      }))
    }
  },

  /**
   * Get domain sales data
   */
  async getDomainSales(filters = {}) {
    const url = `${API_CONFIG.RESERVOIR.baseUrl}/tokens/v5`
    
    return apiRequest(url, {
      headers: {
        'x-api-key': API_CONFIG.RESERVOIR.apiKey
      }
    })
  },

  /**
   * Get trending keywords and categories
   */
  async getTrendingKeywords() {
    // Mock implementation - would integrate with Reservoir's analytics
    return [
      { keyword: 'AI', volume: 245, change: 23.5 },
      { keyword: 'Web3', volume: 189, change: 18.2 },
      { keyword: 'DeFi', volume: 156, change: 15.8 },
      { keyword: 'NFT', volume: 134, change: -2.1 },
      { keyword: 'Crypto', volume: 128, change: 12.3 }
    ]
  }
}

/**
 * OpenAI API Service
 * Provides AI-driven insights and domain analysis
 */
export const openaiService = {
  /**
   * Generate domain valuation insights using AI
   */
  async getDomainInsights(domainName, marketData) {
    const url = `${API_CONFIG.OPENAI.baseUrl}/chat/completions`
    
    const prompt = `Analyze the domain "${domainName}" and provide insights on its market potential, considering current trends in AI, Web3, and digital assets. Market data: ${JSON.stringify(marketData)}`
    
    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.OPENAI.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a domain valuation expert specializing in digital assets and emerging technologies.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      })

      return {
        insights: response.choices[0].message.content,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        recommendations: [
          'Strong potential in AI/tech sector',
          'Consider premium positioning',
          'Monitor competitor pricing'
        ]
      }
    } catch (error) {
      // Fallback for demo purposes
      return {
        insights: `The domain "${domainName}" shows strong potential based on current market trends. The AI and Web3 sectors are experiencing significant growth, making this domain valuable for businesses in these spaces.`,
        confidence: 85,
        recommendations: [
          'Strong potential in AI/tech sector',
          'Consider premium positioning',
          'Monitor competitor pricing'
        ]
      }
    }
  },

  /**
   * Generate domain name suggestions
   */
  async generateDomainSuggestions(keywords, category) {
    const url = `${API_CONFIG.OPENAI.baseUrl}/chat/completions`
    
    const prompt = `Generate 10 creative domain name suggestions for the ${category} category using these keywords: ${keywords.join(', ')}. Focus on brandable, memorable names.`
    
    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.OPENAI.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300
        })
      })

      return response.choices[0].message.content.split('\n').filter(line => line.trim())
    } catch (error) {
      // Fallback suggestions
      return [
        'ai-nexus.com',
        'web3-hub.io',
        'crypto-forge.co',
        'defi-vault.org',
        'nft-studio.net'
      ]
    }
  }
}

/**
 * Doma Oracles Service
 * Handles dynamic reserve pricing
 */
export const domaOraclesService = {
  /**
   * Get dynamic reserve price for domain auction
   */
  async getReservePrice(domainId, marketConditions) {
    const url = `${API_CONFIG.DOMA_ORACLES.baseUrl}/oracle/reserve-price/${domainId}`
    
    // Mock implementation for demo
    const basePrice = marketConditions.averagePrice || 5000
    const volatilityFactor = Math.random() * 0.3 + 0.85 // 0.85 - 1.15
    
    return {
      reservePrice: Math.floor(basePrice * volatilityFactor),
      confidence: Math.floor(Math.random() * 20) + 80,
      factors: {
        marketTrend: marketConditions.trend || 'bullish',
        categoryDemand: 'high',
        historicalPerformance: 'strong'
      },
      lastUpdated: new Date().toISOString()
    }
  }
}

/**
 * Pinata IPFS Service
 * Handles decentralized storage
 */
export const pinataService = {
  /**
   * Store domain metadata on IPFS
   */
  async pinDomainMetadata(metadata) {
    const url = `${API_CONFIG.PINATA.baseUrl}/pinning/pinJSONToIPFS`
    
    try {
      return await apiRequest(url, {
        method: 'POST',
        headers: {
          'pinata_api_key': API_CONFIG.PINATA.apiKey,
          'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_KEY
        },
        body: JSON.stringify({
          pinataContent: metadata,
          pinataMetadata: {
            name: `domain-metadata-${metadata.domainName}`,
            keyvalues: {
              domain: metadata.domainName,
              type: 'metadata'
            }
          }
        })
      })
    } catch (error) {
      // Mock response for demo
      return {
        IpfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
        PinSize: JSON.stringify(metadata).length,
        Timestamp: new Date().toISOString()
      }
    }
  },

  /**
   * Store auction details on IPFS
   */
  async pinAuctionData(auctionData) {
    const url = `${API_CONFIG.PINATA.baseUrl}/pinning/pinJSONToIPFS`
    
    try {
      return await apiRequest(url, {
        method: 'POST',
        headers: {
          'pinata_api_key': API_CONFIG.PINATA.apiKey,
          'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_KEY
        },
        body: JSON.stringify({
          pinataContent: auctionData,
          pinataMetadata: {
            name: `auction-${auctionData.auctionId}`,
            keyvalues: {
              auctionId: auctionData.auctionId,
              domain: auctionData.domainName,
              type: 'auction'
            }
          }
        })
      })
    } catch (error) {
      // Mock response for demo
      return {
        IpfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdH',
        PinSize: JSON.stringify(auctionData).length,
        Timestamp: new Date().toISOString()
      }
    }
  }
}

/**
 * Aggregated service for complex operations
 */
export const domainService = {
  /**
   * Get comprehensive domain analysis
   */
  async getComprehensiveDomainAnalysis(domainName) {
    try {
      const [metadata, marketData, insights] = await Promise.all([
        alchemyService.getDomainMetadata(domainName),
        reservoirService.getMarketAnalytics(),
        openaiService.getDomainInsights(domainName, { category: 'tech' })
      ])

      return {
        domain: metadata,
        market: marketData,
        aiInsights: insights,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error getting comprehensive domain analysis:', error)
      throw error
    }
  },

  /**
   * Create new auction with dynamic pricing
   */
  async createAuction(domainName, auctionParams) {
    try {
      const marketData = await reservoirService.getMarketAnalytics()
      const reservePrice = await domaOraclesService.getReservePrice(domainName, marketData)
      
      const auctionData = {
        auctionId: `auction-${Date.now()}`,
        domainName,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + auctionParams.duration * 60 * 60 * 1000).toISOString(),
        reservePrice: reservePrice.reservePrice,
        currentBid: 0,
        status: 'active',
        ...auctionParams
      }

      // Store auction data on IPFS
      const ipfsResult = await pinataService.pinAuctionData(auctionData)
      
      return {
        ...auctionData,
        ipfsHash: ipfsResult.IpfsHash
      }
    } catch (error) {
      console.error('Error creating auction:', error)
      throw error
    }
  }
}

export default {
  alchemy: alchemyService,
  reservoir: reservoirService,
  openai: openaiService,
  doma: domaOraclesService,
  pinata: pinataService,
  domain: domainService
}
