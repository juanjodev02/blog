import { Heading, Button, Center } from '@chakra-ui/react'
import Link from 'next/link'

const IndexPage = () => (
  <Center flexDirection='column'>
    <Heading fontSize="6xl">
      ¡Bienvenido!
    </Heading>
    <Link href='/signin'>
      <Button>Login</Button>
    </Link>
  </Center>
)

export default IndexPage
