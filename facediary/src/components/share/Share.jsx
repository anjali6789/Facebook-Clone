import { useContext, useRef, useState } from "react"
import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import axios from "axios"
import {AuthContext} from "../../context/AuthContext"
export default function Share() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    const {user}=useContext(AuthContext)
    const desc=useRef()
    const [file,setFile]=useState(null)
    const submitHandler=async(e)=>{
        
        e.preventDefault()
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        console.log(newPost) 
        if(file){
            const data=new FormData()
            const fileName=(file.name).replaceAll(' ', '');
            console.log("from share")
            console.log(fileName)
            data.append("file",file)
            data.append("name",fileName)

            newPost.img=fileName
            try {
               await axios.post("/upload",data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
           await axios.post("/post",newPost)
           window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture? PF+user.profilePicture:PF+"people/noAvatar.png"} alt="" />
                    <input
                        placeholder={"What's in your mind "+user.username+" ?"}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file&&(
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)}/>
                        <Cancel className="shareCancelImg" onclick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler} enctype="multipart/form-data">
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
