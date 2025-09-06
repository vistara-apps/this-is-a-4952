import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const AnalyticsChart = ({ variant = 'line', data = null }) => {
  const defaultLineData = [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 18000 },
    { name: 'Apr', value: 22000 },
    { name: 'May', value: 25000 },
    { name: 'Jun', value: 28000 },
  ]

  const defaultBarData = [
    { name: 'Mon', auctions: 24 },
    { name: 'Tue', auctions: 18 },
    { name: 'Wed', auctions: 32 },
    { name: 'Thu', auctions: 28 },
    { name: 'Fri', auctions: 35 },
    { name: 'Sat', auctions: 42 },
    { name: 'Sun', auctions: 38 },
  ]

  const defaultPieData = [
    { name: '.com', value: 45, color: '#8884d8' },
    { name: '.io', value: 25, color: '#82ca9d' },
    { name: '.org', value: 15, color: '#ffc658' },
    { name: '.net', value: 10, color: '#ff7300' },
    { name: 'Others', value: 5, color: '#0088fe' },
  ]

  const chartData = data || (variant === 'bar' ? defaultBarData : variant === 'pie' ? defaultPieData : defaultLineData)

  const renderChart = () => {
    switch (variant) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="auctions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      
      case 'donut':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {renderChart()}
    </div>
  )
}

export default AnalyticsChart