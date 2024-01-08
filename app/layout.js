import { Inter } from 'next/font/google'
import './ui/globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Onepiece Gym',
  description: 'GYM Homepage and Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
          <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;700;900&display=swap" rel="stylesheet"/>
        <title>One Piece Gym</title>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
