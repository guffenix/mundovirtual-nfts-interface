import {
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Tag,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'

import { useNftData } from '../../hooks/useNftsData'

import PunkCard from '../../components/punk-card'
import RequestAccess from '../../components/request-access'
import Loading from '../../components/loading'

const Card = () => {
  const { active, account } = useWeb3React()
  const { tokenId } = useParams()
  const { loading, nfts } = useNftData(tokenId)

  if (!active) return <RequestAccess />

  if (loading) return <Loading />

  if (nfts) {
    console.log('->', nfts, tokenId)
  }

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Stack>
        <PunkCard
          mx={{
            base: 'auto',
            md: 0,
          }}
          name={nfts.name}
          image={nfts.image}
        />
        <Button disabled={account !== nfts.owner} colorScheme="green">
          {account !== nfts.owner ? 'No eres el dueño' : 'Transferir'}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading>{nfts.name}</Heading>
        <Text fontSize="xl">{nfts.description}</Text>
        <Text fontWeight={600}>
          DNA:
          <Tag ml={2} colorScheme="green">
            {nfts.dna}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme="green">
            {nfts.owner}
          </Tag>
        </Text>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Atributo</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(nfts.attributes).map(([key, value]) => (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td>
                  <Tag>{value}</Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  )
}

export default Card
