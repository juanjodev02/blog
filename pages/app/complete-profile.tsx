import { useEffect } from 'react'
import {
  Text,
  HStack,
  Center
} from '@chakra-ui/react'
import { gql, useMutation } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'
import { User, Author } from '@prisma/client'
import { useRouter } from 'next/router'
import Signin from '../signin'
import { getAuthorByUserId, getViewer } from '../../lib/api'
import { ProfileImageEditable } from '../../components/ProfileImageEditable'
import { CompleteProfileForm } from '../../components/CompleteProfileForm'

type Props = {
  user: User,
  author?: Author,
  loggedIn: boolean
}

const CREATE_AUTHOR = gql`
  mutation createAuthorMutation ($username: String!, $name: String!, $lastName: String!, $twitter: String, $github: String) {
    createAuthor(username: $username, name: $name, lastName: $lastName, twitter: $twitter, github: $github) {
      id,
      name,
      lastName,
      twitter,
      github
    }
  }
`

const CompleteProfile = ({ loggedIn, user }: Props) => {
  const router = useRouter()

  if (!loggedIn) {
    useEffect(() => {
      router.replace('/app', '/signin')
    }, [])
    return <Signin loggedIn={loggedIn}/>
  }

  const [createMutation, { loading, error }] = useMutation(CREATE_AUTHOR)

  const handleSubmit = async ({ twitter, github, name, lastName }, actions) => {
    await createMutation({
      variables: {
        username: user.username,
        name,
        lastName,
        twitter,
        github
      }
    })
    await router.push('/app')
  }

  return (
    <>
      <Text fontSize='5xl'>
        Completa tu perfil
      </Text>
      <Center>
        <HStack justifyContent='space-between' width='100%'>
          <ProfileImageEditable user={user}/>
          <CompleteProfileForm handleSubmit={handleSubmit} loading={loading} errorMsg={error ? error.message : ''}/>
        </HStack>
      </Center>
    </>
  )
}

export default CompleteProfile

export async function getServerSideProps ({ req } : GetServerSidePropsContext) {
  const user = await getViewer(req)
  if (user) {
    const author = await getAuthorByUserId(user.id)
    return { props: { user, loggedIn: true, author } }
  } else {
    return {
      props: {
        loggedIn: false
      }
    }
  }
}
