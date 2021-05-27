import prisma from './db'
import bcrypt from 'bcrypt'
import { promises as fs } from 'fs'
import { Author, Post as PrismaPost } from '@prisma/client'
import { join } from 'path'
import { getLoginSession } from './auth'
import { Post } from '../utils/types'
import { withDashes } from '../utils/string'
import matter from 'gray-matter'

import markdownToHtml from './markdownToHtml'

const HASH_ROUNDS = 10

const POSTS_DIRECTORY = join(process.cwd(), '_posts')

type PostPayload = {
  slug: string
  payload: string
}

export const getViewer = async (req: any, whitAuthor = false) => {
  let session = null
  if (req) session = await getLoginSession(req)
  if (session) {
    const user = await prisma.user.findFirst({ where: { id: session.id }, include: { author: whitAuthor } })
    return { ...user }
  } else {
    return null
  }
}

export const createUser = async (email: string, password: string, username: string) => {
  const encryptedPassword = await bcrypt.hash(password, HASH_ROUNDS)
  const newUser = await prisma.user.create({
    data: {
      username,
      auth: {
        create: {
          email,
          password: encryptedPassword
        }
      }
    }
  })
  return { user: { ...newUser } }
}

export const getPostsSlugs = async () => {
  const slugs: string [] = []
  const posts = await prisma.post.findMany()
  posts.forEach((post) => slugs.push(post.slug))
  return slugs
}

export const getPostBySlug = async (slug?: string, postToParse?: PrismaPost): Promise<Post> => {
  if (!slug && !postToParse) {
    throw Error('Almost one value is required (slug or post: PrismaPost)')
  }
  const post = postToParse || await prisma.post.findFirst({ where: { slug } })
  const fullPath = join(POSTS_DIRECTORY, `${slug}.md`)
  const fileContent = await fs.readFile(fullPath, 'utf8')
  const { content } = matter(fileContent)
  const htmlContent = await markdownToHtml(content || '')
  return {
    content: htmlContent,
    ...post
  }
}

export const getAllPosts = async () => {
  const posts = await prisma.post.findMany()
  const promisesPost = posts.map((post) => getPostBySlug(undefined, post))
  const parsedPosts = await Promise.all(promisesPost)
  return parsedPosts
}

export const getAuthorById = async (id: number | string): Promise<Author> => {
  let parsedId = id
  if (typeof id === 'string') {
    parsedId = Number(parsedId)
  }
  const author = await prisma.author.findFirst({ where: { id: parsedId as number } })
  return author
}

export const getAuthorByUserId = async (userId: number): Promise<Author> => {
  const author = prisma.author.findFirst({ where: { userId } })
  if (!author) return null
  return author
}

export const createAuthor = async (
  req: any,
  username: string,
  name: string,
  lastName: string,
  twitter:string = '',
  github: string = ''
): Promise<Author> => {
  let session = null
  if (req) session = await getLoginSession(req)
  if (session) {
    return prisma.author.create({
      data: {
        name,
        lastName,
        twitter,
        github,
        user: {
          connect: {
            username
          }
        }
      },
      include: {
        posts: true
      }
    })
  } else {
    throw Error('Unauthenticated')
  }
}

export const createPost = async (title: string, req: any): Promise<String> => {
  const post = await prisma.post.findFirst({ where: { title } })
  if (post) {
    throw new Error('This title already exists')
  }
  const user = await getViewer(req, true)
  if (!user) throw new Error('Missing user data')
  const slug = withDashes(title)
  await fs.appendFile(slug, '')
  await prisma.post.create({
    data: {
      title,
      date: new Date(),
      slug,
      author: {
        connect: {
          id: user.author.id
        }
      }
    }
  })
  await fs.writeFile(`${POSTS_DIRECTORY}/${slug}.md`, '')
  return slug
}

export const getPost = async (slug: string) => {
  return prisma.post.findFirst({ where: { slug } })
}

export const editPost = async (payload: string, slug: string): Promise<void> => {
  await fs.writeFile(`${POSTS_DIRECTORY}/${slug}.md`, payload)
}

export const getPostChange = async (slug: string): Promise<PostPayload> => {
  const fullPath = join(POSTS_DIRECTORY, `${slug}.md`)
  const fileContent = await fs.readFile(fullPath, 'utf8')
  const { content } = matter(fileContent)
  const htmlContent = await markdownToHtml(content || '')
  return {
    payload: htmlContent,
    slug
  }
}
