import prisma from './db'
import bcrypt from 'bcrypt'
import { promises as fs } from 'fs'
import { Author, Post as PrismaPost } from '@prisma/client'
import { join } from 'path'
import { getLoginSession } from './auth'
import { Post } from '../utils/types'
import matter from 'gray-matter'

import markdownToHtml from './markdownToHtml'

const HASH_ROUNDS = 10

const POSTS_DIRECTORY = join(process.cwd(), '_posts')

export const getViewer = async (req: any) => {
  let session = null
  if (req) session = await getLoginSession(req)
  if (session) {
    const user = await prisma.user.findFirst({ where: { id: session.id } })
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
