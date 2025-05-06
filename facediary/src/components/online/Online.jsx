import "./online.css"
const PF=process.env.REACT_APP_PUBLIC_FOLDER

export default function Online(props) {
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer" >
                <img
                    className="rightbarProfileImg"
                    src={PF+props.dp}
                />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{props.username}</span>
        </li>
    )
}
