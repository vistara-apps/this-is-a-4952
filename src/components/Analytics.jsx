import React, { useState } from 'react'
import { TrendingUp, DollarSign, Clock, BarChart3, PieChart, Activity } from 'lucide-react'
import AnalyticsChart from './AnalyticsChart'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('sales')

  const analyticsData = {
    marketOverview: {
      totalSales: 1250000,
      avgSalePrice: 12500,
      activeAuctions: 47,
      marketCap: 48500000,
      change24h: 8.2
    },
    topDomains: [
      { name: 'ai-trading.com', sale: 95000, date: '2024-01-18', category: 'AI' },
      { name: 'web3-wallet.io', sale: 87500, date: '2024-01-17', category: 'Crypto' },
      { name: 'nft-market.org', sale: 72000, date: '2024-01-16', category: 'NFT' },
      { name: 'defi-yield.co', sale: 68000, date: '2024-01-15', category: 'DeFi' },
      { name: 'metaverse-land.net', sale: 64500, date: '2024-01-14', category: 'Metaverse' }
    ],
    trendingKeywords: [
      { keyword: 'AI', volume: 245, change: 23.5 },
      { keyword: 'Web3', volume: 189, change: 18.2 },
      { keyword: 'DeFi', volume: 156, change: 15.8 },
      { keyword: 'NFT', volume: 134, change: -2.1 },
      { keyword: 'Crypto', volume: 128, change: 12.3 },
      { keyword: 'Metaverse', volume: 98, change: 8.7 }
    ],
    categoryBreakdown: [
      { name: 'AI/Tech', value: 35, color: '#8B5CF6' },
      { name: 'Crypto/Web3', value: 28, color: '#3B82F6' },
      { name: 'Finance', value: 18, color: '#10B981' },
      { name: 'E-commerce', value: 12, color: '#F59E0B' },
      { name: 'Other', value: 7, color: '#EF4444' }
    ]
  }

  const kpiCards = [
    {
      title: 'Total Market Volume',
      value: `$${(analyticsData.marketOverview.totalSales / 1000000).toFixed(1)}M`,
      change: `+${analyticsData.marketOverview.change24h}%`,
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Average Sale Price',
      value: `$${(analyticsData.marketOverview.avgSalePrice / 1000).toFixed(0)}K`,
      change: '+12.3%',
      icon: TrendingUp,
      color: 'text-blue-400'
    },
    {
      title: 'Active Auctions',
      value: analyticsData.marketOverview.activeAuctions,
      change: '+5',
      icon: BarChart3,
      color: 'text-purple-400'
    },
    {
      title: 'Market Cap',
      value: `$${(analyticsData.marketOverview.marketCap / 1000000).toFixed(1)}M`,
      change: '+15.7%',
      icon: Activity,
      color: 'text-orange-400'
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Market Analytics</h1>
          <p className="text-dark-text mt-1">Real-time insights into domain market trends</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="bg-dark-surface rounded-lg p-6 border border-dark-border hover:border-purple-400/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-text text-sm">{kpi.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
                  <p className={`text-sm mt-1 ${kpi.color}`}>{kpi.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-opacity-10 ${kpi.color.replace('text-', 'bg-')}`}>
                  <Icon size={24} className={kpi.color} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Trends Chart */}
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Market Trends</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedMetric('sales')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  selectedMetric === 'sales' ? 'bg-primary text-white' : 'text-dark-text hover:text-white'
                }`}
              >
                Sales
              </button>
              <button
                onClick={() => setSelectedMetric('volume')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  selectedMetric === 'volume' ? 'bg-primary text-white' : 'text-dark-text hover:text-white'
                }`}
              >
                Volume
              </button>
            </div>
          </div>
          <AnalyticsChart variant="line" />
        </div>

        {/* Category Breakdown */}
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <h3 className="text-lg font-semibold text-white mb-4">Category Breakdown</h3>
          <AnalyticsChart variant="donut" data={analyticsData.categoryBreakdown} />
          <div className="mt-4 space-y-2">
            {analyticsData.categoryBreakdown.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-dark-text">{category.name}</span>
                </div>
                <span className="text-sm text-white font-medium">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Recent Sales */}
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <h3 className="text-lg font-semibold text-white mb-4">Top Recent Sales</h3>
          <div className="space-y-3">
            {analyticsData.topDomains.map((domain, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <div>
                  <p className="text-white font-medium">{domain.name}</p>
                  <p className="text-sm text-dark-text">{domain.date} • {domain.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">${domain.sale.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Keywords */}
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <h3 className="text-lg font-semibold text-white mb-4">Trending Keywords</h3>
          <div className="space-y-3">
            {analyticsData.trendingKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <div className="flex items-center">
                  <span className="text-white font-medium">{keyword.keyword}</span>
                  <span className="ml-2 text-sm text-dark-text">{keyword.volume} searches</span>
                </div>
                <div className={`text-sm font-medium ${
                  keyword.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {keyword.change > 0 ? '+' : ''}{keyword.change}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
        <h3 className="text-lg font-semibold text-white mb-4">AI Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-bg rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-green-400 mr-2" size={16} />
              <span className="text-sm font-medium text-green-400">Rising Trend</span>
            </div>
            <p className="text-sm text-dark-text">
              AI-related domains are showing strong growth with 23.5% increase in searches this week.
            </p>
          </div>
          <div className="bg-dark-bg rounded-lg p-4">
            <div className="flex items-center mb-2">
              <DollarSign className="text-blue-400 mr-2" size={16} />
              <span className="text-sm font-medium text-blue-400">Price Alert</span>
            </div>
            <p className="text-sm text-dark-text">
              Web3 domains averaging $45K in sales, 18% above market average for premium domains.
            </p>
          </div>
          <div className="bg-dark-bg rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Clock className="text-orange-400 mr-2" size={16} />
              <span className="text-sm font-medium text-orange-400">Time Sensitive</span>
            </div>
            <p className="text-sm text-dark-text">
              47 premium domains expiring in the next 30 days. Consider adding to watchlist.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics