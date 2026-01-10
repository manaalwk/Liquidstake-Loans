import { useState } from 'react'

interface WalletConnectProps {
  onConnect: (publicKey: string) => void
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState('')

  const connectWallet = async () => {
    setIsConnecting(true)
    setError('')
    
    try {
      const CasperWalletProvider = (window as any).CasperWalletProvider

      if (!CasperWalletProvider) {
        throw new Error('Casper Wallet not found')
      }

      const provider = CasperWalletProvider()

      // Request connection - returns true on success
      const result = await provider.requestConnection()
      console.log('Connection result:', result)

      if (result !== true) {
        throw new Error('Connection failed')
      }

      // After connection succeeds, get the active public key
      const publicKey = await provider.getActivePublicKey()
      
      console.log('Public key:', publicKey)

      if (!publicKey) {
        throw new Error('Could not get public key after connection')
      }

      console.log('✅ Connected with:', publicKey)
      onConnect(publicKey)
      
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || String(err))
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
      <div className="text-center max-w-2xl">
        <h2 className="text-5xl font-bold text-white mb-4">🏦 LiquidStake Loans</h2>
        <p className="text-blue-200 text-lg mb-2">Shariah-Compliant DeFi</p>
        <p className="text-blue-300">Connect wallet to borrow at 0% interest</p>
      </div>

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 text-lg"
      >
        {isConnecting ? '⏳ Waiting...' : '🔐 Connect Wallet'}
      </button>

      {error && (
        <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded border border-red-400 max-w-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 w-full mt-8 max-w-4xl">
        <div className="bg-blue-800 bg-opacity-30 p-4 rounded border border-blue-400 text-center">
          <p className="text-2xl mb-1">💰</p>
          <p className="text-white text-sm">Deposit</p>
        </div>
        <div className="bg-blue-800 bg-opacity-30 p-4 rounded border border-blue-400 text-center">
          <p className="text-2xl mb-1">💵</p>
          <p className="text-white text-sm">Borrow</p>
        </div>
        <div className="bg-blue-800 bg-opacity-30 p-4 rounded border border-blue-400 text-center">
          <p className="text-2xl mb-1">📊</p>
          <p className="text-white text-sm">Monitor</p>
        </div>
      </div>
    </div>
  )
}
