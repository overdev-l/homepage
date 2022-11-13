import '../styles/globals.css'
import 'highlight.js/styles/github-dark.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Head>
          <title>刘永志的个人网站</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
