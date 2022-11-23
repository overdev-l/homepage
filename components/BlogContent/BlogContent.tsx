import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import Waterfall from '../../mdxComponents/waterfall'
import MoreColumnWaterfall from '../../mdxComponents/moreColumnWaterfall'
interface Iprops {
    mdxSource: MDXRemoteProps,
}
const components = {
    Waterfall,
    MoreColumnWaterfall
}
const BlogContent = ({ mdxSource }: Iprops) => <>
    <MDXRemote {...mdxSource} components={components}></MDXRemote>
</>

export default BlogContent