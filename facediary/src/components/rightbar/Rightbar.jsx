import "./rightbar.css"
import Online from "../online/Online"
import { Users } from "../../dummyData"
import { AuthContext } from "../../context/AuthContext"
import Ad from "../ad/Ad"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {Add, Remove} from "@material-ui/icons"
const PF = process.env.REACT_APP_PUBLIC_FOLDER


export default function Rightbar({ user }) {
   
    const [friends, setFriends] = useState([])
    const {user:currentUser,dispatch}= useContext(AuthContext)
    const initial=currentUser.following.includes(user?._id)
    console.log(initial)

    const [followed,setFollowed]=useState(initial)
    console.log("lets see what is followed")
    console.log(followed)
   
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id)
                setFriends(friendList.data)
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    }, [user])
    const handleClick=async()=>{
        try {
            if(followed){
                await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id})
                dispatch({type:"UNFOLLOW",payload:user._id})
            }else{
                await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
                dispatch({type:"FOLLOW",payload:user._id})

            }
        } catch (error) {
            console.log(error)
        }
        setFollowed(!followed )
    }
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src={PF + "gift.png"} alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
                    </span>
                </div>
                <Ad />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(user => {
                        return <Online key={user.id} username={user.username} dp={user.profilePicture} />
                    })}

                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        console.log(friends)
        return (
            <>
            {user.username!==currentUser.username&&(
                <button className="rightbarFollowButton" onClick={handleClick}>
                {followed?"Unfollow":"Follow"}
                {followed?<Remove/>:<Add/>}
                
                    
                </button>
            )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => {
                        return (
                            <Link to={"/profile/" + friend.username} key={friend._id} style={{textDecoration:"none"}}>
                                <div className="rightbarFollowing">
                                    <img
                                        src={friend.profilePicture ? PF + friend.profilePicture : PF + "people/noAvatar.png"}
                                        alt=""
                                        className="rightbarFollowingImg"
                                    />
                                    <span className="rightbarFollowingName" >{friend.username}</span>
                                </div>
                            </Link>
                        );
                    })}

                </div>
                <Ad />
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
