import { useEffect } from 'react'
import Link from 'next/link'
import { User, Author } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { getViewer } from '../../lib/api'
import CompleteProfile from './complete-profile'
import Signin from '../signin'
import { useRouter } from 'next/router'
import ProfileHeader from '../../components/ProfileHeader'
import { Button } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'

type props = {
  user: User,
  author?: Author,
  loggedIn: boolean
}

const App = ({ user, loggedIn, author }: props) => {
  const router = useRouter()
  if (!loggedIn) {
    useEffect(() => {
      router.replace('/app', '/signin')
    }, [])
    return <Signin loggedIn={loggedIn}/>
  }
  if (!author) {
    useEffect(() => {
      router.replace('/app', '/app/complete-profile')
    }, [])
    return <CompleteProfile loggedIn={loggedIn} user={user} />
  }
  return (
    <HStack justifyContent='space-between'>
      <ProfileHeader user={user} author={author}/>
      <HStack spacing='30'>
        <Link href={'/app/create'}>
          <Button colorScheme='teal'>Crear</Button>
        </Link>
        <Link href="/signout">
          <Button>Cerrar Sesión</Button>
        </Link>
      </HStack>
    </HStack>
  )
}

export default App

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
