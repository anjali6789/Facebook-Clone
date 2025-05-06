import "./feed.css"
import Share from "../share/Share"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Post from "../post/Post"
import { AuthContext } from "../../context/AuthContext"
const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function Feed({ username }) {
  const [posts, setPosts] = useState([])
  const {user} =useContext(AuthContext)
  const {user:currentUser}= useContext(AuthContext)
    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username ? await axios.get("/post/profile/" + username) : await axios.get("/post/timeline/"+user._id)
        // If the result is negative, p2 is sorted before p1. If the result is positive, p1 is sorted before p2. If the result is zero, the order remains unchanged.so newer posts will be shown first
        setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt)
        }))
      } catch (error) {
        console.log(error)
      }

    };
    fetchPosts()
  }, [username,user._id])
  return (
  
    <div className="feed">
      <div className="feedWrapper">
        {(!username||username===user.username)&&<Share />}
        {posts.map(p => (
          <Post post={p} />
        ))}



      </div>
    </div>
  )
}
