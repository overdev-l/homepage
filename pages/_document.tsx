import {Html, Head, Main, NextScript} from 'next/document'

function MyDocument() {
        return (
            <Html lang="zh-CN">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
}

export default MyDocument