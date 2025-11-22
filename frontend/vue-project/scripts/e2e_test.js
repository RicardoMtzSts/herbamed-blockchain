import fetch from 'node-fetch'
import { Keypair, Transaction } from '@stellar/stellar-sdk'

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

  // Sign unsignedXDR with local key
  const txObj = Transaction.fromXDR(unsignedXDR, NETWORK === 'testnet' ? 'Test SDF Network ; September 2015' : 'Public Global Stellar Network ; September 2015')
  txObj.sign(kp)
  const signedXDR = txObj.toXDR()
  console.log('Signed XDR length', signedXDR.length)

  // Send to RPC
  const sendUrl = `${RPC_URL.replace(/\/$/, '')}/send_transaction`
  const res = await fetch(sendUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tx: signedXDR }) })
  const body = await res.text()
  console.log('RPC send response status', res.status)
  console.log('RPC body:', body)
}

main().catch(e => { console.error(e); process.exit(2) })
