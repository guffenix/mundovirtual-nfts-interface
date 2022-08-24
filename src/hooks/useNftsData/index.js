import { useCallback, useEffect, useState } from 'react'
import useHandleNfts from '../useHandleNfts'

const getData = async ({ nftInstance, tokenId }) => {
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
    nftInstance.methods.tokenURI(tokenId).call(),
    nftInstance.methods.tokenDNA(tokenId).call(),
    nftInstance.methods.ownerOf(tokenId).call(),
    nftInstance.methods.getAccessoriesType(tokenId).call(),
    nftInstance.methods.getAccessoriesType(tokenId).call(),
    nftInstance.methods.getClotheColor(tokenId).call(),
    nftInstance.methods.getClotheType(tokenId).call(),
    nftInstance.methods.getEyeType(tokenId).call(),
    nftInstance.methods.getEyeBrowType(tokenId).call(),
    nftInstance.methods.getFacialHairColor(tokenId).call(),
    nftInstance.methods.getFacialHairType(tokenId).call(),
    nftInstance.methods.getHairColor(tokenId).call(),
    nftInstance.methods.getHatColor(tokenId).call(),
    nftInstance.methods.getGraphicType(tokenId).call(),
    nftInstance.methods.getMouthType(tokenId).call(),
    nftInstance.methods.getSkinColor(tokenId).call(),
    nftInstance.methods.getTopType(tokenId).call(),
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
const useNftsData = () => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const virtualitosNfts = useHandleNfts()

  const update = useCallback(async () => {
    if (virtualitosNfts) {
      setLoading(true)

      let tokenIds

      const totalSupply = await virtualitosNfts.methods.totalSupply().call()
      tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index)

      const nftPromise = tokenIds.map((tokenId) =>
        getData({ tokenId, virtualitosNfts }),
      )

      const customNfts = await Promise.all(nftPromise)

      setNfts(customNfts)
      setLoading(false)
    }
  }, [virtualitosNfts])

  useEffect(() => {
    update()
  }, [update])

  return {
    loading,
    nfts,
    update,
  }
}

export { useNftsData }
