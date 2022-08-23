import { useCallback, useEffect, useState } from 'react'
import useHandleNfts from '../../hooks/useHandleNfts'
import { useWeb3React } from '@web3-react/core'

const Home = () => {
  const { active } = useWeb3React()

  const [maxSupply, setMaxSupply] = useState()

  const virtualitoNFTs = useHandleNfts()

  const getMaxSupply = useCallback(async () => {
    if (virtualitoNFTs) {
      const result = await virtualitoNFTs.methods.maxSuply().call()
      setMaxSupply(result)
    }
  }, [virtualitoNFTs])

  useEffect(() => {
    getMaxSupply()
  }, [getMaxSupply])

  if (!active) {
    return 'Conecta tu wallet'
  }

  return (
    <>
      <p>Max Supply: {maxSupply}</p>
    </>
  )
}

export default Home
