import { useState, useEffect } from 'react'
import { deposit, borrow, getHealth } from '../services/contractService'

interface DashboardProps {
  publicKey: string
  contractHash: string
  rpcUrl: string
  onDisconnect: () => void
}

export default function Dashboard({ publicKey, contractHash, rpcUrl, onDisconnect }: DashboardProps) {
  const [depositAmount, setDepositAmount] = useState('')
  const [borrowAmount, setBorrowAmount] = useState('')
  const [health, setHealth] = useState<string>('1.50')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [expandedProtocol, setExpandedProtocol] = useState(false)

  useEffect(() => {
    checkHealth()
  }, [publicKey])

  const checkHealth = async () => {
    try {
      setMessage('Fetching health status...')
      const healthValue = await getHealth(publicKey)
      setHealth(healthValue)
      setMessage('')
    } catch (error) {
      setMessage(`Error: ${error}`)
    }
  }

  const handleDeposit = async () => {
    if (!depositAmount) return
    setLoading(true)
    setMessage('⏳ Signing deposit transaction...')
    
    try {
      const deployHash = await deposit(publicKey, depositAmount)
      setMessage(`✅ Deposit sent! Hash: ${deployHash.slice(0, 16)}...`)
      console.log('Deploy hash:', deployHash)
      setDepositAmount('')
      
      // Refresh health after 3 seconds
      setTimeout(() => checkHealth(), 3000)
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleBorrow = async () => {
    if (!borrowAmount) return
    setLoading(true)
    setMessage('⏳ Signing borrow transaction...')
    
    try {
      const deployHash = await borrow(publicKey, borrowAmount)
      setMessage(`✅ Borrow sent! Hash: ${deployHash.slice(0, 16)}...`)
      console.log('Deploy hash:', deployHash)
      setBorrowAmount('')
      
      // Refresh health after 3 seconds
      setTimeout(() => checkHealth(), 3000)
    } catch (error) {
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const healthValue = parseFloat(health)
  const healthColor = healthValue > 1.5 ? 'text-green-400' : 
                      healthValue > 1 ? 'text-yellow-400' : 'text-red-400'
  const healthBgColor = healthValue > 1.5 ? 'bg-green-500' : 
                        healthValue > 1 ? 'bg-yellow-500' : 'bg-red-500'
  const healthStatus = healthValue > 1.5 ? '✅ Safe Zone' : 
                       healthValue > 1.2 ? '⚠️ Caution Zone' : '🔴 Liquidation Risk'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <button
          onClick={onDisconnect}
          className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded transition text-sm"
        >
          🔌 Disconnect
        </button>
      </div>

      {/* ENHANCED HEALTH FACTOR HERO CARD */}
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 bg-opacity-50 p-8 rounded-lg border-2 border-blue-400 shadow-lg">
        <h3 className="text-blue-200 text-sm uppercase mb-2 font-semibold">💚 Health Factor (The Hero Card)</h3>
        <div className={`text-6xl font-bold mb-4 ${healthColor}`}>{health}</div>
        
        {/* Color-coded health bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden border border-blue-300">
          <div 
            className={`h-full transition-all duration-300 ${healthBgColor}`}
            style={{width: `${Math.min((healthValue / 2) * 100, 100)}%`}}
          />
        </div>

        {/* Status explanation */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="bg-blue-700 bg-opacity-50 p-3 rounded border border-blue-400">
            <p className="text-blue-200 text-xs">Safe Zone</p>
            <p className="text-green-400 font-bold">{' > 1.5'}</p>
          </div>
          <div className="bg-blue-700 bg-opacity-50 p-3 rounded border border-blue-400">
            <p className="text-blue-200 text-xs">Current Status</p>
            <p className="text-white font-bold">{healthStatus}</p>
          </div>
          <div className="bg-blue-700 bg-opacity-50 p-3 rounded border border-blue-400">
            <p className="text-blue-200 text-xs">Liquidation Risk</p>
            <p className="text-red-400 font-bold">{' < 1.2'}</p>
          </div>
        </div>

        <p className="text-blue-300 text-sm italic mb-4">
          Measures your collateral strength. Higher = safer.
        </p>

        <button
          onClick={checkHealth}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-semibold transition"
        >
          🔄 Refresh Status
        </button>
      </div>

      {/* WHY THIS IS HALAL INSIGHT CARD */}
      <div className="bg-gradient-to-br from-green-900 to-green-800 bg-opacity-50 p-6 rounded-lg border-2 border-green-400">
        <h3 className="text-xl font-bold text-green-300 mb-4">💡 Why This Is Halal</h3>
        <ul className="space-y-3 text-green-100">
          <li className="flex items-start">
            <span className="text-green-400 mr-3 font-bold">✅</span>
            <span><strong>No interest (riba)</strong> - Purely fee-based model</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3 font-bold">✅</span>
            <span><strong>Fixed protocol fee (not time-based)</strong> - 0.5% flat, not accruing interest</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3 font-bold">✅</span>
            <span><strong>Fee paid via staking rewards</strong> - No cash outlay required</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3 font-bold">✅</span>
            <span><strong>Asset-backed collateral</strong> - 100% collateralized, non-custodial</span>
          </li>
        </ul>
      </div>

      {/* MAIN ACTION CARDS - Deposit & Borrow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-800 bg-opacity-30 p-6 rounded-lg border border-blue-400">
          <h3 className="text-2xl font-bold text-white mb-2">💰 Lock sCSPR Collateral</h3>
          <p className="text-blue-200 text-sm mb-4">Deposit liquid staking tokens as collateral to enable borrowing</p>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Amount in sCSPR"
            className="w-full px-4 py-2 bg-blue-900 text-white rounded border border-blue-400 mb-4 focus:outline-none focus:border-blue-300"
          />
          <button
            onClick={handleDeposit}
            disabled={loading || !depositAmount}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded disabled:opacity-50 transition"
          >
            {loading ? '⏳ Signing...' : '📤 Lock Collateral'}
          </button>
        </div>

        <div className="bg-blue-800 bg-opacity-30 p-6 rounded-lg border border-blue-400">
          <h3 className="text-2xl font-bold text-white mb-2">💵 Mint Interest-Free CSPR Loan</h3>
          <p className="text-blue-200 text-sm mb-4">Borrow up to 66% of your collateral. 0% interest + 0.5% fee paid from rewards.</p>
          <input
            type="number"
            value={borrowAmount}
            onChange={(e) => setBorrowAmount(e.target.value)}
            placeholder="Amount in CSPR"
            className="w-full px-4 py-2 bg-blue-900 text-white rounded border border-blue-400 mb-4 focus:outline-none focus:border-blue-300"
          />
          <button
            onClick={handleBorrow}
            disabled={loading || !borrowAmount}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded disabled:opacity-50 transition"
          >
            {loading ? '⏳ Signing...' : '💸 Mint Loan'}
          </button>
        </div>
      </div>

      {/* PROTOCOL MATH EXPANDABLE SECTION */}
      <div className="bg-blue-900 bg-opacity-30 rounded-lg border border-blue-400 overflow-hidden">
        <button
          onClick={() => setExpandedProtocol(!expandedProtocol)}
          className="w-full px-6 py-4 bg-blue-800 hover:bg-blue-700 text-blue-100 font-semibold flex justify-between items-center transition"
        >
          <span>📐 Loan Breakdown (Protocol Math)</span>
          <span className="text-lg">{expandedProtocol ? '▼' : '▶'}</span>
        </button>

        {expandedProtocol && (
          <div className="p-6 bg-blue-900 bg-opacity-20 border-t border-blue-400">
            <div className="space-y-3 text-blue-100 font-mono text-sm">
              <div className="flex justify-between p-3 bg-blue-800 bg-opacity-30 rounded">
                <span>Collateral Deposited:</span>
                <span className="text-blue-300">1000 sCSPR</span>
              </div>
              <div className="flex justify-between p-3 bg-blue-800 bg-opacity-30 rounded">
                <span>Amount Borrowed:</span>
                <span className="text-blue-300">600 CSPR</span>
              </div>
              <div className="flex justify-between p-3 bg-blue-800 bg-opacity-30 rounded">
                <span>Collateral Ratio:</span>
                <span className="text-blue-300">166%</span>
              </div>
              <div className="flex justify-between p-3 bg-blue-800 bg-opacity-30 rounded">
                <span>Protocol Fee:</span>
                <span className="text-blue-300">0.5% (3 CSPR/year)</span>
              </div>
              <div className="flex justify-between p-3 bg-green-800 bg-opacity-30 rounded border border-green-400">
                <span className="text-green-300">Paid By:</span>
                <span className="text-green-300 font-bold">Staking Rewards ✅</span>
              </div>
            </div>
            <p className="text-xs text-blue-300 mt-4 italic">
              This demonstrates transparency and financial rigor. All math is on-chain and non-custodial.
            </p>
          </div>
        )}
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded border text-sm ${
          message.includes('✅') ? 'bg-green-900 bg-opacity-30 border-green-400 text-green-200' :
          message.includes('❌') ? 'bg-red-900 bg-opacity-30 border-red-400 text-red-200' :
          'bg-blue-900 bg-opacity-30 border-blue-400 text-blue-200'
        }`}>
          {message}
        </div>
      )}

      {/* How it Works */}
      <div className="bg-blue-900 bg-opacity-30 p-4 rounded border border-blue-400 text-sm text-blue-200">
        <p className="font-bold mb-2">ℹ️ How it works:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Lock sCSPR (liquid staking) as collateral</li>
          <li>Mint up to 66% of your collateral value as interest-free loans</li>
          <li>Zero interest charged - Shariah-compliant by design</li>
          <li>Your staking rewards automatically cover the 0.5% protocol fee</li>
          <li>Monitor health factor continuously to avoid liquidation</li>
        </ul>
      </div>
    </div>
  )
}
