import { useEffect, useState } from 'react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Heading, Box, VStack, Image, Fade } from '@chakra-ui/react'
import { getPostBySlug, getPostsSlugs, getAuthorById } from '../../lib/api'
import { Post as PostType } from '../../utils/types'
import { AuthorCard } from '../../components/AuthorCard'
import Head from 'next/head'
import { Author } from '.prisma/client'

type Props = {
  post: PostType,
  author: Author
}

const Post = ({ post: pageMeta, author }: Props) => {
  const router = useRouter()
  const [showAuthor, setShowAuthor] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const width = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
      const newShowAuthor = window.scrollY > 200 && width > 1400
      if (showAuthor !== newShowAuthor) {
        setShowAuthor(newShowAuthor)
      }
    }

    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [showAuthor])

  if (!router.isFallback && !pageMeta.slug) {
    return <ErrorPage statusCode={404} />
  }

  if (pageMeta) {
    const content = pageMeta.content
    const meta = {
      title: 'Prism with Next.js',
      description:
        'Example using Prism / Markdown with Next.js including switching syntax highlighting themes.',
      cardImage:
        'https://og-image.now.sh/**Prism**%20with%20Next.js.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg',
      ...pageMeta
    }
    return (
      <>
        <Head>
          <title>{meta.title}</title>
          <meta charSet="utf-8" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta name="robots" content="follow, index" />
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta content={meta.description} name="description" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.cardImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@juanjodev02" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.cardImage} />
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
        <VStack spacing='10' my='10' alignItems='flex-start'>
          <Heading size='3xl'>{meta.title}</Heading>
          <Image
            boxSize='50em'
            objectFit='cover'
            src='/assets/blog/preview/cover.jpg'
            alt="Dan Abramov"
            w='100%'
            maxHeight='40vh'
            borderRadius='20px'
          />
          <Box fontSize='large' textAlign='justify' width='100%' sx={{
            h1: { color: 'transparent' },
            h2: {
              fontFamily: 'system-ui',
              fontSize: '2em',
              fontWeight: 'bold'
            }
          }}>
            <article
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Box>
        </VStack>
        <Fade in={showAuthor}>
          {/* {showAuthor && <AuthorCard
              avatarSrc={''}
              name={author.name}
              lastName={author.lastName}
            />
          } */}
          <AuthorCard
              avatarSrc={''}
              name={author.name}
              lastName={author.lastName}
            />
        </Fade>
      </>
    )
  }
  return (
    <>
    <Heading>Loading ...</Heading>
    </>
  )
}

type Params = {
    slug: string
}

export async function getStaticProps ({ params }: GetStaticPropsContext<Params>) {
  try {
    const post = await getPostBySlug(params.slug)
    const author = await getAuthorById(post.authorId)
    return {
      props: {
        post: {
          ...post,
          date: post.date.toJSON()
        },
        author
      }
    }
  } catch (error) {
    console.error(error)
    return {
      redirect: {
        destination: '/error',
        permanent: false
      }
    }
  }
}

export async function getStaticPaths () {
  const postsSlugs = await getPostsSlugs()
  const parsedSlugs = postsSlugs.map((slug) => ({
    params: {
      slug
    }
  }))
  return {
    paths: parsedSlugs,
    fallback: true
  }
}

export default Post
