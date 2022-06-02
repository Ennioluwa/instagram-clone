import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import { Navbar } from '../../components'

const signin = ({ providers }: any) => {
  console.log(providers)

  return (
    <>
      <Navbar />
      <div className=" flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
        <div className="relative w-80 h-40">
          <Image
            className=""
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className=" text-xs italic">
          This is not a real app, it is built for educational purposes only.
        </p>
        <div className=" mt-40 ">
          {providers &&
            Object.values(providers).map((provider: any) => (
              <div key={provider.name} style={{ marginBottom: 0 }}>
                <button
                  className=" p-3 bg-blue-500 rounded-lg text-white"
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default signin

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
