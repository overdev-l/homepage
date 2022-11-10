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
        <article>
            <header>
                <h3>
                <Link href="/" className='text-2xl font-serif font-bold dark:text-slate-300'>{post.frontmatter.title}</Link>
                </h3>
                <small className='font-serif dark:text-slate-300'>{post.frontmatter.date}</small>
            </header>
            <p className='text-xl font-serif dark:text-slate-300'>{post.frontmatter.description}</p>
        </article>
    )
}

export default Article