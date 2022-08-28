import { useCallback, useEffect, useState } from 'react'
import useHandleNfts from '../useHandleNfts'
import { useWeb3React } from '@web3-react/core'

const getData = async ({ virtualitoNFTs, tokenId }) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    virtualitoNFTs.methods.tokenURI(tokenId).call(),
    virtualitoNFTs.methods.tokenDNA(tokenId).call(),
    virtualitoNFTs.methods.ownerOf(tokenId).call(),
    virtualitoNFTs.methods.getAccessoriesType(tokenId).call(),
    virtualitoNFTs.methods.getAccessoriesType(tokenId).call(),
    virtualitoNFTs.methods.getClotheColor(tokenId).call(),
    virtualitoNFTs.methods.getClotheType(tokenId).call(),
    virtualitoNFTs.methods.getEyeType(tokenId).call(),
    virtualitoNFTs.methods.getEyeBrowType(tokenId).call(),
    virtualitoNFTs.methods.getFacialHairColor(tokenId).call(),
    virtualitoNFTs.methods.getFacialHairType(tokenId).call(),
    virtualitoNFTs.methods.getHairColor(tokenId).call(),
    virtualitoNFTs.methods.getHatColor(tokenId).call(),
    virtualitoNFTs.methods.getGraphicType(tokenId).call(),
    virtualitoNFTs.methods.getMouthType(tokenId).call(),
    virtualitoNFTs.methods.getSkinColor(tokenId).call(),
    virtualitoNFTs.methods.getTopType(tokenId).call(),
  ])

  const responseMetadata = await fetch(tokenURI)
  const metadata = await responseMetadata.json()

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  }
}

// request for all nfts
const useNftsData = ({ owner = null } = {}) => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const virtualitoNFTs = useHandleNfts()
  const { library } = useWeb3React()

  const update = useCallback(async () => {
    if (virtualitoNFTs) {
      setLoading(true)

      let tokenIds

      if (!library.utils.isAddress(owner)) {
        const totalSupply = await virtualitoNFTs.methods.totalSupply().call()
        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => index)
      } else {
        const balanceOf = await virtualitoNFTs.methods.balanceOf(owner).call()
        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) =>
            virtualitoNFTs.methods.tokenOfOwnerByIndex(owner, index).call(),
          )

        tokenIds = await Promise.all(tokenIdsOfOwner)
      }

      const nftPromise = tokenIds.map((tokenId) =>
        getData({ virtualitoNFTs, tokenId }),
      )

      const customNfts = await Promise.all(nftPromise)

      setNfts(customNfts)
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [virtualitoNFTs, owner, library?.utils])

  useEffect(() => {
    update()
  }, [update])

  return {
    loading,
    nfts,
    update,
  }
}

const useNftData = (tokenId = null) => {
  const [nfts, setNfts] = useState({})
  const [loading, setLoading] = useState(true)
  const virtualitoNFTs = useHandleNfts()

  const update = useCallback(async () => {
    if (virtualitoNFTs && tokenId != null) {
      setLoading(true)

      const toSet = await getData({ virtualitoNFTs, tokenId })
      setNfts(toSet)

      setLoading(false)
    }
  }, [virtualitoNFTs, tokenId])

  useEffect(() => {
    update()
  }, [update])

  return {
    loading,
    nfts,
    update,
  }
}

export { useNftsData, useNftData }
