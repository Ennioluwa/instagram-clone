import { useSession } from 'next-auth/react'
import React from 'react'
import { MiniProfile } from '.'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Feed = () => {
  const { data: session } = useSession()
  return (
    <main className=" grid gap-8 p-5 grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto xl:grid-cols-3 xl:max-w-6xl ">
      <section
        className={`col-span-2 ${
          !session &&
          'max-w-3xl self-center xl:col-span-3 xl:justify-self-center'
        }`}
      >
        <Stories />
        <Posts />
      </section>
      {session && (
        <section className=" xl:col-span-1 hidden xl:block relative">
          <div className="sticky top-28">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
