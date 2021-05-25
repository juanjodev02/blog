Club de software EPN

## Hola mundo

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

## How to use it?

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```typescript
export const getPostBySlug = async (slug?: string, postToParse?: PrismaPost): Promise<Post> => {
  if (!slug && !postToParse) {
    throw Error('Almost one value is required (slug or post: PrismaPost)')
  }
  const post = postToParse || await prisma.post.findFirst({ where: { slug } })
  const fullPath = join(POSTS_DIRECTORY, `${post.slug}.md`)
  const fileContent = await fs.readFile(fullPath, 'utf8')
  const { content } = matter(fileContent)
  const htmlContent = await markdownToHtml(content || '')
  return {
    content: htmlContent,
    ...post
  }
}
```

**Deploy** `it to the cloud` with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

This is a youtube video:

https://www.youtube.com/watch?v=wZbWiqGC45k

![image](http://localhost:3000/assets/blog/preview/cover.jpg)