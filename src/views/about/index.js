import React from 'react'
import {
  Stack,
  Heading,
  Text,
  ListItem,
  UnorderedList,
  Link,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const About = () => {
  return (
    <Stack
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 10, md: 18 }}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
        >
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '25%',
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'purple.300',
              zIndex: -1,
            }}
          >
            Un poco sobre los CypherPunk
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          Sobre este proyecto, para la generación de los cypherpunk avatar se ha
          establecido una semilla de generación que aportará con un secuencial
          basado en tu address.
        </Text>
        <Text color={'gray.500'}>
          Te dejo un par de enlaces que seguro te gustarán:
        </Text>
        <Stack>
          <UnorderedList>
            <ListItem>
              <Link
                href="https://nakamotoinstitute.org/static/docs/cypherpunk-manifesto.txt"
                isExternal
                color="purple.500"
              >
                Manifiesto CypherPunk <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://platzi.com/clases/2836-audiocurso-cypherpunks/47051-tim-may-y-la-fundacion-de-los-cypherpunks/"
                isExternal
                color="purple.500"
              >
                Fundación de CypherPunk <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
          </UnorderedList>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default About
