import React, { useState } from 'react'
import { Search, Filter, SortAsc, Clock, TrendingUp } from 'lucide-react'
import DomainCard from './DomainCard'

const DomainDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('expiry')
  const [filterCategory, setFilterCategory] = useState('all')

  const availableDomains = [
    {
      domainName: 'tech-startup.com',
      expiryDate: '2024-02-15',
      valuationScore: 88,
      registrant: 'TechCorp LLC',
      marketTrends: 'rising'
    },
    {
      domainName: 'ai-consulting.io',
      expiryDate: '2024-02-20',
      valuationScore: 92,
      registrant: 'AI Solutions Inc',
      marketTrends: 'rising'
    },
    {
      domainName: 'crypto-wallet.org',
      expiryDate: '2024-02-28',
      valuationScore: 85,
      registrant: 'BlockChain Ltd',
      marketTrends: 'stable'
    },
    {
      domainName: 'digital-marketing.net',
      expiryDate: '2024-03-05',
      valuationScore: 79,
      registrant: 'Marketing Pro',
      marketTrends: 'declining'
    },
    {
      domainName: 'web3-tools.dev',
      expiryDate: '2024-03-10',
      valuationScore: 91,
      registrant: 'Web3 Innovations',
      marketTrends: 'rising'
    },
    {
      domainName: 'fintech-solutions.co',
      expiryDate: '2024-03-15',
      valuationScore: 87,
      registrant: 'FinTech Corp',
      marketTrends: 'stable'
    }
  ]

  const filteredDomains = availableDomains.filter(domain => {
    const matchesSearch = domain.domainName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || 
      (filterCategory === 'expiring' && new Date(domain.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) ||
      (filterCategory === 'premium' && domain.valuationScore >= 90) ||
      (filterCategory === 'trending' && domain.marketTrends === 'rising')
    
    return matchesSearch && matchesCategory
  })

  const sortedDomains = [...filteredDomains].sort((a, b) => {
    switch (sortBy) {
      case 'expiry':
        return new Date(a.expiryDate) - new Date(b.expiryDate)
      case 'value':
        return b.valuationScore - a.valuationScore
      case 'name':
        return a.domainName.localeCompare(b.domainName)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Domain Discovery</h1>
          <p className="text-dark-text mt-1">Find valuable domains that are about to expire</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <span className="text-sm text-dark-text">
            {filteredDomains.length} domains found
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text" size={20} />
            <input
              type="text"
              placeholder="Search domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text focus:outline-none focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text" size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary appearance-none"
            >
              <option value="all">All Categories</option>
              <option value="expiring">Expiring Soon</option>
              <option value="premium">Premium Value</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text" size={20} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary appearance-none"
            >
              <option value="expiry">Sort by Expiry</option>
              <option value="value">Sort by Value</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <div className="flex items-center">
            <Clock className="text-orange-400 mr-2" size={20} />
            <div>
              <p className="text-sm text-dark-text">Expiring This Week</p>
              <p className="text-xl font-bold text-white">
                {availableDomains.filter(d => new Date(d.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <div className="flex items-center">
            <TrendingUp className="text-green-400 mr-2" size={20} />
            <div>
              <p className="text-sm text-dark-text">Premium Domains</p>
              <p className="text-xl font-bold text-white">
                {availableDomains.filter(d => d.valuationScore >= 90).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <div className="flex items-center">
            <TrendingUp className="text-blue-400 mr-2" size={20} />
            <div>
              <p className="text-sm text-dark-text">Rising Trends</p>
              <p className="text-xl font-bold text-white">
                {availableDomains.filter(d => d.marketTrends === 'rising').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDomains.map((domain, index) => (
          <DomainCard key={index} domain={domain} variant="available" />
        ))}
      </div>

      {sortedDomains.length === 0 && (
        <div className="text-center py-12">
          <p className="text-dark-text text-lg">No domains found matching your criteria.</p>
          <p className="text-dark-text mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}

export default DomainDiscovery