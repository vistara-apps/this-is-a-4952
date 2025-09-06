/**
 * Wallet Integration Service for Domain Auctions Pro
 * Handles wallet connections and blockchain transactions using Turnkey/Privy
 */

import { alchemyService } from './api.js'

// Wallet Configuration
const WALLET_CONFIG = {
  PRIVY: {
    appId: import.meta.env.VITE_PRIVY_APP_ID || 'demo-app-id',
    baseUrl: 'https://auth.privy.io'
  },
  TURNKEY: {
    apiKey: import.meta.env.VITE_TURNKEY_API_KEY || 'demo-key',
    baseUrl: 'https://api.turnkey.com'
  },
  SUPPORTED_CHAINS: {
    BASE: {
      chainId: 8453,
      name: 'Base',
      rpcUrl: 'https://mainnet.base.org',
      blockExplorer: 'https://basescan.org'
    },
    BASE_SEPOLIA: {
      chainId: 84532,
      name: 'Base Sepolia',
      rpcUrl: 'https://sepolia.base.org',
      blockExplorer: 'https://sepolia.basescan.org'
    }
  }
}

/**
 * Wallet state management
 */
class WalletManager {
  constructor() {
    this.isConnected = false
    this.address = null
    this.provider = null
    this.signer = null
    this.chainId = null
    this.balance = '0'
    this.listeners = new Set()
  }

  /**
   * Add event listener for wallet state changes
   */
  addEventListener(callback) {
    this.listeners.add(callback)
  }

  /**
   * Remove event listener
   */
  removeEventListener(callback) {
    this.listeners.delete(callback)
  }

  /**
   * Notify all listeners of state changes
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      callback({
        isConnected: this.isConnected,
        address: this.address,
        chainId: this.chainId,
        balance: this.balance
      })
    })
  }

  /**
   * Update wallet state
   */
  updateState(newState) {
    Object.assign(this, newState)
    this.notifyListeners()
  }
}

// Global wallet manager instance
export const walletManager = new WalletManager()

/**
 * Privy Integration Service
 */
