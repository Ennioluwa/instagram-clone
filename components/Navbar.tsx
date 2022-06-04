import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/ModaAtom'

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useRecoilState(modalState)

  return (
    <nav className=" w-screen bg-white shadow-md px-5 h-[82px] z-50 sticky top-0 left-0 right-0">
      <div className=" max-w-7xl  mx-auto flex justify-between items-center p-2 ">
        <div
          onClick={() => router.push('/')}
          className=" relative hidden lg:inline-flex w-24 h-10 cursor-pointer "
        >
          <Image
            src={`https://links.papareact.com/ocw`}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <div
          onClick={() => router.push('/')}
          className=" relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src={`https://links.papareact.com/jjm`}
            priority
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative p-3 rounded-md flex gap-2 items-center">
          <div className=" absolute pointer-events-none inset-y-0 pl-3 flex items-center">
            <SearchIcon className=" h-5 w-5 text-gray-400" />
          </div>
          <input
            className=" pl-10 py-2 bg-gray-50 block w-full sm:text-sm border focus:ring-black border-gray-300 rounded-md focus:border-black "
            type="text"
            placeholder="Search"
          />
        </div>
        <div className=" flex items-center justify-end gap-4">
          <HomeIcon onClick={() => router.push('/')} className="navIcon" />
          {session?.user ? (
            <div className="contents">
              <MenuIcon className=" h-6 md:hidden cursor-pointer" />
              <div className=" relative navIcon">
                <PaperAirplaneIcon className="navIcon rotate-45" />
                <div className="absolute w-5 h-5 text-white -top-1 rounded-full -right-2 text-xs bg-red-500 flex items-center justify-center animate-pulse ">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navIcon inline-flex"
              />
              <UserGroupIcon className="navIcon" />
              <HeartIcon className="navIcon" />
              {session?.user?.image && (
                <div
                  className="relative h-10 w-10 rounded-full cursor-pointer border border-gray-200 overflow-clip"
                  onClick={() => signOut()}
                >
                  <Image
                    priority={true}
                    src={`${session?.user?.image}`}
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              )}
            </div>
          ) : (
            <button className=" shrink-0" onClick={() => signIn()}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
