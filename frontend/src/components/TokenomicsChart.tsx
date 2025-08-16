import React from 'react'
import { motion } from 'framer-motion'

interface Tokenomics {
  liquidityPool: number
  communityRewards: number
  teamTokens: number
  marketing: number
  development: number
}

interface TokenomicsChartProps {
  tokenomics: Tokenomics
}

export const TokenomicsChart: React.FC<TokenomicsChartProps> = ({ tokenomics }) => {
  const total = Object.values(tokenomics).reduce((sum, value) => sum + value, 0)
  
  const chartData = [
    { label: 'Liquidity Pool', value: tokenomics.liquidityPool, color: 'from-primary-500 to-primary-600', percentage: (tokenomics.liquidityPool / total) * 100 },
    { label: 'Community Rewards', value: tokenomics.communityRewards, color: 'from-secondary-500 to-secondary-600', percentage: (tokenomics.communityRewards / total) * 100 },
    { label: 'Team Tokens', value: tokenomics.teamTokens, color: 'from-success-500 to-success-600', percentage: (tokenomics.teamTokens / total) * 100 },
    { label: 'Marketing', value: tokenomics.marketing, color: 'from-warning-500 to-warning-600', percentage: (tokenomics.marketing / total) * 100 },
    { label: 'Development', value: tokenomics.development, color: 'from-error-500 to-error-600', percentage: (tokenomics.development / total) * 100 }
  ]

  return (
    <div className="space-y-4">
      {/* Pie Chart */}
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {chartData.map((item, index) => {
            const previousPercentage = chartData
              .slice(0, index)
              .reduce((sum, data) => sum + data.percentage, 0)
            
            const startAngle = (previousPercentage / 100) * 360
            const endAngle = ((previousPercentage + item.percentage) / 100) * 360
            
            const startRadians = (startAngle * Math.PI) / 180
            const endRadians = (endAngle * Math.PI) / 180
            
            const x1 = 50 + 40 * Math.cos(startRadians)
            const y1 = 50 + 40 * Math.sin(startRadians)
            const x2 = 50 + 40 * Math.cos(endRadians)
            const y2 = 50 + 40 * Math.sin(endRadians)
            
            const largeArcFlag = item.percentage > 50 ? 1 : 0
            
            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ')
            
            return (
              <motion.path
                key={item.label}
                d={pathData}
                fill={`url(#${item.color.replace(/\s+/g, '-')})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              />
            )
          })}
          
          {/* Gradients */}
          {chartData.map((item) => (
            <defs key={item.label}>
              <linearGradient id={item.color.replace(/\s+/g, '-')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={item.color.split(' ')[1]} />
                <stop offset="100%" stopColor={item.color.split(' ')[3]} />
              </linearGradient>
            </defs>
          ))}
          
          {/* Center Circle */}
          <circle cx="50" cy="50" r="15" fill="rgb(15 23 42)" className="border-2 border-white/10" />
          <text x="50" y="55" textAnchor="middle" className="text-xs font-bold fill-white">
            {total.toLocaleString()}
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {chartData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{item.label}</p>
              <p className="text-xs text-white/60">
                {item.value.toLocaleString()} ({item.percentage.toFixed(1)}%)
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl border border-primary-500/20">
        <div className="text-center space-y-2">
          <h5 className="font-semibold text-white">Total Supply Distribution</h5>
          <p className="text-2xl font-bold gradient-text">{total.toLocaleString()}</p>
          <p className="text-sm text-white/70">
            Optimized for liquidity, community engagement, and sustainable growth
          </p>
        </div>
      </div>
    </div>
  )
} 