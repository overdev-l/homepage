import fs from 'fs'
import matter from 'gray-matter'
import Article from "../components/Article"
import { postsFileName, postsPath } from "utils/mdxUtils"
import dayjs from 'dayjs'
import readingTime from 'reading-time'
import path from 'path'
type Frontmatter = {
  title: string
  date: string
  description: string
}
interface Post {
  slug: string
  frontmatter: Frontmatter,
  readTime: string
}
interface Shici {
  content: string
  origin: string
  author: string
}
interface Iprops {
  posts: Array<Post>
  shici: Shici
}
export default function Home({ posts, shici }: Iprops) {
  return (
    <div className="w-full h-full">
      <h2 className='font-medium text-sm text-slate-500 font-mono mb-3 dark:text-slate-400 text-center'>{shici.content} -- {shici.author}《{shici.origin}》</h2>
      <section className=' flex flex-col gap-y-[5px] border-t'>
        {
          posts.map(post => (<Article key={post.slug} post={post}/>))
        }
      </section>
    </div>
  )
}

export async function getServerSideProps() {
  const data = postsFileName.map(slug => {
    const content = fs.readFileSync(path.join(postsPath, slug), 'utf-8')
    const { data } = matter(content)
    return {
      frontmatter: data,
      slug,
      readTime: readingTime(content).text
    }
  })
  data.sort((pre, nex) => (new Date(nex.frontmatter.date).getTime()) - (new Date(pre.frontmatter.date).getTime()))
  const posts = JSON.parse(JSON.stringify(data)).map((item: Post) => ({
    ...item,
    frontmatter: {
      ...item.frontmatter,
      date: dayjs(item.frontmatter.date).format('YYYY-MM-DD')
    },
  }))
  let url = process.env.NODE_ENV === 'production' ? 'https://overdev/api/shici' : 'http://localhost:3000/api/shici'
  const result = await fetch(url)
  const shici = await result.json()
  return {
    props: {
      posts,
      shici
    }
  }
}