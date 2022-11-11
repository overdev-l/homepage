import Head from "next/head"
type Frontmatter = {
    title: string
    date: Date
    description: string
}
interface IProps {
    frontmatter: Frontmatter
}
const BlogHeader = ({ frontmatter }: IProps) => {
    return <>
        <Head>
            <title>{frontmatter.title}</title>
            <meta name="description" content={frontmatter.description} />
        </Head>
    </>
}
export default BlogHeader