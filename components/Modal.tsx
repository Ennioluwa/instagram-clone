import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/ModaAtom'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

const Modal = () => {
  const { data: session }: any = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const filePickerRef = useRef<any>(null)
  const captionRef = useRef<any>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleImage = (e: any) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result)
    }
  }
  const removeImage = () => {
    setSelectedFile(null)
  }
  const handleSubmit = async (e: any) => {
    if (loading) return
    setLoading(true)
    if (!captionRef?.current?.value) return
    try {
      await addDoc(collection(db, 'posts'), {
        caption: captionRef.current.value,
        username: session?.user?.username,
        email: session?.user?.email,
        profileImage: session?.user?.image,
        id: session?.user?.uid,
        createdAt: serverTimestamp(),
      })
        .then(async (data) => {
          if (selectedFile) {
            const uploadTask = ref(storage, `posts/${data.id}/image`)
            await uploadString(uploadTask, selectedFile, 'data_url').then(
              async (result) => {
                removeImage()
                setOpen(false)
                setSelectedFile(null)
                setLoading(false)
                await getDownloadURL(result.ref).then(async (downloadURL) => {
                  const postRef = doc(db, 'posts', data.id)
                  await updateDoc(postRef, { image: downloadURL })
                })
                //       }
                //     )
              }
            )
          }
        })
        .catch((error) => {
          return console.log(error)
        })
      captionRef.current.value = ''
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-10 overflow-y-auto `}
        onClose={() => setOpen(false)}
      >
        <div className="flex items-center mt-[60px] justify-center min-h-[800px] sm:block sm:p-0 sm:min-h-screen pt-4 px-4 pb-20 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=" ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={` fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
            />
          </Transition.Child>
          <span
            className=" hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100 "
            leave=" ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className=" inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    className=" w-full rounded object-contain cursor-pointer"
                    onClick={() => removeImage()}
                    src={selectedFile}
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() =>
                      filePickerRef.current && filePickerRef.current.click()
                    }
                    className=" cursor-pointer mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
                  >
                    <CameraIcon
                      className=" h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className=" mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className={`text-lg leading-6 font-medium text-gray-900`}
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        ref={filePickerRef}
                        onChange={handleImage}
                        type="file"
                        hidden
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        ref={captionRef}
                        type="text"
                        className=" border-none focus:ring-0 w-full text-center"
                        placeholder="Please enter a caption..."
                      />
                    </div>
                  </div>
                </div>
                <div onClick={handleSubmit} className=" mt-5 sm:mt-6">
                  <button
                    disabled={!selectedFile}
                    type="button"
                    className=" inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:cursor-not-allowed shadow-md focus:outline-none hover:disabled:bg-gray-300 disabled:bg-gray-300 "
                  >
                    {loading ? 'Uploading' : ' Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
