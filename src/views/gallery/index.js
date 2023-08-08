import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useNftsData } from '../../hooks/useNftsData'
import PunkCard from '../../components/punk-card'
import Loading from '../../components/loading'
import RequestAccess from '../../components/request-access'
import {
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
  Badge,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useHistory, useLocation, Link } from 'react-router-dom'

const Gallery = () => {
  const { active, library } = useWeb3React()
  const { search } = useLocation()
  const { push } = useHistory()

  const [submitted, setSubmitted] = useState(true)
  const [validAddress, setValidAddress] = useState(true)

  const [address, setAddress] = useState(
    new URLSearchParams(search).get('address')
  )

  const { loading, nfts } = useNftsData({
    owner: submitted && validAddress ? address : null,
  })

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value)
    setSubmitted(false)
    setValidAddress(false)
  }

  const submit = (event) => {
    event.preventDefault()

    if (address) {
      const isValid = library.utils.isAddress(address)
      setValidAddress(isValid)
      setSubmitted(true)
      if (isValid) {
        push(`/nfts?address=${address}`)
      }
    } else {
      push('/gallery')
    }
  }

  if (!active) {
    return <RequestAccess />
  }

  return (
    <>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              isInvalid={false}
              value={address ?? ''}
              onChange={handleAddressChange}
              placeholder="Buscar por dirección"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText mb={4}>
              <Badge colorScheme="red">Dirección inválida</Badge>
            </FormHelperText>
          )}
        </FormControl>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {nfts.map(({ name, image, tokenId }) => (
            <Link key={tokenId} to={`/nft/${tokenId}`}>
              <PunkCard image={image} name={name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  )
}

export default Gallery
