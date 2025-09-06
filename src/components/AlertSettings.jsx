import React, { useState } from 'react'
import { Bell, Mail, Smartphone, Clock, DollarSign } from 'lucide-react'

const AlertSettings = ({ variant = 'domainKeywords' }) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    expiryAlerts: {
      enabled: true,
      daysBefore: 7
    },
    priceAlerts: {
      enabled: true,
      threshold: 10000
    },
    keywords: ['AI', 'crypto', 'web3', 'nft'],
    alertFrequency: 'immediate'
  })

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleNestedToggle = (parent, child) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: !prev[parent][child]
      }
    }))
  }

  const handleNestedValue = (parent, child, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }))
  }

  const addKeyword = (keyword) => {
    if (keyword.trim() && !settings.keywords.includes(keyword.trim())) {
      setSettings(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()]
      }))
    }
  }

  const removeKeyword = (keyword) => {
    setSettings(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  return (
    <div className="space-y-6">
      {/* Notification Methods */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Notification Methods</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
            <div className="flex items-center">
              <Mail className="text-blue-400 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-sm text-dark-text">Get alerts via email</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-primary' : 'bg-dark-border'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
            <div className="flex items-center">
              <Bell className="text-purple-400 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-sm text-dark-text">Browser notifications</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('pushNotifications')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.pushNotifications ? 'bg-primary' : 'bg-dark-border'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
            <div className="flex items-center">
              <Smartphone className="text-green-400 mr-3" size={20} />
              <div>
                <p className="text-white font-medium">SMS Notifications</p>
                <p className="text-sm text-dark-text">Text message alerts</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('smsNotifications')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.smsNotifications ? 'bg-primary' : 'bg-dark-border'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Types */}
      {variant === 'expiryDates' && (
        <div className="space-y-4">
          <h4 className="text-white font-medium">Expiry Alerts</h4>
          
          <div className="p-3 bg-dark-bg rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Clock className="text-orange-400 mr-3" size={20} />
                <span className="text-white font-medium">Domain Expiry Alerts</span>
              </div>
              <button
                onClick={() => handleNestedToggle('expiryAlerts', 'enabled')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.expiryAlerts.enabled ? 'bg-primary' : 'bg-dark-border'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.expiryAlerts.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
            
            {settings.expiryAlerts.enabled && (
              <div className="mt-3">
                <label className="text-sm text-dark-text block mb-2">Alert me X days before expiry:</label>
                <select
                  value={settings.expiryAlerts.daysBefore}
                  onChange={(e) => handleNestedValue('expiryAlerts', 'daysBefore', parseInt(e.target.value))}
                  className="w-full bg-dark-surface border border-dark-border rounded px-3 py-2 text-white"
                >
                  <option value={1}>1 day</option>
                  <option value={3}>3 days</option>
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Price Alerts */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Price Alerts</h4>
        
        <div className="p-3 bg-dark-bg rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <DollarSign className="text-green-400 mr-3" size={20} />
              <span className="text-white font-medium">Price Drop Alerts</span>
            </div>
            <button
              onClick={() => handleNestedToggle('priceAlerts', 'enabled')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.priceAlerts.enabled ? 'bg-primary' : 'bg-dark-border'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.priceAlerts.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}></div>
            </button>
          </div>
          
          {settings.priceAlerts.enabled && (
            <div className="mt-3">
              <label className="text-sm text-dark-text block mb-2">Alert when price drops below:</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text" size={16} />
                <input
                  type="number"
                  value={settings.priceAlerts.threshold}
                  onChange={(e) => handleNestedValue('priceAlerts', 'threshold', parseInt(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 bg-dark-surface border border-dark-border rounded text-white"
                  placeholder="10000"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keywords */}
      {variant === 'domainKeywords' && (
        <div className="space-y-4">
          <h4 className="text-white font-medium">Keyword Alerts</h4>
          
          <div className="p-3 bg-dark-bg rounded-lg">
            <p className="text-sm text-dark-text mb-3">Get notified when domains containing these keywords become available:</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {settings.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {keyword}
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="ml-2 text-primary/60 hover:text-primary"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex">
              <input
                type="text"
                placeholder="Add keyword..."
                className="flex-1 bg-dark-surface border border-dark-border rounded-l px-3 py-2 text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addKeyword(e.target.value)
                    e.target.value = ''
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousElementSibling
                  addKeyword(input.value)
                  input.value = ''
                }}
                className="bg-primary text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Frequency */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Alert Frequency</h4>
        
        <div className="space-y-2">
          {[
            { value: 'immediate', label: 'Immediate', desc: 'Get alerts as soon as events occur' },
            { value: 'daily', label: 'Daily Digest', desc: 'Receive a summary once per day' },
            { value: 'weekly', label: 'Weekly Summary', desc: 'Get a weekly roundup of activity' }
          ].map((option) => (
            <label key={option.value} className="flex items-center p-3 bg-dark-bg rounded-lg cursor-pointer hover:bg-gray-700/50">
              <input
                type="radio"
                name="alertFrequency"
                value={option.value}
                checked={settings.alertFrequency === option.value}
                onChange={(e) => setSettings(prev => ({ ...prev, alertFrequency: e.target.value }))}
                className="mr-3 text-primary"
              />
              <div>
                <p className="text-white font-medium">{option.label}</p>
                <p className="text-sm text-dark-text">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlertSettings