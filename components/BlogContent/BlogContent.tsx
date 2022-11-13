import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
interface Iprops {
    mdxSource: MDXRemoteProps
}
const component = {
    
}
const BlogContent = ({ mdxSource }: Iprops) => <>
    <MDXRemote {...mdxSource} {...component}></MDXRemote>
</>

export default BlogContent