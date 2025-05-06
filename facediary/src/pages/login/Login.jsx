import "./login.css";
import { loginCall } from "../../apiCalls";
import {useContext, useRef} from "react"
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
export default function Login() {
  const email=useRef()
  const password=useRef()
  const {user,isFetching,error,dispatch}=useContext(AuthContext)
  const handleclick=(e)=>{
    e.preventDefault()
   
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facediary</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on facediary.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleclick}>
            <input placeholder="Email" ref={email} type="email" required className="loginInput" />
            <input placeholder="Password" ref={password} minLength={6} type="password" required className="loginInput" />
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching?<CircularProgress color="white" size="20px"/>:"Log In"}</button>
            <div  className="threespans">

            <span className="newUser">New User?</span>
            <span className="newUserCreate">Create Account</span>
            <span className="loginForgot">Forgot Password?</span>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}