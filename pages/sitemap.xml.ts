import { getServerSideSitemap } from 'next-sitemap'
import { postsFileName } from '../utils/mdxUtils'
export const getServerSideProps = async (ctx: any) => {
    const paths = postsFileName.map(path => {
        return {
            loc: `https://overdev.cn/${path.replace('.mdx', '')}`,
            lastmod: new Date().toISOString()
        }
    })
    const fields = [
        {
            loc: 'https://overdev.cn',
            lastmod: new Date().toISOString(),
        },
        ...paths
        ]
    return getServerSideSitemap(ctx, fields)
}
export default () => {}