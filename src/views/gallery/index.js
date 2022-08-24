import { useWeb3React } from '@web3-react/core'
import { useNftsData } from '../../hooks/useNftsData'
import { Grid } from '@chakra-ui/react'
import PunkCard from '../../components/punk-card'
import Loading from '../../components/loading'
import RequestAccess from '../../components/request-access'
import { Link } from 'react-router-dom'

const Gallery = () => {
  const { active } = useWeb3React()
  const { loading, nfts } = useNftsData()

  if (!active) {
    return <RequestAccess />
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {nfts.map(({ name, image, tokenId }) => (
            <Link key={tokenId} to={`/gallery/${tokenId}`}>
              <PunkCard image={image} name={name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  )
}

export default Gallery
