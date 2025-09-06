import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: 'user-123',
    email: 'user@example.com',
    subscriptionTier: 'Pro',
    watchlistDomains: ['example.com', 'domain.io', 'crypto.eth'],
    transactionHistory: []
  })

  const [watchlist, setWatchlist] = useState([
    {
      domainName: 'example.com',
      expiryDate: '2024-03-15',
      valuationScore: 85,
      notificationPreference: 'email'
    },
    {
      domainName: 'domain.io',
      expiryDate: '2024-02-28',
      valuationScore: 92,
      notificationPreference: 'push'
    },
    {
      domainName: 'crypto.eth',
      expiryDate: '2024-04-10',
      valuationScore: 78,
      notificationPreference: 'email'
    }
  ])

  const addToWatchlist = (domain) => {
    setWatchlist(prev => [...prev, domain])
    setUser(prev => ({
      ...prev,
      watchlistDomains: [...prev.watchlistDomains, domain.domainName]
    }))
  }

  const removeFromWatchlist = (domainName) => {
    setWatchlist(prev => prev.filter(domain => domain.domainName !== domainName))
    setUser(prev => ({
      ...prev,
      watchlistDomains: prev.watchlistDomains.filter(name => name !== domainName)
    }))
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      watchlist,
      addToWatchlist,
      removeFromWatchlist
    }}>
      {children}
    </UserContext.Provider>
  )
}