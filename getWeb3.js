const Web3 = require('web3')
let getWeb3 = (endpoint = "http://localhost:8545") => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
      var results

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(web3.currentProvider)

        results = {
          web3: web3
        }

        console.log('Injected web3 detected.');

        resolve(results)
      } else {
        // Fallback to localhost if no web3 injection.
        var provider = new Web3.providers.HttpProvider(endpoint)

        web3 = new Web3(provider)

        results = {
          web3: web3
        }

        console.log('No web3 instance injected, using Local web3.');
        resolve(results)
      }
  })
}

module.exports = getWeb3
