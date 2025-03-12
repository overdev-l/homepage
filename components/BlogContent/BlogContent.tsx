import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import Waterfall from '../../mdxComponents/waterfall'
import MoreColumnWaterfall from '../../mdxComponents/moreColumnWaterfall'
import ContenteditableEitorMark from '../../mdxComponents/contenteditableEidtorMark'
import FabricPolygonMask from '../../mdxComponents/fabricPolygonMask'
interface Iprops {
    mdxSource: MDXRemoteProps,
}
const components = {
    Waterfall,
    MoreColumnWaterfall,
    ContenteditableEitorMark,
    FabricPolygonMask
}
const BlogContent = ({ mdxSource }: Iprops) => <>
    <MDXRemote {...mdxSource} components={components}></MDXRemote>
</>

export default BlogContent