import "./closeFriend.css"
const PF=process.env.REACT_APP_PUBLIC_FOLDER

export default function CloseFriend(props) {
    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={PF+props.dp} alt="" />
            <span className="sidebarFriendName">{props.username}</span>
        </li>
    )
}
