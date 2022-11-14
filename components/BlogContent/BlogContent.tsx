import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
interface Iprops {
    mdxSource: MDXRemoteProps,
}
const components = {}
const BlogContent = ({ mdxSource }: Iprops) => <>
    <MDXRemote {...mdxSource} components={components}></MDXRemote>
</>

export default BlogContent