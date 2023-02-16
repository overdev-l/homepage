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
interface shiciResult {
  content: string
  origin: string
  author: string
}
interface Iprops {
  posts: Array<Post>
  shiciResult: shiciResult
}
export default function Home({ posts, shiciResult }: Iprops) {
  return (
    <div className="w-full h-full">
      <h2 className='font-medium text-sm text-slate-500 font-mono mb-3 dark:text-slate-400 text-center'>{shiciResult.content} -- {shiciResult.author}《{shiciResult.origin}》</h2>
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
  let shiciResult = {}
  try {
    const response = await fetch('https://v1.jinrishici.com/all.json')
    shiciResult = await response.json()
  } catch (error) {
    shiciResult = {
      content: '择善从之，不善改之',
      origin: '论语‧述而',
      author: '孔子'
    }
  }
  return {
    props: {
      posts,
      shiciResult
    }
  }
}