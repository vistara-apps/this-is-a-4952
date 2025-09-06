import React, { useState } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'

const BidInput = ({ currentBid, reservePrice, onSubmit, variant = 'simple' }) => {
  const [bidAmount, setBidAmount] = useState('')
  const [maxBid, setMaxBid] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const minBid = Math.max(currentBid * 1.05, reservePrice) // 5% above current bid or reserve price
  const suggestedBids = [
    Math.ceil(minBid),
    Math.ceil(minBid * 1.1),
    Math.ceil(minBid * 1.25),
    Math.ceil(minBid * 1.5)
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const amount = parseFloat(bidAmount)
    
    if (amount < minBid) {
      alert(`Minimum bid is $${minBid.toLocaleString()}`)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(amount)
      setBidAmount('')
      setMaxBid('')
    } catch (error) {
      console.error('Bid submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickBid = (amount) => {
    setBidAmount(amount.toString())
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-semibold">Place Your Bid</h4>
        <div className="text-sm text-dark-text">
          Min: ${minBid.toLocaleString()}
        </div>
      </div>

      {/* Quick Bid Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {suggestedBids.map((amount, index) => (
          <button
            key={index}
            onClick={() => handleQuickBid(amount)}
            className="p-2 text-sm bg-dark-border hover:bg-gray-600 text-white rounded transition-colors"
          >
            ${amount.toLocaleString()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bid Amount Input */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text" size={18} />
          <input
            type="number"
            placeholder="Enter bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            min={minBid}
            step="100"
            className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text focus:outline-none focus:border-primary"
            required
          />
        </div>

        {/* Max Bid Input (for withMaxBid variant) */}
        {variant === 'withMaxBid' && (
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text" size={18} />
            <input
              type="number"
              placeholder="Maximum bid (optional)"
              value={maxBid}
              onChange={(e) => setMaxBid(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-text focus:outline-none focus:border-primary"
            />
            <div className="text-xs text-dark-text mt-1">
              Auto-bid up to this amount
            </div>
          </div>
        )}

        {/* Bid Summary */}
        {bidAmount && (
          <div className="bg-dark-bg rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-text">Your Bid:</span>
              <span className="text-white font-medium">${parseFloat(bidAmount || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-text">Current High:</span>
              <span className="text-white">${currentBid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-text">Increase:</span>
              <span className="text-green-400 font-medium">
                +${Math.max(0, (parseFloat(bidAmount || 0) - currentBid)).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !bidAmount || parseFloat(bidAmount) < minBid}
          className="w-full gradient-bg text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting Bid...' : 'Place Bid'}
        </button>
      </form>

      {/* Bid Info */}
      <div className="text-xs text-dark-text space-y-1">
        <p>• Bids are binding and cannot be canceled</p>
        <p>• Payment will be processed upon winning</p>
        <p>• Reserve price: ${reservePrice.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default BidInput