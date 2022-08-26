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
  useToast,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'

import { useNftData } from '../../hooks/useNftsData'

import PunkCard from '../../components/punk-card'
import RequestAccess from '../../components/request-access'
import Loading from '../../components/loading'
import { useState } from 'react'
import useHandleNfts from '../../hooks/useHandleNfts'

const Card = () => {
  const { active, account, library } = useWeb3React()
  const { tokenId } = useParams()
  const { loading, nfts, update } = useNftData(tokenId)
  const toast = useToast()
  const mundoVirtualNFT = useHandleNfts()
  const [transfering, setTransfering] = useState(false)

  const transfer = () => {
    setTransfering(true)

    const address = prompt('Ingresa la dirección: ')
    const isAddress = library.utils.isAddress(address)

    if (!isAddress) {
      toast({
        title: 'Dirección Inválida',
        description: 'La dirección no es una dirección de Ethereum',
        status: 'error',
      })

      setTransfering(false)
    } else {
      mundoVirtualNFT.methods
        .safeTransferFrom(nfts.owner, address, nfts.tokenId)
        .send({
          from: account,
        })
        .on('error', () => {
          setTransfering(false)
        })
        .on('transactionHash', (txHash) => {
          toast({
            title: 'Transacción enviada',
            description: txHash,
            status: 'info',
          })
        })
        .on('receipt', () => {
          setTransfering(false)
          toast({
            title: 'Transacción confirmada',
            description: `Transacción exitosa, el nuevo dueño es ${address}`,
            status: 'success',
          })
          update()
        })
    }
  }

  if (!active) return <RequestAccess />

  if (loading) return <Loading />

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
        <Button
          disabled={account !== nfts.owner}
          colorScheme="green"
          isLoading={transfering}
          onClick={transfer}
        >
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
