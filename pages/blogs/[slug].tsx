import React from 'react'
import { postsFileName, postsPath } from 'utils/mdxUtils'
import { GetStaticProps, GetStaticPaths } from 'next'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteProps } from 'next-mdx-remote'
import BlogHeader from '../../components/blogHeader/blogHeader'
import BlogContent from '../../components/BlogContent/BlogContent'
import rehypeSlug from 'rehype-slug'
import remarkPrism from 'remark-prism'
type Frontmatter = {
    title: string
    date: Date
    description: string
}
interface IProps {
    frontmatter: Frontmatter
    mdxSource: MDXRemoteProps
}
const SingleBlogPage = ({ frontmatter, mdxSource }: IProps) => {
    return (
        <>
        <BlogHeader frontmatter={frontmatter}/>
        <div className="w-full h-full">
            <h1 className='text-lg w-full pt-[30px] text-center'>{frontmatter.title}</h1>
            <section className=' flex flex-col gap-y-[5px] border-t prose prose-stone dark:prose-invert'>
                <BlogContent mdxSource={mdxSource}/>
            </section>
        </div>
        </>
    )
}
export default SingleBlogPage

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
    const { slug } = params
    const filePath = path.join(postsPath, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)
    frontmatter.date = dayjs(frontmatter.date).format('YYYY-MM-DD')
    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [
              rehypeSlug
            ],
            remarkPlugins: [
                remarkPrism
            ]
          }
    })
    return {
        props: {
            frontmatter,
            mdxSource,
            slug,
        }
    }
}

export const getStaticPaths:GetStaticPaths = async() => {
    const postPaths = postsFileName.map(slug => {
        return ({
            params: {
                slug: slug.replace(/\.mdx?$/, '')
            }
        })
    })
    return {
        paths: postPaths,
        fallback: false
    }
}