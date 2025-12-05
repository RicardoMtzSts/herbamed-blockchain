import { SorobanRpc, Horizon } from '@stellar/stellar-sdk'

const RPC_URL = import.meta.env.VITE_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org'
const HORIZON_URL = 'https://horizon-testnet.stellar.org'

// Fetch balance from Horizon
export async function fetchXLMBalance(publicKey) {
  try {
    if (!publicKey) return null

    const response = await fetch(`${HORIZON_URL}/accounts/${publicKey}`)
    if (!response.ok) {
      console.error('Failed to fetch account:', response.status)
      return null
    }

    const account = await response.json()
    
    // Find XLM balance (native asset)
    const xlmBalance = account.balances.find(b => b.asset_type === 'native')
    return xlmBalance ? parseFloat(xlmBalance.balance) : 0
  } catch (error) {
    console.error('Error fetching XLM balance:', error)
    return null
  }
}

// Format XLM balance for display
export function formatXLMBalance(balance) {
  if (balance === null || balance === undefined) return '—'
  return parseFloat(balance).toFixed(4)
}

// Get account info (public key, balance)
export async function getAccountInfo(publicKey) {
  if (!publicKey) return null

  const balance = await fetchXLMBalance(publicKey)
  return {
    publicKey,
    balance: formatXLMBalance(balance),
    balanceRaw: balance
  }
}

export default {
  fetchXLMBalance,
  formatXLMBalance,
  getAccountInfo
}
