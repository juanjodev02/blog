import { Post as PrismaPost } from '@prisma/client'

export type Post = {
  content: string
} & PrismaPost
