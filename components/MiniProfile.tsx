import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const MiniProfile = () => {
  const { data: session } = useSession()
  return (
    <div className=" flex gap-3 items-center justify-between mt-5 ml-10">
      {session?.user?.image && (
        <div className=" relative h-16 w-16 rounded-full overflow-clip p-[2px] border">
          <Image src={session?.user?.image} layout="fill" objectFit="contain" />
        </div>
      )}
      <div className=" flex-1">
        <h2 className=" font-bold">{session?.user?.name}</h2>
        <h3 className=" text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button className=" font-semibold" onClick={() => signOut()}>
        SignOut
      </button>
    </div>
  )
}
export default MiniProfile
