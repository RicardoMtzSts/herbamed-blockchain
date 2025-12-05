<template>
  <div class="container mt-4">
    <div class="card mx-auto" style="max-width:640px">
      <div class="card-body">
        <h4 class="card-title text-center">Conectar / Seleccionar Modo</h4>

        <!-- Estado del modo actual -->
        <div v-if="storeMode" class="alert" :class="storeMode==='demo' ? 'alert-primary' : 'alert-success'">
          <strong>Modo actual:</strong>
          <span v-if="storeMode==='demo'">📦 Demo (localStorage)</span>
          <span v-else>⛓️ Blockchain (firma real)</span>
        </div>

        <!-- Selección de modo global -->
        <div class="mb-3 p-3 border rounded bg-light">
          <h6 class="mb-2">Selecciona el modo de la aplicación</h6>
          <div class="d-flex gap-2 mb-2">
            <button :class="['btn', selectedMode==='demo' ? 'btn-primary' : 'btn-outline-primary']" @click="selectedMode='demo'">Demo (localStorage)</button>
            <button :class="['btn', selectedMode==='blockchain' ? 'btn-success' : 'btn-outline-success']" @click="selectedMode='blockchain'">Blockchain (firma real)</button>
          </div>
          <div v-if="selectedMode==='demo'" class="small text-muted">
            Modo Demo: Opera sin firmar transacciones reales, datos sólo en tu navegador.
          </div>
            <div v-else-if="selectedMode==='blockchain'" class="small text-muted">
            Modo Blockchain: Requiere Freighter funcional o haber importado tu SECRET_KEY.
          </div>
          <div class="mt-3">
            <button class="btn btn-warning" :disabled="!selectedMode" @click="confirmMode">Confirmar Modo</button>
            <span v-if="modeStatus" class="ms-2 small" :class="modeStatus.type==='error' ? 'text-danger' : 'text-success'">{{ modeStatus.message }}</span>
          </div>
        </div>

        <ul class="nav nav-tabs mb-3">
          <li class="nav-item">
            <a :class="['nav-link', activeTab==='login' ? 'active' : '']" href="#" @click.prevent="activeTab='login'">Ingresar</a>
          </li>
          <li class="nav-item" v-if="isDemo">
            <a :class="['nav-link', activeTab==='create' ? 'active' : '']" href="#" @click.prevent="activeTab='create'">Crear Cuenta</a>
          </li>
          <li class="nav-item" v-if="isBlockchain">
            <a :class="['nav-link', activeTab==='import' ? 'active' : '']" href="#" @click.prevent="activeTab='import'">Importar Clave</a>
          </li>
        </ul>

        <div v-if="activeTab==='login'">
          <!-- Login adaptado por modo -->
          <template v-if="isDemo">
            <p class="text-muted">Inicia sesión con la cuenta local guardada (cifrada).</p>
            <div class="mb-3">
              <label class="form-label">Contraseña</label>
              <input v-model="loginPassword" type="password" class="form-control" placeholder="Tu contraseña" />
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-primary" @click="loginLocal">Ingresar (local)</button>
              <button class="btn btn-outline-secondary" @click="logout">Desconectar</button>
            </div>
          </template>
          <template v-else>
            <p class="text-muted">Conecta tu wallet Freighter para firmar transacciones.</p>
            <div class="row g-3 align-items-center">
              <div class="col-auto d-flex gap-2">
                <button class="btn btn-primary" @click="connectFreighter">Conectar Freighter</button>
                <button class="btn btn-outline-secondary" @click="logout">Desconectar</button>
              </div>
              <div class="col">
                <div class="card border-info">
                  <div class="card-body p-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Ver clave pública (QR)</strong>
                        <div class="small text-muted">Para copiar manualmente en wallet móvil.</div>
                      </div>
                      <button class="btn btn-sm btn-info" @click="showQr = !showQr">{{ showQr ? 'Ocultar' : 'Mostrar' }} QR</button>
                    </div>
                    <div v-if="showQr" class="mt-2 text-center">
                      <img :src="loginQrUrl" alt="Login QR" />
                      <div class="small text-muted mt-1">
                        <template v-if="storeMode === 'blockchain' && publicKey">
                          <strong>Tu clave pública</strong> (cópiala manualmente en Freighter móvil).<br>
                          Para login automático con QR necesitas WalletConnect.
                        </template>
                        <template v-else>
                          Escanea para descargar Freighter. Para sesión QR nativa integra WalletConnect v2.
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div v-if="activeTab==='create' && isDemo">
          <p class="text-muted">Crea una cuenta local. Se generará una clave secreta que se cifrará con la contraseña que elijas.</p>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="createPassword" type="password" class="form-control" placeholder="Nueva contraseña" />
          </div>
          <div class="mb-3">
            <label class="form-label">Confirmar contraseña</label>
            <input v-model="createPasswordConfirm" type="password" class="form-control" placeholder="Repetir contraseña" />
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-success" @click="createAccount">Crear Cuenta</button>
            <button class="btn btn-outline-secondary" @click="generateOnly">Generar (no guardar)</button>
          </div>

          <div v-if="newAccount">
            <hr />
            <h5>Cuenta generada</h5>
            <p><strong>Public Key:</strong> {{ newAccount.publicKey }}</p>
            <p class="text-danger"><strong>Secret (guárdala en un lugar seguro):</strong></p>
            <pre class="p-2 bg-light">{{ newAccount.secret }}</pre>
            <p class="small text-muted">Puedes escanear el QR para guardar la clave en tu móvil (no compartas este código).</p>
            <img :src="accountQrUrl" alt="QR" />
          </div>
        </div>

        <div v-if="activeTab==='import' && isBlockchain">
          <div class="alert alert-success mb-3">
            <strong>✅ Método Recomendado:</strong> Importa tu SECRET_KEY para firmar transacciones directamente sin depender de Freighter.
          </div>
          <p class="text-muted">Pega tu clave secreta (empieza con 'S'). Puedes guardarla cifrada o solo usarla en memoria.</p>
          <div class="mb-3">
            <label class="form-label">Clave secreta</label>
            <input v-model="importSecret" type="text" class="form-control" placeholder="S..." />
          </div>
          <div class="mb-3">
            <label class="form-label">Guardar con contraseña (opcional)</label>
            <input v-model="importPassword" type="password" class="form-control" placeholder="Contraseña para cifrar (opcional)" />
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" @click="importAndSave">Importar y Guardar</button>
            <button class="btn btn-outline-primary" @click="importOnly">Solo importar (no guardar)</button>
          </div>
        </div>

        <div v-if="status" class="mt-3 alert" :class="status.type === 'error' ? 'alert-danger' : 'alert-success'">{{ status.message }}</div>

        <div v-if="publicKey" class="mt-3 alert alert-info">
          <strong>Cuenta activa:</strong> {{ publicKey.slice(0,4) }}…{{ publicKey.slice(-4) }}
          <template v-if="balance !== '—'"> • <strong>Balance:</strong> {{ balance }} XLM</template>
        </div>

        <div class="mt-3 text-center small text-muted">Freighter: <strong>{{ freighterText }}</strong> • RPC: <strong>{{ rpcText }}</strong> <template v-if="isBlockchain">• Red: <strong>{{ networkLabel }}</strong></template></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { connectWallet, setLocalSecret, isFreighterInstalled, isRpcAvailable, waitForFreighterInjection, disconnectWallet } from '@/soroban/client'
