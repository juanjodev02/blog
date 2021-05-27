import { Center, Text, Input, Button, VStack, Box} from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { User, Author } from '@prisma/client'
import Signin from '../../signin'
import { getViewer } from '../../../lib/api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

type props = {
  user: User,
  author?: Author,
  loggedIn: boolean
}

const CREATE_POST = gql`
  mutation createPost($title: String!) {
    createPost(title: $title)
  }
`

const Create = ({ user, loggedIn, author }: props) => {
  const router = useRouter()
  if (!loggedIn) {
    useEffect(() => {
      router.replace('/app', '/signin')
    }, [])
    return <Signin loggedIn={loggedIn}/>
  }

  const [title, setTitle] = useState('')
  const [err, setErr] = useState('')

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: (data) => router.push(`/app/edit/${data.createPost}`)
  })

  const handleSubmit = async () => {
    if (title === '') {
      setErr('Ops, no puedes dejar el título en blanco')
    } else {
      setErr('')
      try {
        await createPost({ variables: { title } })
      } catch (e) {
        console.error(e)
      }
    }
  }

  const onChange = (e) => {
    setErr('')
    setTitle(e.target.value)
  }
  return (
    <Center display='flex' flexDir='column'>
      <VStack spacing='30'>
        <Box alignItems='center' display='flex' flexDir='column'>
          <Text fontSize='xxx-large' mb='0'>
            ¿Sobre que escribirás hoy?
          </Text>
          <Text fontSize='xl' margin='0'>
            Tranquilo, puedes modificarlo más tarde
          </Text>
        </Box>
        <Input placeholder='Título' size='lg' onChange={onChange}/>
        <Text color='red.300'>{err}</Text>
        {error && <Text color='red.300'>{error.message}</Text>}
        <Button onClick={handleSubmit} isLoading={loading}>Siguente</Button>
      </VStack>
    </Center>
  )
}

export async function getServerSideProps ({ req } : GetServerSidePropsContext) {
  const user = await getViewer(req, true)
  if (user) {
    return { props: { user, loggedIn: true, author: user.author } }
  } else {
    return {
      props: {
        loggedIn: false
      }
    }
  }
}

export default Create
