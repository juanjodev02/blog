import { User, Author, Post } from '@prisma/client'
import { gql, useMutation, useQuery } from '@apollo/client'
import io from 'socket.io-client'
import { Box, Spinner } from '@chakra-ui/react'
import Signin from '../../signin'
import { useRouter } from 'next/router'
import MdeEditor from '../../../components/MdeEditor'
import { useEffect, useState } from 'react'
import { getViewer, getPost } from '../../../lib/api'
import Head from 'next/head'

type Props = {
  user: User
  loggedIn: boolean
  auhtor: Author
  post: Post
  slug: string
}

const SEND_CHANGES = gql`
  mutation onPostChange($slug: String!, $payload: String! ) {
    onPostChange(slug:  $slug, payload: $payload)
  }
`

const GET_POST_CHANGES = gql`
  query getPostChange($slug: String!) {
    getPostChange(slug: $slug) {
      payload
      slug
    }
  }
`

const socket = io()

const EditSlug = ({ user, loggedIn, auhtor, post, slug }: Props) => {
  const router = useRouter()
  if (!loggedIn) {
    useEffect(() => {
      router.replace('/app', '/signin')
    }, [])
    return <Signin loggedIn={loggedIn}/>
  }

  const [values, setValue] = useState('')

  const [content, setContent] = useState('')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/socketio').then(() => {
      socket.on('connect', () => {
        console.log('connect')
      })

      socket.on('getPostChange', (data) => {
        setContent(data.postPayload)
        setLoading(false)
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetch('/api/socketio').finally(() => {
        socket.emit('postChange', { payload: values, slug })
      })
    }, 1000)
    return () => window.clearTimeout(delayDebounceFn)
  }, [values])

  const handleChange = (value: string) => {
    setValue(value)
    setLoading(true)
  }

  return (
    <>
      <Head>
        <link
              rel="preload"
              href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
              as="script"
            />
        <link
          href={'https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css'}
          rel="stylesheet"
        />
      </Head>
      <Box display='flex' spacing='30' alignItems='flex-start' position='fixed' left='0' right='0'>
        <MdeEditor value={values} setValue={handleChange} />
        <Box fontSize='large' textAlign='justify' maxW='50%' sx={{
          h1: { color: 'transparent' },
          h2: {
            fontFamily: 'system-ui',
            fontSize: '2em',
            fontWeight: 'bold'
          }
        }}>
              { loading
                ? <Spinner size='xl'/>
                : <article
                dangerouslySetInnerHTML={{ __html: content }}
              /> }

            </Box>
      </Box>
    </>
  )
}

export default EditSlug

export async function getServerSideProps ({ req, params }) {
  try {
    const user = await getViewer(req, true)
    if (user) {
      const post = await getPost(params.slug)
      return { props: { user, loggedIn: true, author: user.author, post: { ...post, date: post.date.toDateString() }, slug: params.slug } }
    } else {
      return {
        props: {
          loggedIn: false
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        loggedIn: false
      }
    }
  }
}