import { NETWORK } from '@/soroban/config'
import { fetchBalance } from '@/soroban/balance'
import { Keypair } from '@stellar/stellar-sdk'
import QRCode from 'qrcode'

// Helpers Web Crypto
function buf2b64(buf) { return btoa(String.fromCharCode(...new Uint8Array(buf))) }
function b642buf(b64) { return Uint8Array.from(atob(b64), c => c.charCodeAt(0)) }

async function deriveKey(password, salt) {
  const enc = new TextEncoder()
  const passKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, passKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
}

async function encryptSecret(secret, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt)
  const enc = new TextEncoder()
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(secret))
  return { salt: buf2b64(salt), iv: buf2b64(iv), data: buf2b64(ct) }
}

async function decryptSecret(payload, password) {
  const salt = b642buf(payload.salt)
  const iv = b642buf(payload.iv)
  const data = b642buf(payload.data)
  const key = await deriveKey(password, salt)
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data)
  const dec = new TextDecoder()
  return dec.decode(pt)
}

export default {
  name: 'LoginAdvanced',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    // Pestaña activa dentro de Wallet: por defecto 'login'
    const activeTab = ref('login')
    const loginPassword = ref('')
    const createPassword = ref('')
    const createPasswordConfirm = ref('')
    const newAccount = ref(null)
    const importSecret = ref('')
    const importPassword = ref('')
    const status = ref(null)
    const showQr = ref(false)
    const loginQrUrl = ref('')
    const accountQrUrl = ref('')

    const freighterText = ref('Detectando...')
    const rpcText = ref('...')
    const selectedMode = ref(null)
    const storeMode = computed(() => store.state.mode || localStorage.getItem('herbamed:mode'))
    const isDemo = computed(() => storeMode.value === 'demo')
    const isBlockchain = computed(() => storeMode.value === 'blockchain')
    const modeStatus = ref(null)
    // Permitir confirmar modo sin requisitos previos (el usuario podrá conectar/importar después)
    const canConfirmMode = computed(() => !!selectedMode.value)
    const publicKey = computed(() => store.state.publicKey)
    const balance = computed(() => store.state.balance || '—')
    
    onMounted(async () => {
      // Wait for Freighter to inject
      await waitForFreighterInjection()
      freighterText.value = isFreighterInstalled() ? 'Instalada ✓' : 'No detectada'
      
      // Check RPC
      const rpcAvailable = await isRpcAvailable()
      rpcText.value = rpcAvailable ? 'Disponible' : 'No disponible'

      // Sincronizar selección con el modo actual almacenado
      selectedMode.value = storeMode.value || null
    })

    // Si el modo cambia (confirmado en wallet o restaurado), sincronizar UI
    watch(storeMode, (m) => {
      selectedMode.value = m
      // Mensaje breve de confirmación visual
      if (m) modeStatus.value = { type: 'success', message: `Modo activo: ${m}` }
      // Ajustar pestaña activa si la actual deja de ser válida
      if (m === 'demo' && activeTab.value === 'import') {
        activeTab.value = 'login'
      }
      if (m === 'blockchain' && activeTab.value === 'create') {
        activeTab.value = 'login'
      }
      // Limpiar mensaje después de unos segundos
      setTimeout(() => { if (modeStatus.value?.message?.startsWith('Modo activo')) modeStatus.value = null }, 2500)
    })

    async function generateQR(content) {
      try {
        return await QRCode.toDataURL(content, { width: 240, margin: 1 })
      } catch (e) {
        console.error('QR generation failed:', e)
        return ''
      }
    }

    // Genera un QR con la clave pública de la sesión activa (si existe)
    // Para WalletConnect real, necesitas integrar @walletconnect/client y generar wc: URI
    watch([publicKey, showQr], async ([pk, show]) => {
      if (show) {
        const content = pk || 'https://freighter.app'
        loginQrUrl.value = await generateQR(content)
      }
    }, { immediate: true })

    // Generate QR for newly created account
    watch(newAccount, async (acc) => {
      if (acc && acc.secret) {
        accountQrUrl.value = await generateQR(acc.secret)
      } else {
        accountQrUrl.value = ''
      }
    })

    async function createAccount() {
      status.value = null
      if (!createPassword.value) { status.value = { type: 'error', message: 'Ingresa una contraseña' }; return }
      if (createPassword.value !== createPasswordConfirm.value) { status.value = { type: 'error', message: 'Las contraseñas no coinciden' }; return }
      const kp = Keypair.random()
      const secret = kp.secret()
      const pub = kp.publicKey()
      // cifrar y guardar
      try {
        const payload = await encryptSecret(secret, createPassword.value)
        localStorage.setItem('herbamed:account', JSON.stringify(payload))
        // establecer localmente
        setLocalSecret(secret)
        store.commit('SET_PUBLIC_KEY', pub)
        newAccount.value = { secret, publicKey: pub }
        status.value = { type: 'success', message: 'Cuenta creada y guardada localmente (cifrada).' }
        // Fetch balance
        if (isBlockchain.value) {
          const bal = await fetchBalance(pub)
          if (bal) store.commit('SET_BALANCE', bal)
        }
      } catch (e) {
        status.value = { type: 'error', message: 'Error al crear cuenta: ' + e.message }
      }
    }

    function generateOnly() {
      const kp = Keypair.random()
      newAccount.value = { secret: kp.secret(), publicKey: kp.publicKey() }
      status.value = { type: 'success', message: 'Cuenta generada (no guardada).' }
    }

    async function loginLocal() {
      status.value = null
      const raw = localStorage.getItem('herbamed:account')
      if (!raw) { status.value = { type: 'error', message: 'No hay cuenta guardada localmente.' }; return }
      try {
        const payload = JSON.parse(raw)
        const secret = await decryptSecret(payload, loginPassword.value)
        setLocalSecret(secret)
        try { const pub = Keypair.fromSecret(secret).publicKey(); store.commit('SET_PUBLIC_KEY', pub); if (isBlockchain.value) { const bal = await fetchBalance(pub); if (bal) store.commit('SET_BALANCE', bal) } } catch (_) {}
        status.value = { type: 'success', message: 'Sesión iniciada con cuenta local.' }
      } catch (e) {
        status.value = { type: 'error', message: 'Error al descifrar la cuenta. Contraseña incorrecta?' }
      }
    }

    async function importAndSave() {
      status.value = null
      if (!importSecret.value) { status.value = { type: 'error', message: 'Pega la clave secreta' }; return }
      if (!importPassword.value) { status.value = { type: 'error', message: 'Ingresa una contraseña para guardar' }; return }
      try {
        // validar
        Keypair.fromSecret(importSecret.value)
        const payload = await encryptSecret(importSecret.value, importPassword.value)
        localStorage.setItem('herbamed:account', JSON.stringify(payload))
        setLocalSecret(importSecret.value)
        try { const pub = Keypair.fromSecret(importSecret.value).publicKey(); store.commit('SET_PUBLIC_KEY', pub); if (isBlockchain.value) { const bal = await fetchBalance(pub); if (bal) store.commit('SET_BALANCE', bal) } } catch (_) {}
        status.value = { type: 'success', message: 'Clave importada y guardada (cifrada).' }
      } catch (e) {
        status.value = { type: 'error', message: 'Clave inválida: ' + e.message }
      }
    }

    function importOnly() {
      try {
        setLocalSecret(importSecret.value)
        try { const pub = Keypair.fromSecret(importSecret.value).publicKey(); store.commit('SET_PUBLIC_KEY', pub); if (isBlockchain.value) { fetchBalance(pub).then(bal => { if (bal) store.commit('SET_BALANCE', bal) }) } } catch (_) {}
        status.value = { type: 'success', message: 'Clave importada en memoria (no guardada).' }
      } catch (e) {
        status.value = { type: 'error', message: 'Clave inválida: ' + e.message }
      }
    }

    async function connectFreighter() {
      status.value = null
      try {
        // Attempt connection (will wait for Freighter injection)
        const pk = await connectWallet()
        if (!pk) {
          status.value = { type: 'error', message: 'Freighter no devolvió una clave pública. ¿Rechazaste la conexión?' }
          return
        }
        freighterText.value = 'Conectada ✓'
        try { store.commit('SET_PUBLIC_KEY', pk); const bal = await fetchBalance(pk); if (bal) store.commit('SET_BALANCE', bal) } catch (_) {}
        status.value = { type: 'success', message: 'Freighter conectada: ' + pk }
      } catch (e) {
        const errorMsg = e.message || String(e)
        if (errorMsg.includes('not available') || errorMsg.includes('API not available')) {
          status.value = { type: 'error', message: 'Freighter no está instalada o no está habilitada. Instálala desde: https://freighter.app' }
        } else if (errorMsg.includes('User declined')) {
          status.value = { type: 'error', message: 'Rechazaste la conexión en Freighter' }
        } else {
          status.value = { type: 'error', message: 'Error conectando Freighter: ' + errorMsg }
        }
      }
    }

    function logout() {
      // limpiar estado local (no borra almacenamiento)
      setLocalSecret && setLocalSecret('')
      try { disconnectWallet() } catch (_) {}
      try { store.commit('SET_PUBLIC_KEY', null); store.commit('SET_BALANCE', null) } catch (_) {}
      status.value = { type: 'success', message: 'Desconectado (nota: la clave almacenada sigue en localStorage si la guardaste).' }
    }

    async function confirmMode() {
      modeStatus.value = null
      if (!selectedMode.value) {
        modeStatus.value = { type: 'error', message: 'Selecciona un modo primero.' }
        return
      }
      // Ya no bloqueamos confirmar Blockchain por falta de Freighter/SECRET.
      try {
        await store.dispatch('setMode', selectedMode.value)
        modeStatus.value = { type: 'success', message: 'Modo establecido: ' + selectedMode.value }
        // Mantenerse en Wallet y mostrar opciones correspondientes
        if (selectedMode.value === 'demo' && activeTab.value === 'import') {
          activeTab.value = 'login'
        }
        if (selectedMode.value === 'blockchain' && activeTab.value === 'create') {
          activeTab.value = 'login'
        }
      } catch (e) {
        modeStatus.value = { type: 'error', message: 'Error guardando modo: ' + (e.message || e) }
      }
    }

    const networkLabel = computed(() => NETWORK === 'testnet' ? 'Testnet' : 'Mainnet')

    return { activeTab, loginPassword, createPassword, createPasswordConfirm, newAccount, importSecret, importPassword, status, freighterText, rpcText, createAccount, generateOnly, loginLocal, importAndSave, importOnly, connectFreighter, logout, selectedMode, modeStatus, canConfirmMode, confirmMode, storeMode, isDemo, isBlockchain, networkLabel, showQr, loginQrUrl, publicKey, balance, accountQrUrl }
  }
}
</script>

<style scoped>
pre { white-space: pre-wrap; word-break: break-word; }
</style>
