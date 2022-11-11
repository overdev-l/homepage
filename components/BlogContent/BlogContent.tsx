import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
interface Iprops {
    mdxSource: MDXRemoteProps
}
const BlogContent = ({ mdxSource }: Iprops) => <>
    <MDXRemote {...mdxSource}></MDXRemote>
</>

export default BlogContent