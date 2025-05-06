import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { useContext } from "react"
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
export default function Topbar() {
  const {user}= useContext(AuthContext)
  const PF=process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">
          facediary
        </span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon"/>
          <input className="searchInput" placeholder="Search for friend, post or videos" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
            <div className="topbarIconItem">
                <Person/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div class="topbarIconItem">
                <Chat/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div class="topbarIconItem">
                <Notifications/>
                <span className="topbarIconBadge">1</span>
            </div>
        </div>
        <Link to={'/profile/'+user.username}>
        <img src={user.profilePicture? PF+user.profilePicture:PF+"people/noAvatar.png"} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  )
}