export const privyService = {
  /**
   * Initialize Privy authentication
   */
  async initialize() {
    try {
      // In a real implementation, you would initialize the Privy SDK here
      console.log('Initializing Privy authentication...')
      
      // Mock initialization for demo
      return {
        success: true,
        appId: WALLET_CONFIG.PRIVY.appId
      }
    } catch (error) {
      console.error('Failed to initialize Privy:', error)
      throw error
    }
  },

  /**
   * Connect wallet using Privy
   */
  async connectWallet() {
    try {
      // Mock wallet connection for demo
      const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b9'
      const mockChainId = WALLET_CONFIG.SUPPORTED_CHAINS.BASE.chainId
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update wallet state
      walletManager.updateState({
        isConnected: true,
        address: mockAddress,
        chainId: mockChainId,
        balance: '1.5' // ETH
      })

      return {
        address: mockAddress,
        chainId: mockChainId,
        provider: 'privy'
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  },

  /**
   * Disconnect wallet
   */
  async disconnectWallet() {
    try {
      walletManager.updateState({
        isConnected: false,
        address: null,
        chainId: null,
        balance: '0'
      })

      return { success: true }
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
      throw error
    }
  },

  /**
   * Get user authentication status
   */
  async getAuthStatus() {
    return {
      isAuthenticated: walletManager.isConnected,
      user: walletManager.isConnected ? {
        address: walletManager.address,
        chainId: walletManager.chainId
      } : null
    }
  }
}

/**
 * Turnkey Integration Service
 */
export const turnkeyService = {
  /**
   * Create new wallet using Turnkey
   */
  async createWallet(userId) {
    try {
      const url = `${WALLET_CONFIG.TURNKEY.baseUrl}/wallets/create`
      
      // Mock wallet creation for demo
      const mockWalletData = {
        walletId: `wallet-${Date.now()}`,
        address: '0x' + Math.random().toString(16).substr(2, 40),
        userId,
        createdAt: new Date().toISOString()
      }

      return mockWalletData
    } catch (error) {
      console.error('Failed to create Turnkey wallet:', error)
      throw error
    }
  },

  /**
   * Sign transaction using Turnkey
   */
  async signTransaction(transactionData) {
    try {
      if (!walletManager.isConnected) {
        throw new Error('Wallet not connected')
      }

      // Mock transaction signing
      const signedTransaction = {
        ...transactionData,
        signature: '0x' + Math.random().toString(16).substr(2, 130),
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        timestamp: new Date().toISOString()
      }

      return signedTransaction
    } catch (error) {
      console.error('Failed to sign transaction:', error)
      throw error
    }
  }
}

/**
 * Blockchain Transaction Service
 */
export const transactionService = {
  /**
   * Place bid in auction
   */
  async placeBid(auctionId, bidAmount) {
    try {
      if (!walletManager.isConnected) {
        throw new Error('Please connect your wallet first')
      }

      // Validate bid amount
      if (bidAmount <= 0) {
        throw new Error('Bid amount must be greater than 0')
      }

      // Check wallet balance
      const balance = parseFloat(walletManager.balance)
      if (balance < bidAmount) {
        throw new Error('Insufficient balance')
      }

      // Prepare transaction data
      const transactionData = {
        to: '0x1234567890123456789012345678901234567890', // Mock auction contract
        value: bidAmount.toString(),
        data: `0x${auctionId}`, // Mock contract call data
        gasLimit: '21000',
        gasPrice: '20000000000' // 20 gwei
      }

      // Sign transaction
      const signedTx = await turnkeyService.signTransaction(transactionData)

      // Execute transaction via Alchemy
      const result = await alchemyService.executeTransaction(signedTx)

      return {
        success: true,
        transactionHash: result.hash || signedTx.hash,
        auctionId,
        bidAmount,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('Failed to place bid:', error)
      throw error
    }
  },

  /**
   * Purchase domain directly
   */
  async purchaseDomain(domainName, price) {
    try {
      if (!walletManager.isConnected) {
        throw new Error('Please connect your wallet first')
      }

      const transactionData = {
        to: '0x1234567890123456789012345678901234567890', // Mock domain contract
        value: price.toString(),
        data: `0x${Buffer.from(domainName).toString('hex')}`,
        gasLimit: '50000',
        gasPrice: '20000000000'
      }

      const signedTx = await turnkeyService.signTransaction(transactionData)
      const result = await alchemyService.executeTransaction(signedTx)

      return {
        success: true,
        transactionHash: result.hash || signedTx.hash,
        domainName,
        price,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('Failed to purchase domain:', error)
      throw error
    }
  },

  /**
   * Create new auction
   */
  async createAuction(domainName, startingBid, duration) {
    try {
      if (!walletManager.isConnected) {
        throw new Error('Please connect your wallet first')
      }

      const transactionData = {
        to: '0x1234567890123456789012345678901234567890', // Mock auction factory
        value: '0',
        data: `0x${Buffer.from(JSON.stringify({
          domain: domainName,
          startingBid,
          duration
        })).toString('hex')}`,
        gasLimit: '100000',
        gasPrice: '20000000000'
      }

      const signedTx = await turnkeyService.signTransaction(transactionData)
      const result = await alchemyService.executeTransaction(signedTx)

      return {
        success: true,
        transactionHash: result.hash || signedTx.hash,
        auctionId: `auction-${Date.now()}`,
        domainName,
        startingBid,
        duration,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('Failed to create auction:', error)
      throw error
    }
  },

  /**
   * Get transaction history
   */
  async getTransactionHistory(address = null) {
    try {
      const targetAddress = address || walletManager.address
      
      if (!targetAddress) {
        throw new Error('No address provided')
      }

      // Mock transaction history
      return [
        {
          hash: '0xabc123...',
          type: 'bid',
          amount: '0.5',
          domain: 'crypto-exchange.com',
          timestamp: '2024-01-18T10:30:00Z',
          status: 'confirmed'
        },
        {
          hash: '0xdef456...',
          type: 'purchase',
          amount: '2.1',
          domain: 'ai-tools.io',
          timestamp: '2024-01-17T15:45:00Z',
          status: 'confirmed'
        },
        {
          hash: '0xghi789...',
          type: 'auction_created',
          amount: '0',
          domain: 'web3-domain.com',
          timestamp: '2024-01-16T09:20:00Z',
          status: 'confirmed'
        }
      ]
    } catch (error) {
      console.error('Failed to get transaction history:', error)
      throw error
    }
  }
}

/**
 * Chain utilities
 */
export const chainUtils = {
  /**
   * Switch to supported chain
   */
  async switchChain(chainId) {
    try {
      if (!walletManager.isConnected) {
        throw new Error('Wallet not connected')
      }

      const supportedChain = Object.values(WALLET_CONFIG.SUPPORTED_CHAINS)
        .find(chain => chain.chainId === chainId)

      if (!supportedChain) {
        throw new Error('Unsupported chain')
      }

      // Mock chain switch
      walletManager.updateState({
        chainId: supportedChain.chainId
      })

      return {
        success: true,
        chainId: supportedChain.chainId,
        chainName: supportedChain.name
      }
    } catch (error) {
      console.error('Failed to switch chain:', error)
      throw error
    }
  },

  /**
   * Get supported chains
   */
  getSupportedChains() {
    return WALLET_CONFIG.SUPPORTED_CHAINS
  },

  /**
   * Format address for display
   */
  formatAddress(address, length = 6) {
    if (!address) return ''
    return `${address.slice(0, length)}...${address.slice(-4)}`
  },

  /**
   * Validate address format
   */
  isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }
}

/**
 * Wallet hooks for React components
 */
export const useWallet = () => {
  const [walletState, setWalletState] = React.useState({
    isConnected: walletManager.isConnected,
    address: walletManager.address,
    chainId: walletManager.chainId,
    balance: walletManager.balance
  })

  React.useEffect(() => {
    const handleStateChange = (newState) => {
      setWalletState(newState)
    }

    walletManager.addEventListener(handleStateChange)

    return () => {
      walletManager.removeEventListener(handleStateChange)
    }
  }, [])

  return {
    ...walletState,
    connect: privyService.connectWallet,
    disconnect: privyService.disconnectWallet,
    placeBid: transactionService.placeBid,
    purchaseDomain: transactionService.purchaseDomain,
    createAuction: transactionService.createAuction,
    getTransactionHistory: transactionService.getTransactionHistory,
    switchChain: chainUtils.switchChain,
    formatAddress: chainUtils.formatAddress
  }
}

export default {
  privy: privyService,
  turnkey: turnkeyService,
  transaction: transactionService,
  chain: chainUtils,
  manager: walletManager
}
