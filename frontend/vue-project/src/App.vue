<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">HerbaMed</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/plants">🌱 Plantas</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/plants/register">➕ Registrar</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/marketplace">🛒 Marketplace</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/validator">✓ Validadores</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">🔑 Wallet</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="py-5">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>