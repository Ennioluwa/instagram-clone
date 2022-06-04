import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<any>([])
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      id: i,
      company: faker.company.companyName(),
    }))
    setSuggestions(suggestions)
  }, [])
  return (
    <div className=" mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className=" text-sm font-bold text-gray-400">
          Suggestions for you
        </h3>
        <button className=" text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map(
        (profile: {
          id: string
          image: string
          name: string
          company: string
        }) => (
          <div
            key={profile.id}
            className=" flex items-center mt-3 justify-between gap-3"
          >
            <div className="relative h-10 w-10 rounded-full overflow-clip border p-[2px]">
              <Image src={profile.image} objectFit="contain" layout="fill" />
            </div>
            <div className="flex-1 ml-4">
              <h2>{profile.name}</h2>
              <h3>Works at {profile.company}</h3>
            </div>
            <button className=" text-blue-400 text-sm font-bold">Follow</button>
          </div>
        )
      )}
    </div>
  )
}

export default Suggestions
