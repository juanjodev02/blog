import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation, useApolloClient } from '@apollo/client'
import { Loading } from '../components/Loading'

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`

function SignOut () {
  const client = useApolloClient()
  const router = useRouter()
  const [signOut] = useMutation(SignOutMutation)

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push('/signin')
      })
    })
  }, [signOut, router, client])

  return <Loading />
}

export default SignOut
