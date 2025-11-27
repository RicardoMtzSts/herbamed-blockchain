// Headless test script to call Soroban client stubs
(async () => {
  try {
    const path = 'file:///home/ricardo1/herbamed-blockchain/frontend/vue-project/src/soroban/client.js'
    const client = await import(path)

    console.log('Loaded client exports:', Object.keys(client))

    console.log('\n--- registerPlant ---')
    const reg = await client.registerPlant({ id: 'p1', name: 'TestPlant', description: 'desc', location: 'lab' })
    console.log('registerPlant ->', reg)

    console.log('\n--- getAllPlants ---')
    const all = await client.getAllPlants()
    console.log('getAllPlants ->', all)

    console.log('\n--- listForSale ---')
    const listed = await client.listForSale('p1', 2.5)
    console.log('listForSale ->', listed)

    console.log('\n--- voteForPlant ---')
    const vote = await client.voteForPlant('p1')
    console.log('voteForPlant ->', vote)

    console.log('\n--- getListing ---')
    const listing = await client.getListing('p1')
    console.log('getListing ->', listing)

    console.log('\n--- getPlantVotes ---')
    const votes = await client.getPlantVotes('p1')
    console.log('getPlantVotes ->', votes)

    console.log('\nAll tests executed successfully')
  } catch (e) {
    console.error('Test script error:', e)
    process.exit(1)
  }
})()
