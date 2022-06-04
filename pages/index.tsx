import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Feed, Modal, Navbar } from '../components'

const Home: NextPage = () => {
  console.log(process.env.NAME)

  return (
    <div className=" bg-gray-100 overflow-hidden h-screen overflow-y-auto scrollbar-thumb-gray-200 scrollbar-track-gray-50 border-gray-200  scrollbar-thin ">
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Navbar />
        <Feed />
        <Modal />
      </main>
    </div>
  )
}

export default Home
