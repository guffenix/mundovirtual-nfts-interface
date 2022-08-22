import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'

const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
}

const connector = new InjectedConnector({
  supportedChainIds: [Networks.Rinkeby, Networks.Goerli],
})

const getLibrary = (provider) => {
  return new Web3(provider)
}

export { connector, getLibrary }
