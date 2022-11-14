import Link from 'next/link'
type Frontmatter = {
    title: string
    date: string
    description: string
  }
  interface Post {
    slug: string
    frontmatter: Frontmatter
    readTime: string
  }
interface Iprops {
    post: Post
}
const Article = ({ post }: Iprops) => {
    return (
        <article className='flex items-center'>
                <h3 className='flex  gap-[20px]'>
                  <span className='font-light text-sm text-neutral-400 dark:text-neutral-200'>{post.frontmatter.date} · {post.readTime}</span>
                  <Link
                  href={`/blogs/${post.slug.replace(/\.mdx?$/, '')}`}
                  className='align-bottom text-sm font-light text-neutral-500 dark:text-neutral-300 underline hover:decoration-pink-500 underline-offset-6'>
                          {post.frontmatter.title}
                  </Link>
                </h3>
        </article>
    )
}

export default Article