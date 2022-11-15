import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import Waterfall from '../../mdxComponents/waterfall'
interface Iprops {
    mdxSource: MDXRemoteProps,
}
const components = {
    Waterfall
}
const BlogContent = ({ mdxSource }: Iprops) => <>
    <MDXRemote {...mdxSource} components={components}></MDXRemote>
</>

export default BlogContent