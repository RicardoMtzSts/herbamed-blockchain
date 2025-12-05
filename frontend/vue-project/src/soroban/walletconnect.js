import { SignClient } from '@walletconnect/sign-client'

let signClient = null
let activeSessions = {}

// Initialize WalletConnect SignClient
export async function initializeWalletConnect() {
  if (signClient) return signClient

  try {
    signClient = await SignClient.init({
      projectId: import.meta.env.VITE_WC_PROJECT_ID || '4d6e4ea28e2c05227eeec7733dfd78ff',
      relayUrl: 'wss://relay.walletconnect.com',
      metadata: {
        name: 'Herbamed DApp',
        description: 'Blockchain-based credit scoring for gig workers',
        url: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
      }
    })

    // Restore existing sessions
    const savedSessions = signClient.session.getAll()
    savedSessions.forEach(session => {
      activeSessions[session.topic] = session
    })

    // Event listeners
    signClient.on('session_proposal', async (payload) => {
      console.log('Session proposal received:', payload)
    })

    signClient.on('session_update', ({ topic, params }) => {
      console.log('Session updated:', topic, params)
      if (activeSessions[topic]) {
        activeSessions[topic] = { ...activeSessions[topic], ...params }
      }
    })

    signClient.on('session_delete', ({ topic }) => {
      console.log('Session deleted:', topic)
      delete activeSessions[topic]
    })

    return signClient
  } catch (error) {
    console.error('Failed to initialize WalletConnect:', error)
    throw error
  }
}

// Generate QR URI for mobile connection
export async function generateWalletConnectQR() {
  try {
    const client = await initializeWalletConnect()

    const { uri, approval } = await client.connect({
      requiredNamespaces: {
        stellar: {
          methods: ['stellar_signAndSubmitTx', 'stellar_signTx'],
          chains: ['stellar:testnet-sbx2b57b4142c2b8e'],
          events: ['stellar_chainChanged']
        }
      }
    })

    // Return URI for QR generation and the approval promise
    return { uri, approval }
  } catch (error) {
    console.error('Failed to generate WalletConnect QR:', error)
    throw error
  }
}

// Approve incoming session
export async function approveSession(approval) {
  try {
    const session = await approval()
    if (session) {
      activeSessions[session.topic] = session
      localStorage.setItem('wc_session_topic', session.topic)
      return session
    }
  } catch (error) {
    console.error('Failed to approve session:', error)
    throw error
  }
}

// Get active session
export function getActiveSession() {
  const topic = localStorage.getItem('wc_session_topic')
  if (topic && activeSessions[topic]) {
    return activeSessions[topic]
  }
  return Object.values(activeSessions)[0] || null
}

// Get public key from active session
export function getWalletConnectPublicKey() {
  const session = getActiveSession()
  if (session && session.namespaces && session.namespaces.stellar) {
    const accounts = session.namespaces.stellar.accounts
    if (accounts && accounts.length > 0) {
      // Format: "stellar:testnet-sbx2b57b4142c2b8e:GCABUV..."
      return accounts[0].split(':').pop()
    }
  }
  return null
}

// Disconnect session
export async function disconnectWalletConnect() {
  try {
    const session = getActiveSession()
    if (session && signClient) {
      await signClient.disconnect({
        topic: session.topic,
        reason: { code: 6000, message: 'User disconnected' }
      })
      delete activeSessions[session.topic]
      localStorage.removeItem('wc_session_topic')
    }
  } catch (error) {
    console.error('Failed to disconnect WalletConnect:', error)
    throw error
  }
}

// Check if WalletConnect is initialized
export function isWalletConnectReady() {
  return !!signClient
}

export default {
  initializeWalletConnect,
  generateWalletConnectQR,
  approveSession,
  getActiveSession,
  getWalletConnectPublicKey,
  disconnectWalletConnect,
  isWalletConnectReady
}
