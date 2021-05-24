/* eslint-disable react/no-children-prop */
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrowNightBright } from 'react-syntax-highlighter/dist/cjs/styles/hljs/'
import { Heading, Text, Box, Link, chakra } from '@chakra-ui/react'
import { getPostBySlug, getPostsSlugs } from '../lib/api'
import { Post as PostType } from './types'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const components = {
  code ({ node, inline, className = 'js', children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match
      ? (
      <SyntaxHighlighter style={tomorrowNightBright} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
        )
      : (
      <code className={className} {...props} />
        )
  }
}

const StyledLink = chakra(Link, {
  baseStyle: {
    color: 'teal.500'
  }
})

const Post = ({ post: { slug, title, content }, morePosts, preview }: Props) => {
  const router = useRouter()

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  if (content) {
    return (
      <>
        <Heading size='4xl'>{title}</Heading>
        <Box w='100%' fontSize='large' textAlign='justify'>
          <ReactMarkdown components={{
            code: components.code,
            p: Text,
            h2: Heading,
            a: StyledLink
          }} children={content} />
        </Box>
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
  const post = await getPostBySlug(params.slug)
  return {
    props: {
      post: {
        ...post,
        date: post.date.toJSON()
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
    fallback: false
  }
}

export default Post
