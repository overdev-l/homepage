import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { TextButton } from '../../posts/components/test'
interface Iprops {
    mdxSource: MDXRemoteProps
}
const component = {
    TextButton
}
const BlogContent = ({ mdxSource }: Iprops) => <>
    <MDXRemote {...mdxSource} {...component}></MDXRemote>
</>

export default BlogContent