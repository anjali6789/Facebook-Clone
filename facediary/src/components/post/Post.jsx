import "./post.css"
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import {format} from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
  
  const [like,setLike]=useState(post.likes.length)
  const [isLiked,setIsLiked]=useState(false)
  // this is the user whose post is being displayed
  const [user,setUser]=useState({})
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  // this is the user who is currently being logged in 
  const {user:currentUser}=useContext(AuthContext)
  // this one will tell the post after checking from db that if current user has already liked it or not  
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])
  // here we are trying to fetch the user who posted the post being displayed
  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
        
      } catch (err) {
        console.log(err);
      }
    }; 
    fetchUser()
  },[post.userId])
  // here we will call the api to like or unlike then if the setlike was true initially we will make it false and reduce the like by 1 and vice versa
  const likeHandler =async()=>{
    try {
       await axios.put("/post/"+post._id+"/like",{userId:currentUser._id})
    } catch (error) {
      
    }
    setLike(isLiked?like-1:like+1);
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`profile/${user.username}`} >
            <img
              className="postProfileImg"
              src={user.profilePicture?PF+user.profilePicture:PF+"people/noAvatar.png"}
              alt=""
            />
          </Link>  
            <span className="postUsername">
              {user.username}
              
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={PF+post.img}
           alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comments.length} comments</span>
          </div>
        </div>
      </div>
    </div>

  )
}
