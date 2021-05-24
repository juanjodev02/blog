import {
  Link as ChakraLink,
  Box,
  VStack,
  Text,
  useColorModeValue,
  Center,
  useToast
} from '@chakra-ui/react'
import { User } from 'prisma'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { GetServerSidePropsContext } from 'next'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import { SigninForm } from '../components/SigninForm'
import { getViewer } from '../lib/api'
import { useState, useEffect } from 'react'

const AppPage = dynamic(() => import('./app'))

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
      }
    }
  }
`

type Props = {
  loggedIn: boolean,
  user?: User
}

function SignIn ({ loggedIn, user }: Props) {
  const router = useRouter()
  if (loggedIn) {
    useEffect(() => {
      router.replace('/signin', '/app')
    }, [])
    return <AppPage loggedIn={loggedIn} user={user} />
  }

  const [errorMsg, setErrorMsg] = useState()
  const client = useApolloClient()
  const toast = useToast()
  const [signIn, { loading }] = useMutation(SignInMutation, {
    onCompleted: () => {
      toast({
        title: 'Hola, nos contenta el verte de nuevo',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
      router.push('/app')
    }
  })
  const bg = useColorModeValue('gray.50', 'black')
  const color = useColorModeValue('dark', 'light')

  async function handleSubmit ({ email, password }, { setSubmitting }) {
    try {
      await client.resetStore()
      await signIn({
        variables: {
          email,
          password
        }
      })
    } catch (error) {
      console.error(error)
      setErrorMsg(getErrorMessage(error))
      await setSubmitting(false)
    }
  }

  return (
      <Center flexDirection='column' height='100%'>
        <VStack spacing='1em'>
          <Box bg={bg} color={color} borderWidth="1px" borderRadius="lg" w={[400, 400, 450]} padding='20px' display='block'>
              <Center>
                <Text fontSize="4xl" colorScheme='teal'>Inicia sesión</Text>
              </Center>
              <SigninForm loading={loading} errorMsg={errorMsg} handleSubmit={handleSubmit} />
          </Box>
          <Box>
            <Text>¿Aún no tienes cuenta? <Link href='/signup'><ChakraLink>crea la tuya aquí </ChakraLink></Link></Text>
          </Box>
        </VStack>
      </Center>
  )
}

export default SignIn

export async function getServerSideProps ({ req }: GetServerSidePropsContext) {
  const user = await getViewer(req)
  if (user) {
    return {
      props: {
        loggedIn: true,
        user
      }
    }
  } else {
    return {
      props: {
        loggedIn: false
      }
    }
  }
}
