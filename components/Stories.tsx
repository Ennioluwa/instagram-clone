import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
const Stories = () => {
  const { data: session } = useSession()
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      id: i,
    }))
    setSuggestions(suggestions)
    console.log(suggestions)
  }, [])

  return (
    <div className=" flex gap-2 p-6 border scrollbar-thin rounded-md scrollbar-thumb-gray-900 scrollbar-track-gray-100 border-gray-200 mt-5 items-center overflow-x-auto">
      {session && (
        <div className=" flex cursor-pointer flex-col gap-1 justify-center items-center bg-white">
          {session.user?.image && (
            <div className="relative h-14 w-14 rounded-full hover:scale-110 transition-transform duration-200 ease-out border-2 ring-2 border-white ring-red-500 overflow-clip">
              <Image
                src={session.user?.image}
                objectFit="contain"
                layout="fill"
                priority
                className="p-[1.5px]"
              />
            </div>
          )}
          <p className=" text-xs w-14 truncate text-center">
            {session.user?.name}
          </p>
        </div>
      )}
      {suggestions.map((suggestion) => {
        const { name, email, image, id } = suggestion
        return (
          <div
            key={id}
            className=" flex cursor-pointer flex-col gap-1 justify-center items-center bg-white"
          >
            <div className="relative h-14 w-14 rounded-full hover:scale-110 transition-transform duration-200 ease-out border-2 ring-2 border-white ring-red-500 overflow-clip">
              <Image
                src={image}
                objectFit="contain"
                layout="fill"
                priority
                className="p-[1.5px]"
              />
            </div>
            <p className=" text-xs w-14 truncate text-center">{name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Stories
