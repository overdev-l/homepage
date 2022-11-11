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
        <article className='flex justify-between'>
                <h3>
                <Link
                 href="/"
                 className='align-bottom text-sm font-serif dark:text-slate-100 underline decoration-dashed hover:no-underline'>
                    <cite>
                        {post.frontmatter.title}
                    </cite>
                </Link>
                </h3>
                <small className='font-serif dark:text-slate-300'>{post.frontmatter.date}</small>
        </article>
    )
}

export default Article