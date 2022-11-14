import Link from 'next/link'
type Frontmatter = {
    title: string
    date: string
    description: string
  }
  interface Post {
    slug: string
    frontmatter: Frontmatter
  }
interface Iprops {
    post: Post
}
const Article = ({ post }: Iprops) => {
    return (
        <article className='flex gap-[20px] items-center'>
                <span className='font-light text-sm text-neutral-400 dark:text-neutral-200'>{post.frontmatter.date}</span>
                <Link
                 href={`/blogs/${post.slug.replace(/\.mdx?$/, '')}`}
                 className='align-bottom text-base font-normal text-neutral-500 dark:text-neutral-300 underline decoration-pink-500 underline-offset-6'>
                        {post.frontmatter.title}
                </Link>
        </article>
    )
}

export default Article