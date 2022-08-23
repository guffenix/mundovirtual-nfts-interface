import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Networks } from '../Networks'

const connector = new InjectedConnector({
  supportedChainIds: [Networks.Rinkeby, Networks.Goerli],
})

const getLibrary = (provider) => {
  return new Web3(provider)
}

export { connector, getLibrary }
