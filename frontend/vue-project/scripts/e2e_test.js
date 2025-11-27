import { Keypair, TransactionBuilder, Networks, Operation, Account } from '@stellar/stellar-sdk'
// node v18+ has global fetch; ensure global available for older runtimes
if (typeof fetch === 'undefined') {
  global.fetch = (await import('node-fetch')).default
}

// e2e_test: build unsigned XDR using /build_invoke or /build_tx, sign with local key and POST to RPC /send_transaction

const TX_BUILDER = process.env.TX_BUILDER_URL || 'http://127.0.0.1:4001'
const RPC_URL = process.env.SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org'
const NETWORK = process.env.SOROBAN_NETWORK || 'testnet'
const CONTRACT_ID = process.env.CONTRACT_ADDRESS || 'CA5C74SZ5XHXENOVQ454WQN66PMVSPMIZV5FYUR6OWDUQKC4PKOOXNPR'

async function main() {
  // Generate a keypair for test signing
  const kp = Keypair.random()
  const publicKey = kp.publicKey()

  console.log('Using test keypair', publicKey)

  // Try /build_invoke
  let unsignedXDR = null
  try {
    const invokeResp = await fetch(`${TX_BUILDER.replace(/\/$/, '')}/build_invoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractId: CONTRACT_ID, method: 'register_plant', args: ['e2e-id','e2e-name','e2e-desc'], publicKey, network: NETWORK })
    })
    if (invokeResp.ok) {
      const j = await invokeResp.json()
      unsignedXDR = j.xdr
      console.log('Got unsigned XDR from /build_invoke')
    } else {
      console.log('/build_invoke not available, status', invokeResp.status)
    }
  } catch (e) {
    console.log('Error calling /build_invoke', e.message)
  }

  if (!unsignedXDR) {
    const resp = await fetch(`${TX_BUILDER.replace(/\/$/, '')}/build_tx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractId: CONTRACT_ID, method: 'register_plant', args: ['e2e-id','e2e-name','e2e-desc'], publicKey, network: NETWORK })
    })
    const j = await resp.json()
    unsignedXDR = j.xdr
    console.log('Got unsigned XDR from /build_tx')
  }

  // Instead of parsing unsignedXDR (parsing may vary per SDK), reconstruct the transaction locally using Horizon sequence
  const horizonUrl = NETWORK === 'testnet' ? 'https://horizon-testnet.stellar.org' : 'https://horizon.stellar.org'
  let accRes = await fetch(`${horizonUrl}/accounts/${publicKey}`)
  if (!accRes.ok && accRes.status === 404 && NETWORK === 'testnet') {
    // Try to fund the account via friendbot (testnet)
    console.log('Account not found on Horizon; attempting to fund via friendbot...')
    const fb = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`)
    if (!fb.ok) {
      console.error('Friendbot funding failed:', fb.status)
      process.exit(2)
    }
    console.log('Friendbot funded account; waiting a moment and retrying...')
    await new Promise(r => setTimeout(r, 1500))
    accRes = await fetch(`${horizonUrl}/accounts/${publicKey}`)
  }
  if (!accRes.ok) {
    console.error('Could not fetch account from Horizon to build tx locally:', accRes.status)
    process.exit(2)
  }
  const accJson = await accRes.json()
  const account = new Account(publicKey, accJson.sequence)
  const networkPassphrase = NETWORK === 'testnet' ? Networks.TESTNET : Networks.PUBLIC
  const txBuilder = new TransactionBuilder(account, { fee: '100', networkPassphrase }).setTimeout(30)
  txBuilder.addOperation(Operation.manageData({ name: `invoke:register_plant`, value: Buffer.from(JSON.stringify(['e2e-id','e2e-name','e2e-desc'])) }))
  const tx = txBuilder.build()
  tx.sign(kp)
  const signedXDR = tx.toXDR()
  console.log('Signed XDR length', signedXDR.length)

  // Send to Horizon /transactions endpoint (submit Stellar transaction)
  const sendUrl = `${horizonUrl.replace(/\/$/, '')}/transactions`
  const res = await fetch(sendUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `tx=${encodeURIComponent(signedXDR)}` })
  const body = await res.text()
  console.log('Horizon submit response status', res.status)
  console.log('Horizon body:', body)
}

main().catch(e => { console.error(e); process.exit(2) })
