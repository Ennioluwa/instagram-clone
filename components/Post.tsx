import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Moment from 'react-moment'

interface Props {
  id: string
  username: string
  userImg: string
  img: string
  caption: string
}

const Post = ({ id, username, userImg, img, caption }: Props) => {
  const { data: session }: any = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  const handleComment = async (e: any) => {
    e.preventDefault()
    const commentSend = comment
    setComment('')
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentSend,
      username: session?.user.username,
      userImage: session?.user?.image,
      createdAt: serverTimestamp(),
    })
  }
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid), {
        username: session?.user.username,
      })
    }
  }

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('createdAt', 'desc')
        ),
        (snapshot: any) => {
          setComments(snapshot.docs)
        }
      ),
    [db]
  )
  useEffect(
    () =>
      onSnapshot(
        collection(db, 'posts', id, 'likes'),

        (snapshot: any) => {
          setLikes(snapshot.docs)
        }
      ),
    [db, id]
  )
  console.log(hasLiked)

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like: any) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )
  return (
    <div className="bg-white my-7 border rounded overflow-hidden">
      <div className=" flex items-center p-5 gap-3">
        <div className="relative h-12 w-12 rounded-full shrink-0 overflow-clip border">
          <Image src={userImg} layout="fill" priority objectFit="contain" />
        </div>
        <p className="flex-1 font-bold truncate">{username}</p>
        <DotsHorizontalIcon className=" h-5" />
      </div>
      {img && (
        <div className="relative w-full h-60 sm:h-80 md:h-96">
          <Image src={img} layout="fill" objectFit="cover" priority />
        </div>
      )}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className=" flex gap-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className=" btn" />
        </div>
      )}

      <p className="p-5 truncate">
        {likes.length == 1 && (
          <p className=" font-bold mb-1 -mt-2">{likes.length} like</p>
        )}
        {likes.length > 1 && (
          <p className=" font-bold mb-1 -mt-2">{likes.length} likes</p>
        )}

        <span className=" font-bold mr-1">{username}</span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment: any) => (
            <div className=" flex items-center gap-2 mb-3">
              <Image
                src={comment.data().userImage}
                height={7}
                width={7}
                objectFit="contain"
                priority
                className=" rounded-full"
              />
              <p className=" text-sm flex-1 ">
                <span className=" font-bold">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className=" pr-5 text-xs">
                {comment?.data()?.createdAt?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form className=" flex items-center p-4" onSubmit={handleComment}>
          <EmojiHappyIcon className=" h-7 shrink-0" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className=" border-none truncate flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className=" font-semibold text-blue-400 shrink-0 disabled:text-black"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
